## Log and Ping Pong app Fullstack

### Follow these instructions to run deployment, service, ingress and Persistent Volume creation and claim for the Log output and Ping Pong apps

1. Create Cluster.

   ```bash
   k3d cluster create shared-ping-log-cluster -p 8081:80@loadbalancer --agents 2
   ```

2. Create Namespace.

   ```bash
   kubectl create namespace exercises
   ```

3. Apply manifests as defined in `deployment-persistent`, `service`, `persistentvolume`, `persistentvolumeclaim` and `ingress` yaml files from the `shared_ping_log` directory. The `volumes` are not necessary at this point, but leaving them on for sake of practicality.

   ```bash
   kubectl apply -f manifests
   ```

4. Send a `GET` request to http://localhost:8081/pingpong to start the counter writing process. Give the Deployment some time to get ready. Its status could be consulted with detail with Lens.

   Expect something like the following in the response's body:
   `Ping / Pongs: 0`

   You would receive that message upon making the first request. The counter increases by one with each subsequent call.

5. Send `GET` request to http://localhost:8081/ to retrieve the last line from the `logs.txt` file.

   Expect something like the following:

   ```
   2025-11-06T01:16:43.518Z: 08433dc7-f246-462a-a982-92e06833ae6a
   Ping / Pongs: 0
   ```

   If no prior requests have been made to http://localhost:8081/pingpong, expect the following:

   ```
   2025-11-11T19:59:35.460Z: cdc30481-eb39-4983-b504-5cb782736e01
   Ping Pong Message: File does not exist yet
   ```

6. Alternatively, start by sending a `GET` request to http://localhost:8081/

   If the request is made immediately after deployment, one may encounter this message: `'File does not exist yet'`.
   The same principle applies to the `pingpong` application. Just give it some time and try again.

7. Corroborate that the `ping-pong` counter only increments when sending `GET` requests to http://localhost:8081/pingpong. Likewise, corroborate that accessing the `log-output` app reflects the number of recorded `ping-pong` clicks, as defined with the counter mentioned at the beginning of this point.
