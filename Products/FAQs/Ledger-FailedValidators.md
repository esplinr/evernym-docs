**Q. How many validator nodes can fail or be malicious, and consensus still be reached?**

**A.** The applicable formula is `3N + 1 <= Nodes_In_Pool`, where N is the number that can fail. The minimum number of nodes in a pool is 4. If you have 4, 5 or 6 Nodes in the pool, 1 can fail. If you have 7‑9, 2 can fail, and so on.
