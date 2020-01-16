IP:=$(shell /sbin/ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:")
NAME := <%=serviceName%>_srv
SERVICE_VERSION := 0.0.1
PORT := 50051

.PHONY: update-proto
update-proto:
	./update_proto.sh

.PHONY:clean
clean:
	mvn clean

.PHONY:install
install: clean
	mvn install

.PHONY:run-server
run-server:
	java -jar grpc-server/target/grpc-server-1.0-SNAPSHOT.jar

.PHONY:server
server: install run-server

.PHONY:docker
docker:
	docker build . -t asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY:run-docker
run-docker:
	echo $(IP)
	docker run -p $(PORT):$(PORT) --env BROKER_ADDRESSES=192.168.199.185:9092 asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY:push
push:
	docker push asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY:istio
istio:
	istioctl kube-inject -f deployment/learn_service_deploy.yaml -o deployment/user_service_deploy-injected.yaml

.PHONY:istio-deploy
istio-deploy:
	kubectl apply -f <(istioctl kube-inject -f deployment/user_service_deploy.yaml)

.PHONY: run-client
run-client:
	grpcc --proto ./proto/users/users.proto --address 127.0.0.1:$(PORT) -i
	# let ee = client.sayHello({name:"yue"}, printReply)