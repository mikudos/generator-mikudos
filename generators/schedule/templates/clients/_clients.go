package clients

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/robfig/cron/v3"

	"<%=repoUrl%>/config"
	pb "<%=repoUrl%>/proto/ai"
	"<%=repoUrl%>/schedule"
	"google.golang.org/grpc"
)

var (
	conns     = make(map[string]*grpc.ClientConn)
	clients   = make(map[string]pb.AiServiceClient)
	err       error
	callIndex = 1
)

func init() {
	log.Println("Init all grpc client: ai, learn, users, messages")
	setUpClientConn("ai")
}

func setUpClientConn(connName string) {
	confLoc := fmt.Sprintf("grpcClients.%s", connName)
	grpcAddr := config.RuntimeViper.GetString(confLoc)
	if grpcAddr == "" {
		log.Fatalln("address for " + confLoc + "must be set")
	}
	// Set up a connection to the server.
	conns[connName], err = grpc.Dial(grpcAddr, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	clients[connName] = pb.NewAiServiceClient(conns[connName])
}

// AiService AiService
type AiService struct {
	baseService
	jobID cron.EntryID
}

type baseService struct {
	HelloRequest *pb.HelloRequest
}

// ClientFunc ClientFunc
func (ai *AiService) ClientFunc() {
	serviceName := "ai"
	state := conns[serviceName].GetState()
	if state.String() != "READY" {
		conns[serviceName].Close()
		setUpClientConn(serviceName)
	}
	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := clients[serviceName].SayHello(ctx, ai.HelloRequest)
	log.Printf("SayHello called %d times", callIndex)
	callIndex++
	if err != nil {
		log.Printf("could not call method on %s: %v", serviceName, err)
	} else {
		log.Printf("call return: %s", r.GetMessage())
	}
	ai.checkCancelList()
}

func (ai *AiService) checkCancelList() {
	if _, ok := schedule.OneTimeJobs[ai.jobID]; ok {
		schedule.Cron.Remove(ai.jobID)
		delete(schedule.OneTimeJobs, ai.jobID)
	}
}
