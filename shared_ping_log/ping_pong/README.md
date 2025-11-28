## Ping Pong App with Postgres

### Follow these instructions to start the Ping Pong application:

1. Create Cluster.

```bash
k3d cluster create ping-pong-cluster -p 8081:80@loadbalancer --agents 2
```

2. Start Postgres DB application from the `ping_pong` directory:

```bash
kubectl apply -f k8s/statefulset-postgres.yaml
```

```bash
kubectl delete -f k8s/statefulset-postgres.yaml
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
