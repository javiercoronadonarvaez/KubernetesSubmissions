## Rebuild and push the image for linux/amd64 and redeploy

```
docker buildx build --platform linux/amd64,linux/arm64 -t javiercoronadonarvaez/ping-pong:v2.0.0 --push .
```
