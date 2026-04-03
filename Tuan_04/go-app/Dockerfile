# Stage 1: Build
FROM golang:1.21 AS builder

WORKDIR /app

COPY . .

RUN go build -o app

# Stage 2: Run
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/app .

CMD ["./app"]