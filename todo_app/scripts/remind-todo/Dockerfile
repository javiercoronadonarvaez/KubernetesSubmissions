FROM alpine:latest
RUN apk add --no-cache curl
COPY remind-todo.sh /remind-todo.sh
RUN chmod +x /remind-todo.sh
ENTRYPOINT ["/remind-todo.sh"]