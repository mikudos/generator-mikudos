GOPATH:=$(shell go env GOPATH)
NAME := <%=serviceName%>-srv
SERVICE_VERSION := 0.0.1
PORT := 50051

.PHONY: update-proto
update-proto:
	./update_proto.sh

.PHONY: proto
proto:
	protoc --proto_path=${GOPATH}/src:. --go_out=plugins=grpc:. proto/schedule/*.proto
	protoc --proto_path=${GOPATH}/src:. --go_out=plugins=grpc:. proto/ai/*.proto
	protoc --proto_path=${GOPATH}/src:. --go_out=plugins=grpc:. proto/learn/*.proto
	protoc --proto_path=${GOPATH}/src:. --go_out=plugins=grpc:. proto/messages/*.proto
	protoc --proto_path=${GOPATH}/src:. --go_out=plugins=grpc:. proto/users/*.proto

.PHONY: proto-js
proto-js:
	protoc --js_out=./proto/schedule proto/schedule/schedule.proto
.PHONY: proto-py
proto-py:
	protoc --python_out=. proto/schedule/schedule.proto

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
	grpcc --proto ./proto/schedule/schedule.proto --address 127.0.0.1:$(PORT) -i
	# client.listSchedule({}, sr).on("data", data=>{console.log(data)})

.PHONY: git
git:
	git pull && git add . && git commit -m "update update.sh" && git push