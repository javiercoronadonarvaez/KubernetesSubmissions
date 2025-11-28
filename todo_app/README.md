## Todo App with Persistent Volumes, Namespace and ConfigMap for ENV variables

### Follow these instructions to run fullstack todo app

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

4. Apply manifests from the `todo_app` directory.

   ```bash
   kubectl apply -f manifests
   ```

5. Open http://localhost:8081/ to start FE application. Give it some time. Deployment and pod provisioning can take some time. You can see test Todo implementation.
   There's an initial `GET` request for existing `todos` and a `POST` request to create new entries implemented in this version.
6. Refresh FE at http://localhost:8081/ every 10 minutes and verify the shared volume image changes.

7. To test volume persistance, run the following command to delete our `deployment-persistent` deployment from the `todo_app` directory:

   ```bash
   kubectl delete -f manifests/deployment-persistent.yaml
   ```

8. Recreate the deployment from the `todo_app` directory and confirm it's the same image you saw before taking first deleting it. Allow some time for the deployment to be shown as complete, preferably in Lens:

   ```bash
   kubectl apply -f manifests/deployment-persistent.yaml
   ```

9. In Lens one can filter by `namespace`, and `project` should be there with all its components as defined by these most recently updated `manifests`.

10. Optionally, one can go through the complete application verifying there are no hardcoded ports, URLs or configurations. These can be found in `manifests/configmap.yaml`
