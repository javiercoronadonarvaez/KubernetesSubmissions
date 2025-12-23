## Log and Ping Pong app Fullstack with ConfigMap LATEST LOCAL VERSION

### Follow these instructions to run deployment, service, ingress, configMap and Persistent Volume creation and claim for the Log output and Ping Pong apps

1. Create Cluster.

   ```bash
   k3d cluster create shared-ping-log-cluster -p 8081:80@loadbalancer --agents 2
   ```

2. Create Namespace.

   ```bash
   kubectl create namespace exercises
   ```

3. Create `/tmp/kube` local path in the node we are binding the Persistent Volume to.

   ```bash
   docker exec k3d-shared-ping-log-cluster-agent-0 mkdir -p /tmp/kube
   ```

4. Apply manifests as defined in `deployment-persistent`, `service`, `persistentvolume`, `persistentvolumeclaim`, `configmap` and `ingress` yaml files from the `shared_ping_log` directory.

   ```bash
   kubectl apply -f manifests
   ```

5. Send a `GET` request to http://localhost:8081/pingpong to start the counter writing process. Give the Deployment some time to get ready. Its status could be consulted in detail with Lens.

   Expect something like the following in the response's body:
   `Ping / Pongs: 0`

   You would receive that message upon making the first request. The counter increases by one with each subsequent call.

6. Send `GET` request to http://localhost:8081/ to retrieve the last line (most recent one) from the `log_output.txt` file alongside environmental variables and the values from the `information.txt` file as defined in the `configMap`.

   Expect something like the following:

   ```
   file content: this text is from file
   env variable: MESSAGE:hello world
   2025-11-27T16:37:29.039Z: cc76eaac-9b00-4c44-b184-8cd20b8a2e1f
   Ping Pong Message: Ping / Pongs: 2
   ```

7. Alternatively, start by sending a `GET` request to http://localhost:8081/. If no requests have been sent to http://localhost:8081/pingpong prior to this operation, the pong counter will remain empty.

8. Corroborate that the `ping-pong` counter only increments when sending `GET` requests to http://localhost:8081/pingpong. Likewise, corroborate that accessing the `log-output` app reflects the number of recorded `ping-pong` clicks, as defined with the counter mentioned at the beginning of this point.
