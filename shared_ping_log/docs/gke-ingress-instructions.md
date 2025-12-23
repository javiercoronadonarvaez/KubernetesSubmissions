## Log and Ping Pong app with GKE with Ingress

### Follow these instructions to run deployment, service, ingress, configMap and Persistent Volume creation and claim for the Log output and Ping Pong apps

1. Create Cluster using `gcloud`. I chose `northamerica-south1-a` because it's the closest one to me. Please take that into account when selecting the zone.

   ```bash
   gcloud container clusters create dwk-cluster --zone=northamerica-south1-a --cluster-version=1.32 --disk-size=32 --num-nodes=3 --machine-type=e2-small
   ```

2. Create `exercises` namespace:

   ```bash
   kubectl create namespace exercises
   ```

3. Start Ping Pong application with GKE dedicated `yaml` files, as defined in the `shared_ping_log` directory. Run the following command from this folder:

   ```bash
   kubectl apply -f gke
   ```

4. Run the following command until there is an `ADDRESS` available. We will use it for all our subsequent requests:

   ```bash
   $ kubectl get ing --namespace exercises
   NAME                  CLASS    HOSTS   ADDRESS          PORTS   AGE
   shared-ping-log-ing   <none>   *       34.8.187.203   80      7m53s
   ```

5. Send a `GET` request to http://34.8.187.203/pingpong to start the counter writing process. Give the Deployment some time to get ready. Its status could be consulted in detail with Lens.

   Expect something like the following in the response's body:
   `Ping / Pongs: 0`

   You would receive that message upon making the first request. The counter increases by one with each subsequent call.

6. Send `GET` request to http://34.8.187.203/ to retrieve the last line (most recent one) from the `log_output.txt` file alongside environmental variables and the values from the `information.txt` file as defined in the `configMap`.

   Expect something like the following:

   ```
   file content: this text is from file
   env variable: MESSAGE:hello world
   2025-11-27T16:37:29.039Z: cc76eaac-9b00-4c44-b184-8cd20b8a2e1f
   Ping Pong Message: Ping / Pongs: 2
   ```

7. Alternatively, start by sending a `GET` request to http://34.8.187.203/. If no requests have been sent to http://34.8.187.203/pingpong prior to this operation, the pong counter will remain empty.

8. Corroborate that the `ping-pong` counter only increments when sending `GET` requests to http://34.8.187.203/pingpong. Likewise, corroborate that accessing the `log-output` app reflects the number of recorded `ping-pong` clicks, as defined with the counter mentioned at the beginning of this point.

9. Delete the cluster when you are done:

   ```bash
   gcloud container clusters delete dwk-cluster --zone=northamerica-south1-a
   ```
