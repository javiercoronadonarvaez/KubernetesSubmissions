## ToDo Frontend

### Follow these instructions to run the program using deployment.yaml, service.yaml and ingress.yaml

1. Create Cluster.

```bash
k3d cluster create todo-frontend --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

2. Apply manifests as defined in `deployment`, `service` and `ingress` yaml files from `todo-frontend`.

```bash
kubectl apply -f manifests
```

3. Open application at http://localhost:8081.

Expect the following message:
`Hello World`
