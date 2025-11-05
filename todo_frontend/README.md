## ToDo Frontend Simple Application Hello World

### Follow these instructions to run the program using deployment.yaml and exposing the application via service.yaml

1. Create Cluster.

```bash
k3d cluster create todo-frontend --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

2. Create deployment with the following command and from `todo_frontend` directory:

```bash
kubectl apply -f manifests/deployment.yaml
```

3. Create service with the following command and from `todo_frontend` directory:

```bash
kubectl apply -f manifests/service.yaml
```

4. Open application at http://localhost:8082.
