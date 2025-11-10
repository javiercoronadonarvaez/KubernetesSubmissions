## Spit Log Output with emptyDir volumes

### Follow these instructions to run the programs using deployment.yaml, service.yaml and ingress.yaml

1. Create Cluster.

```bash
k3d cluster create split-log-output-cluster -p 8081:80@loadbalancer --agents 2
```

2. Apply manifests as defined in `deployment`, `service` and `ingress` yaml files from the `split_log_output` directory.

```bash
kubectl apply -f manifests
```

3. Send `GET` request to http://localhost:8081/write to start the writing process.

Expect something like the following in the response's body:
`Log writing started.`

5. Send `GET` request to http://localhost:8081/fetch to retrieve the last line from the `logs.txt` file.

Expect something like the following:
`2025-11-06T01:16:43.518Z: 08433dc7-f246-462a-a982-92e06833ae6a`
