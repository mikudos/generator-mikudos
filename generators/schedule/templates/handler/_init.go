package handler

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"github.com/robfig/cron/v3"
	"<%=repoUrl%>/config"
	pb "<%=repoUrl%>/proto/schedule"
	"<%=repoUrl%>/schedule"
	"gopkg.in/yaml.v2"
)

func startAllPersistCron(persistData map[string]map[cron.EntryID]schedule.CronModel) (err error) {
	for _, model := range persistData["CronJobs"] {
		var (
			grpc  pb.GrpcCall
			event pb.BrokerEvent
			sche  pb.Schedule
		)
		err = json.Unmarshal([]byte(model.Grpc), &grpc)
		err = json.Unmarshal([]byte(model.BrokerEvent), &event)
		err = json.Unmarshal([]byte(model.Schedule), &sche)
		if grpc.GetClientName() != "" {
			id, err := AddGrpcCron(sche.GetPeriod(), &grpc, &sche, false)
			if err != nil {
				log.Println(err)
			} else {
				log.Println("cron id:", id)
			}
		} else if event.GetMessage() != "" {
			id, err := AddBrokerCron(sche.GetPeriod(), &event, &sche, false)
			if err != nil {
				log.Println(err)
			} else {
				log.Println("cron id:", id)
			}
		}
	}
	for _, model := range persistData["OneTimeJobs"] {
		var (
			grpc  pb.GrpcCall
			event pb.BrokerEvent
			sche  pb.Schedule
		)
		err = json.Unmarshal([]byte(model.Grpc), &grpc)
		err = json.Unmarshal([]byte(model.BrokerEvent), &event)
		err = json.Unmarshal([]byte(model.Schedule), &sche)
		if grpc.GetClientName() != "" {
			id, err := AddGrpcCron(sche.GetPeriod(), &grpc, &sche, true)
			if err != nil {
				log.Println(err)
			} else {
				log.Println("cron id:", id)
			}
		} else if event.GetMessage() != "" {
			id, err := AddBrokerCron(sche.GetPeriod(), &event, &sche, true)
			if err != nil {
				log.Println(err)
			} else {
				log.Println("cron id:", id)
			}
		}
	}
	return err
}

func test() {
	id, err := AddGrpcCron("@every 5s", &pb.GrpcCall{
		ClientName: "ai",
		MethodName: "SayHello",
		PayloadStr: "{\"name\":\"Yue Guanyu\",\"age\":12}",
	}, &pb.Schedule{
		Period:          "@every 5s",
		ScheduleName:    "测试 ai.SayHello 任务",
		ScheduleComment: "每隔5秒钟调用一次ai.SayHello",
	}, false)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("cron id:", id)
	}
}

func init() {
	// test()
	// read persistence file, init all persistence CRONS
	buf, err := ioutil.ReadFile(config.RuntimeViper.GetString("persistentFile"))
	if err != nil {
		log.Fatalln("persistence File read Error!")
	}
	persistData := map[string]map[cron.EntryID]schedule.CronModel{}
	if err := yaml.Unmarshal(buf, &persistData); err != nil {
		log.Fatalln("persistence Data has Error!")
	}
	// log.Printf("CronJobs: %+v", persistData["CronJobs"])
	// log.Printf("OneTimeJobs: %+v", persistData["OneTimeJobs"])
	if err := startAllPersistCron(persistData); err != nil {
		log.Fatalln("start persistence CRONS Error!")
	}
}
