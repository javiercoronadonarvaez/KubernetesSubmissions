## Todo App with Grafana Monitoring

### Follow these instructions to run fullstack todo app from the `todo_app` directory

1. Create Cluster.

   ```bash
   k3d cluster create todo-app-cluster -p 8081:80@loadbalancer --agents 2
   ```

2. Create Namespace.

   ```bash
   kubectl create namespace project
   ```

3. Create `/tmp/kube` local path in the node we are binding the Persistent Volume to.

   ```bash
   docker exec k3d-todo-app-cluster-agent-0 mkdir -p /tmp/kube
   ```

4. Apply `k8s` from the `todo_app` directory. Make sure the app is running. One can do so by moving on to step 15. It may take some time though, so please be patient.

   ```bash
   kubectl apply -f k8s
   ```

5. Make sure you have Helm installed and run the following commands:

   ```bash
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo add stable https://charts.helm.sh/stable
   helm repo update
   ```

6. Create a `prometheus` namespace and install `kube-prometheus-stack`:

   ```bash
   kubectl create namespace prometheus
   helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus
   ```

7. Open Lens, select `prometheus` as the namespace and retrieve the pod's name which contains Grafana. Alternatively, one can run the following command to get possible results:

   ```bash
   $ kubectl get pods -n prometheus
   NAME                                                              READY   STATUS    RESTARTS   AGE
   alertmanager-kube-prometheus-stack-1764-alertmanager-0            2/2     Running   0          106s
   kube-prometheus-stack-1764-operator-7958b677bb-dbpn5              1/1     Running   0          116s
   kube-prometheus-stack-1764872271-grafana-58755df9b5-q4zwz         3/3     Running   0          116s
   kube-prometheus-stack-1764872271-kube-state-metrics-8fd6df2gw8p   1/1     Running   0          116s
   kube-prometheus-stack-1764872271-prometheus-node-exporter-6s9rw   1/1     Running   0          116s
   kube-prometheus-stack-1764872271-prometheus-node-exporter-8kwqr   1/1     Running   0          116s
   kube-prometheus-stack-1764872271-prometheus-node-exporter-g84ld   1/1     Running   0          116s
   prometheus-kube-prometheus-stack-1764-prometheus-0                2/2     Running   0          106s
   ```

8. Port-forward the `Pod` which contains `Grafana` to access its UI at http://localhost:3000/:

   ```bash
   kubectl -n prometheus port-forward kube-prometheus-stack-1764872271-grafana-58755df9b5-q4zwz 3000
   ```

9. Retrieve `Grafana` Login credentials (admin as username) by running these commands:

   ```bash
   $ helm list -n prometheus
   NAME                            	NAMESPACE 	REVISION	UPDATED                             	STATUS  	CHART                        	APP VERSION
   kube-prometheus-stack-1764872271	prometheus	1       	2025-12-04 12:17:52.272841 -0600 CST	deployed	kube-prometheus-stack-79.11.0	v0.86.2
   ```

   Fetch name and password from name in our previous command and run the following:

   ```bash
   kubectl --namespace prometheus get secrets kube-prometheus-stack-1764872271-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo
   ```

10. Install `Loki` as a log aggregation system by executing the following commands:

    ```bash
    helm repo add grafana https://grafana.github.io/helm-charts
    helm repo update
    kubectl create namespace loki
    helm install loki --namespace=loki grafana/loki -f loki/values.yaml
    ```

11. Open Grafana, open the hamburger menu from the top left, under Connections, choose Data Sources, and then Add new data source. Choose Loki and then insert the following URL: http://loki-gateway.loki.svc.cluster.local and `Name`: `loki`.

12. Create `alloy` configMap based on `config.alloy` and install `alloy` with `helm`:

    ```bash
    kubectl create namespace alloy
    kubectl create configmap --namespace alloy alloy-config --from-file=config.alloy=./alloy/config.alloy
    helm install alloy --namespace alloy grafana/alloy -f alloy/alloy-values.yaml
    ```

13. Verify `alloy` namespace pods are up and running:

    ```bash
    $ kubectl get pods --namespace alloy
      NAME          READY   STATUS    RESTARTS   AGE
      alloy-6xqh9   2/2     Running   0          54s
      alloy-7n8fl   2/2     Running   0          54s
      alloy-tsh99   2/2     Running   0          54s
    ```

14. Go back to Grafana, click `Explore` on the left hand side options. Choose `loki` as the Outline, and in label filters, select `container` as the label and `todo-server` as the value. In Line contains, add `TodoService` and click on either the Run query button or Start live stream your logs. You should be able to see all `Todo` related requests.

15. Open http://localhost:8081/ to start FE application. Give it some time. Deployment and pod provisioning can take some time. You can see test Todo implementation.

16. To test the 140 character limit, perform a `POST` request http://localhost:8081/todos with a body like the following:

    ```json
    {
      "todo": "MAKE SURE THIS HAS MORE THAN 140 CHARACTERS"
    }
    ```

    You should receive a message like the following:

    ```json
    {
      "message": ["Todo must be 140 characters or less."],
      "error": "Bad Request",
      "statusCode": 400
    }
    ```

    In this sense, you can't see the request recorded in our Logs in Grafana because we're preventing this from happening on the client side using `ValidationPipe` in our Backend. If you visit the actual website, you'll get the following if you try to record a very lengthy todo: `Todo must be 140 characters or less.`

17. Refresh FE at http://localhost:8081/ every 10 minutes and verify the shared volume image changes.

18. To test volume persistance, run the following command to delete our complete deployment process from the `todo_app` directory:

    ```bash
    kubectl delete -f k8s
    ```

19. Recreate the deployment from the `todo_app` directory and confirm it's the same image you saw before taking first deleting it. Your todo messages should be persisted as well. Allow some time for the deployment to be shown as complete. Using Lens, that is very easy:

    ```bash
    kubectl apply -f k8s
    ```

20. Verify that a `Read <URL>WikipediaURL</URL>` todo is created every hour, as part of the CronJob implementation.

21. In Lens one can filter by `namespace`, and `project` should be there with all its components as defined by these most recently updated `k8s`.

22. Optionally, one can go through the complete application verifying there are no hardcoded ports, URLs (including the one for `Postgres`) or configurations. These can be found in `k8s/configmap.yaml`
