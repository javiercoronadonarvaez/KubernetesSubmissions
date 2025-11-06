## Log Output

### Follow these instructions to run the program using deployment.yaml and ingress.yaml

1. Create Cluster.

```bash
k3d cluster create log-output --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

2. Apply manifests as defined in `deployment`, `service` and `ingress` yaml files from `log_output`.

```bash
kubectl apply -f manifests
```

3. Send `GET` request to http://localhost:8081.

Expect something like the following:
`2025-11-06T01:16:43.518Z: 08433dc7-f246-462a-a982-92e06833ae6a`
