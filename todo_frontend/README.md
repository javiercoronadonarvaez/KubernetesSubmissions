## ToDo Frontend Simple Application Hello World

### Follow these instructions to run the program using deployment.yaml

1. Create Cluster.

```bash
k3d cluster create todo-frontend -a 2
```

2. Switch `kubectl` to use the `k3d-todo-frontend` context.

```bash
kubectl config use-context k3d-todo-frontend
```

3. Create deployment with:

```bash
kubectl apply -f manifests/deployment.yaml
```

4. Confirm deployment and pod is existing and available.

```bash
kubectl get deployments
```

```bash
kubectl get pods
```

In my case, the pod's name is `todo-frontend-deployment-9ddd99576-2psv9`

Once the pod is ready, one can additionally check the env variable was set correctly by running this command:

```bash
kubectl exec todo-frontend-deployment-9ddd99576-2psv9 -- printenv
```

The PORT defined the the `deployment.yaml` file (5173) is defined correctly below:

```
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=todo-frontend-deployment-9ddd99576-2psv9
NODE_VERSION=25.1.0
YARN_VERSION=1.22.22
PORT=5173
```

5. Verify that the PORT defined in the `deployment.yaml` file overrode that of the `Dockerfile` (5003). Run the following:

```bash
kubectl logs -f todo-frontend-deployment-9ddd99576-2psv9
```

You should see 5173 as the TCP container port number:

```
  VITE v7.1.12  ready in 1096 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.42.1.3:5173/
```

6. Post forward the deployment pod to a local port of your choice. We can do 5173, for practical purposes:

```bash
kubectl port-forward todo-frontend-deployment-9ddd99576-2psv9 5173:5173
```
