#!/bin/sh
set -e

# Wait for todo-server to be ready
until curl -sf http://todo-app-svc:3000/todos; do
  echo "Waiting for todo-server..."
  sleep 5
done

URL=$(curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -i location | awk '{print $2}' | tr -d '\r')
curl -X POST -H "Content-Type: application/json" \
  -d "$(printf '{"todo": "Read %s"}' "$URL")" \
  http://todo-app-svc:3000/todos