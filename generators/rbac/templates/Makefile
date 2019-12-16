IP:=$(shell /sbin/ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:")
NAME := <%=serviceName%>_srv
SERVICE_VERSION := 0.0.1
PORT := 50051

.PHONY:server
server:
	yarn install
	npm start
.PHONY:docker
docker:
	yarn install
	yarn run compile
	docker build . -t asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY:run-docker
run-docker:
	docker run -p 3030:3030 asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY:push
push:
	# docker tag asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION) asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)
	docker push asia.gcr.io/kubenetes-test-project-249803/$(NAME):$(SERVICE_VERSION)

.PHONY:istio
istio:
	istioctl kube-inject -f deployment/frontend_deployment.yaml -o deployment/frontend_deployment-injected.yaml

.PHONY:deploy
deploy:
	kubectl apply -f deployment/frontend_deployment-injected.yaml

.PHONY:istio-deploy
istio-deploy:
	kubectl apply -f <(istioctl kube-inject -f deployment/frontend_deployment.yaml)
