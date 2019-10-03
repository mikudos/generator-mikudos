package schedule

import (
	"io/ioutil"
	"log"

	cron "github.com/robfig/cron/v3"
	"github.com/yueguanyu/language_master_schedule/config"
	"gopkg.in/yaml.v2"
)

func persistence() {
	Cron.AddFunc(config.RuntimeViper.GetString("persistentWritePeriod"), func() {
		out, err := yaml.Marshal(map[string]map[cron.EntryID]CronModel{"CronJobs": CronJobs, "OneTimeJobs": OneTimeJobs})
		if err != nil {

		}
		if err := ioutil.WriteFile(config.RuntimeViper.GetString("persistentFile"), out, 0644); err != nil {
			log.Println("persistence File Write fail!")
		}
	})
}
