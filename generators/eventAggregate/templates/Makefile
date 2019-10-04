GOPATH:=$(shell go env GOPATH)
NAME := language_master_event_aggregate-srv
SERVICE_VERSION := 0.0.1
PORT := 50051

.PHONY: update-proto
update-proto:
	./update_proto.sh

.PHONY: proto
proto: update-proto
	protoc --proto_path=${GOPATH}/src:. --go_out=plugins=grpc:. proto/event_aggregate/event_aggregate.proto

.PHONY: proto-js
proto-js:
	protoc --js_out=./proto/event_aggregate proto/event_aggregate/event_aggregate.proto
.PHONY: proto-py
proto-py:
	protoc --python_out=. proto/event_aggregate/event_aggregate.proto

.PHONY: build
build: proto
	go build -o $(NAME) main.go

.PHONY: docker
docker:
	docker build . -t asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY: run-docker
run-docker:
	docker run --rm -p $(PORT):$(PORT) --name $(NAME) asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY: run-client
run-client:
	grpcc --proto ./proto/event_aggregate/event_aggregate.proto --address 127.0.0.1:$(PORT) -i