## ToDo Server

### Follow these instructions to run the program using deployment.yaml

1. Create Cluster.

```bash
k3d cluster create todo-server -a 2
```

2. Switch `kubectl` to use the `k3d-todo-server` context.

```bash
kubectl config use-context k3d-todo-server
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

In my case, the pod's name is `todo-server-deployment-866bdc5cfb-khwck`

5. See the output by running the following command:

```bash
kubectl logs -f todo-server-deployment-866bdc5cfb-khwck
```
