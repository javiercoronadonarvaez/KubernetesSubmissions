## Ping Pong App with Log Output

### Follow these instructions to run the programs using deployment.yaml, service.yaml and ingress.yaml

1. Create Cluster.

```bash
k3d cluster create log-pingpong-cluster --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

2. Apply manifests as defined in `deployment` and `service` by running these commands from the `log_output` directory.

```bash
kubectl apply -f manifests/deployment.yaml
```

```bash
kubectl apply -f manifests/service.yaml
```

3. Apply manifests as defined in `deployment`, `service` and `ingress` yaml files from the `ping_pong` directory.

```bash
kubectl apply -f manifests
```

4. Send `GET` request to http://localhost:8081.

Expect something like the following:
`2025-11-06T01:16:43.518Z: 08433dc7-f246-462a-a982-92e06833ae6a`

5. Send `GET` request to http://localhost:8081/pingpong.

Expect something like the following:
`pong 0`

This number will increase with each subsequent request.
