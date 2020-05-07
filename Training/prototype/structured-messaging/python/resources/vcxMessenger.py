import asyncio
import json
import os
import sys
import random
import argparse
import qrcode
from time import sleep
import datetime
import inspect
import uuid
import base64

from vcx.api.vcx_init import vcx_init
from vcx.api.connection import Connection
from vcx.api.issuer_credential import IssuerCredential
from vcx.api.proof import Proof
from vcx.api.schema import Schema
from vcx.api.credential_def import CredentialDef
from vcx.api.wallet import Wallet
from vcx.state import State, ProofState
from vcx.api.utils import vcx_agent_provision, vcx_messages_download, vcx_messages_update_status
from vcx.common import mint_tokens
from ctypes import cdll
from vcx.error import VcxError

# Global variables
configPath = "./config/vcx-config.json"

async def makeConnection(connection_type, name, phone_number):
    print("You called {} with parameters {}".format(inspect.stack()[0][3], ', '.join(['{}={}'.format(k,v) for k,v in locals().items()])))
    await _initialize()
    connection = await Connection.create(name)
    print("Attempting connection via {}".format(connection_type))
    if (connection_type == 'QR'): 
        connection_data = {
            'id': name,
            'connection_type': 'QR',
            'use_public_did': False
        }        
        connection_args = json.dumps(connection_data)
        await connection.connect(connection_args)        
        await connection.update_state()
        details = await connection.invite_details(True)
        details_text = str(json.dumps(details))
        print(details_text)
        img = qrcode.make(details_text)
        img.save('./data/{}-connection-invite.png'.format(name))
        print(">>> Open the QR Code at ./data/{}-connection-invite.png for display, and scan it with connect.me".format(name))
    elif (connection_type == 'SMS'):
        connection_data = {
            'id': name,
            'connection_type': 'SMS',
            'phone': phone_number,
            'use_public_did': False
        }
        connection_args = json.dumps(connection_data)
        await connection.connect(connection_args)
        details = await connection.invite_details(True)
        details_text = str(json.dumps(details))
        print(details_text)
    else:
        print('Unrecognized connection type: {}'.format(connection_type))
        return
    connection_state = await connection.get_state()
    while connection_state != State.Accepted:
        sleep(2)
        print('The state of the connection is {}'.format(connection_state))
        await connection.update_state()
        connection_state = await connection.get_state()
    serialized_connection = await connection.serialize()
    with open('./data/{}-connection.json'.format(name), 'w') as fh:
        json.dump(serialized_connection, fh)
    print('Success!! Connection complete. The state of the connection is {}'.format(connection_state))
    return


async def askProvableQuestion(connection_name):
    print("You called {} with parameters {}".format(inspect.stack()[0][3], ', '.join(['{}={}'.format(k,v) for k,v in locals().items()])))
    await _initialize()
    with open('./data/{}-connection.json'.format(connection_name),'r') as fh:
        connection_data = json.load(fh)
    connection = await Connection.deserialize(connection_data)    
    pairwiseDid = connection_data['data']['pw_did']
    expiration = datetime.datetime.now() + datetime.timedelta(minutes=5)
    msg_uuid = uuid.uuid4()
    question = {
        '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/committedanswer/1.0/question',
        '@id': '{}'.format(msg_uuid),
        'question_text': 'Test Question',
        'question_detail': 'Are you currently requesting access?',
        'valid_responses': [
            { 'text': "I am, let me in", 'nonce': 'YES' },
            { 'text': "No, block access!", 'nonce': 'NO' }
        ],
        '@timing': {
            'expires_time': expiration.strftime("%Y-%m-%dT%H:%M:%S+0000")
        }
    }
    print('Question JSON: {}'.format(json.dumps(question)))
    msg_id = await connection.send_message(json.dumps(question), "Question", "Asking test question")
    msg_id = msg_id.decode('utf-8')
    # print("Sent message Id: {}".format(msg_id))
    answer = None
    while (datetime.datetime.now() < expiration):
        # poll for question response received
        messages_json = await vcx_messages_download(status='MS-104', uids=msg_id, pw_dids=pairwiseDid)
        messages = json.loads(messages_json.decode('ASCII'))
        if len(messages[0]['msgs']) == 0:
            print("No response yet")
            await vcx_messages_update_status(json.dumps([{'pairwiseDID': pairwiseDid, 'uids': [msg_id]}]))
            sleep(2)
            continue
        else:
            # print('Question message status: {}'.format(messages[0]['msgs']))
            response_id=messages[0]['msgs'][0]['refMsgId']
            await vcx_messages_update_status(json.dumps([{'pairwiseDID': pairwiseDid, 'uids': [response_id]}]))
            # download the answer
            messages_json = await vcx_messages_download(status='', uids=response_id, pw_dids=pairwiseDid)
            messages = json.loads(messages_json.decode('ASCII'))
            # print('Response messages: {}'.format(messages))
            for message in messages[0]['msgs']:
                if message['type'] == 'Answer' and message['uid'] == response_id:
                    answer = json.loads(json.loads(message['decryptedPayload'])['@msg'])
                    break
            if answer == None:
                print('There should have been an answer received...')
                break
            else:
                # We got an answer, determine the response
                signature = base64.b64decode(answer['response.@sig']['signature'])
                data = answer['response.@sig']['sig_data']
                valid = await connection.verify_signature(data.encode(), signature)

                if valid:
                    print("-- The digitally signed response: ", base64.b64decode(data).decode('ASCII'))
                else:
                    print("-- Signature was not valid")

                break
    if answer == None:
        print("Timeout occurred before a response was received")
    return


# Utility functions

async def _initialize():
    lib = cdll.LoadLibrary('/usr/lib/libsovtoken.so')
    lib.sovtoken_init()
    await vcx_init(configPath)
    return


def _verifyClaims(theProof, proofTemplate):
    #determine which claims should have restrictions applied
    restricted = []
    for attribute in proofTemplate['attrs']:
        if "restrictions" in attribute:
            restricted.append(attribute["name"])
    verified = True
    for claim in restricted:
        if claim not in theProof["requested_proof"]["revealed_attrs"]:
            verified = False
            print('Attribute "{}" has unmet restrictions.'.format(claim))
    return verified


if __name__ == '__main__':
    function = getattr(sys.modules[__name__], sys.argv[1])
    loop = asyncio.get_event_loop()
    loop.run_until_complete(function(*sys.argv[2:]))
    loop.stop()
    loop.close()
    print("Exiting...")
    sleep(1)
    exit()

