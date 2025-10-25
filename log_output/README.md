## Log Output

### Follow these instructions to run the program

1. Create Cluster.

```bash
k3d cluster create logOutput -a 2
```

2. Switch `kubectl` to use the `k3d-logOutput` context.

```bash
kubectl config use-context k3d-logOutput
```

3. Create `log-output-dep` deployment with image `javiercoronadonarvaez/log-output`.

```bash
kubectl create deployment log-output-dep --image=javiercoronadonarvaez/log-output
```

4. Confirm pod is existing and available.

```bash
kubectl get pods
```

In my case, the pod's name is `log-output-dep-6cc8cf977f-5ctz9`

5. See the output by running the following command:

```bash
kubectl logs -f log-output-dep-6cc8cf977f-5ctz9
```
