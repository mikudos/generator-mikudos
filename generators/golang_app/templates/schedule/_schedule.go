package schedule

import (
	"log"

	cron "github.com/robfig/cron/v3"
)

// Cron aaaa
var (
	Cron        *cron.Cron
	CronJobs    = map[cron.EntryID]CronModel{}
	OneTimeJobs = map[cron.EntryID]CronModel{}
)

// CronModel CronModel
type CronModel struct {
	Schedule    string `json:"schedule"`
	Grpc        string	`json:"grpc"`
	BrokerEvent string	`json:"brokerevent:"`
}

// StartCron aaa
func StartCron() {
	defer log.Fatalln("Cron server stoped, need restart!")
	defer Cron.Stop()
	Cron.Start()
	log.Println("Cron server started, should never stop!~")
	select {}
}

func init() {
	Cron = cron.New()
	go StartCron()
	persistence()
}
