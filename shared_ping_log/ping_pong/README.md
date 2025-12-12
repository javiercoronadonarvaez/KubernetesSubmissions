## Ping Pong App with GKE

### Follow these instructions to start the Ping Pong application:

1. Create Cluster using `gcloud`. I chose `northamerica-south1-a` because it's the closest one to me. Please take that into account when selecting the zone.

   ```bash
   gcloud container clusters create dwk-cluster --zone=northamerica-south1-a --cluster-version=1.32 --disk-size=32 --num-nodes=3 --machine-type=e2-small
   ```

2. Create `exercises` namespace:

   ```bash
   kubectl create namespace exercises
   ```

3. Start Ping Pong application with GKE dedicated `yaml` files, as defined in the `ping_pong` directory. Run the following command from this folder:

   ```bash
   kubectl apply -f gke
   ```

4. Run the following command and wait until there is an available EXTERNAL-IP:

   ```bash
   $ kubectl get svc --watch
   NAME            TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)        AGE
   kubernetes      ClusterIP      10.31.240.1     <none>         443/TCP        144m
   ping-pong-app-lb   LoadBalancer   10.31.241.224   35.228.41.16   80:30215/TCP   94s
   ```

5. Retrieve the `EXTERNAL-IP` from the previous step and send `GET` request to http://35.228.41.16/pingpong.

   Expect something like the following upon first try:
   `Ping / Pongs: 0`

   This number will increase with each subsequent request.

6. Send `GET` request to http://35.228.41.16/ping.

   Expect the current counter. This request does not increase the counter:
   `Ping / Pongs: 1`

7. Delete the cluster when you are done:

   ```bash
   gcloud container clusters delete dwk-cluster --zone=northamerica-south1-a
   ```
