## Log and Ping Pong app Persistent Volumes

### Follow these instructions to run deployment, service, ingress and Persistent Volume creation and claim for the Log output and Ping Pong apps

1. Create Cluster.

   ```bash
   k3d cluster create todo-app-cluster -p 8081:80@loadbalancer --agents 2
   ```

2. Create `/tmp/kube` local path in the node we are binding the Persistent Volume to.

   ```bash
   docker exec k3d-todo-app-cluster-agent-0 mkdir -p /tmp/kube
   ```

3. Apply manifests as defined in `deployment-persistent`, `service`, `persistentvolume`, `persistentvolumeclaim` and `ingress` yaml files from the `shared_ping_log` directory.

   ```bash
   kubectl apply -f manifests
   ```

4. Preferably, send a `GET` request to http://localhost:8081/pingpong to start the counter writing process.

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

7. To corroborate the volumes are persistent, run the following command from the `shared_ping_log` directory after making sure we're getting the appropriate responses:

   ```bash
   kubectl delete -f manifests/deployment-persistent.yaml
   ```

8. Reboot the deployment by running the following command from the `shared_ping_log` directory:

   ```bash
   kubectl apply -f manifests/deployment-persistent.yaml
   ```

9. Send the aforementioned `GET` requests to the same endpoints and verify the data has been persisted.
