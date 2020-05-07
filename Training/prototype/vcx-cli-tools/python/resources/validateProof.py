# import python libs
import asyncio
import sys
from time import sleep
import os
import json
import random
from argparse import ArgumentParser
from ctypes import cdll

# import vcx libs
sys.path.append('modules')
from vcx.api.connection import Connection
from vcx.state import State, ProofState
from vcx.api.vcx_init import vcx_init
from vcx.api.proof import Proof
from vcx.api.credential_def import CredentialDef

lib = cdll.LoadLibrary('/usr/lib/libsovtoken.so')
lib.sovtoken_init()


# global vcx config file
configPath = "./config/vcx-config.json"
def parse_args():
    parser = ArgumentParser()
    parser.add_argument("CONNECTION_NAME")
    parser.add_argument("PROOF_FILE")
    return parser.parse_args()

async def createProof() :
    # args parse
    args = parse_args()
    connection_name = args.CONNECTION_NAME
    proof_name = args.PROOF_FILE
    # initialize vcx
    await vcx_init(configPath)
    # Open Connection File to send Proof Request
    connection_data_file = "./data/"+"connection-"+connection_name+".json" 
    with open(connection_data_file,'r') as fr:
        serialized_connection = json.loads(fr.read())
    print('load connection')
    # print(serialized_connection)
    # Open Proof File and load into proof_attrs
    proof_data_file = "./data/"+proof_name+"-proof-definition.json"
    with open(proof_data_file,'r') as fh:
        proof_data = json.loads(fh.read())
    # Create Proof Object
    proof = await Proof.create(proof_data['source_id'],proof_data['name'], proof_data['requested_attrs'])
    print('created proof')
    # Send Proof Request
    connection = await Connection.deserialize(serialized_connection)
    await connection.update_state() 
    print("Request proof from Connection")
    await proof.request_proof(connection)
    # Wait for Proof State Update
    print("Wait for Connection to provide proof")
    proof_state = await proof.get_state()
    # Loop to wait for the State to change to Accepted
    while proof_state != State.Accepted:
        sleep(2)
        await proof.update_state()
        proof_state = await proof.get_state()
    # Process Proof
    print("Process the proof provided by Connection")
    await proof.get_proof(connection)
    # check Proof State to determine Verifiability
    print("Check if proof is valid")
    if proof.proof_state == ProofState.Verified:
        print("proof is verified!!")
    else:
        print("could not verify proof :( ")
    # Serialize and save the Proof to a local file
    serialized_proof = await Proof.serialize(proof)
    proof_export = "./data/"+proof_name+"-proof-"+connection_name+".json"
    with open(proof_export,'w') as fh:
        fh.write(json.dumps(serialized_proof))
    exit(0)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(createProof())
    exit(0)

