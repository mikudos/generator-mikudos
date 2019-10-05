package main

import (
	"fmt"
	"log"
	"net"
	"<%=repoUrl%>/config"
	"<%=repoUrl%>/handler"
	pb "<%=repoUrl%>/proto/event_aggregate"
	"os"
	"strconv"

	"google.golang.org/grpc"
)

func main() {
	if os.Getenv("SERVICE_PORT") != "" {
		p, err := strconv.Atoi(os.Getenv("SERVICE_PORT"))
		if err == nil {
			config.RuntimeViper.Set("port", p)
		}
	}
	port := config.RuntimeViper.Get("port")
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port)) //1.指定监听地址:端口号
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()                                        //新建gRPC实例
	pb.RegisterEventAggregateServiceServer(s, &handler.Server{}) //在gRPC服务器注册我们的服务实现。参数2是接口(满足服务定义的方法)。在.pb.go文件中搜索Register关键字即可找到这个函数签名
	log.Println(fmt.Sprintf("server start at port: %d", port))
	if err := s.Serve(lis); err != nil { //Serve()阻塞等待
		log.Fatalf("failed to serve: %v", err)
	}
}
