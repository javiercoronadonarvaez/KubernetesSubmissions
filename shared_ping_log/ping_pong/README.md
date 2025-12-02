## Ping Pong App with Postgres

### Follow these instructions to start the Ping Pong application:

1. Create Cluster.

   ```bash
   k3d cluster create ping-pong-cluster -p 8081:80@loadbalancer --agents 2
   ```

2. Start Ping Pong application with Postgres DB from the `ping_pong` directory:

   ```bash
   kubectl apply -f k8s
   ```

3. Send `GET` request to http://localhost:8081/pingpong.

   Expect something like the following upon first try:
   `Ping / Pongs: 0`

   This number will increase with each subsequent request.

4. Send `GET` request to http://localhost:8081/ping.

   Expect the current counter. This request does not increase the counter:
   `Ping / Pongs: 1`

5. To verify data is backed up, run the following command to delete all the ping pong app related processes:

   ```bash
   kubectl delete -f k8s
   ```

6. Re apply the `yaml` files and verify the counter is the same as you left it:

   ```bash
   kubectl apply -f k8s
   ```
