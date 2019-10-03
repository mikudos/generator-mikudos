package config

import (
	"fmt"
	"os"

	"github.com/spf13/viper"
)

// RuntimeViper viper Instance
var RuntimeViper *viper.Viper

// ServiceEnv service deployment env
var ServiceEnv = os.Getenv("SERVICE_ENV")

const (
	configPath      = "./config/"
	configSuffix    = "yaml"
	firstConfigName = "default"
)

func init() {
	RuntimeViper = viper.New()
	RuntimeViper.SetEnvPrefix("service")                           // 将自动大写
	RuntimeViper.BindEnv("port")                                   // SERVICE_PORT
	RuntimeViper.BindEnv("mysql.service", "SERVICE_MYSQL_SERVICE") // SERVICE_MYSQL_SERVICE
	RuntimeViper.BindEnv("mysql.port", "SERVICE_MYSQL_PORT")       // SERVICE_MYSQL_PORT
	RuntimeViper.SetConfigType(configSuffix)
	RuntimeViper.SetConfigName(firstConfigName) // name of config file (without extension)
	RuntimeViper.AddConfigPath(configPath)      // path to look for the config file in
	err := RuntimeViper.ReadInConfig()          // Find and read the config file
	if ServiceEnv != "" {
		if f, err := os.Open(configPath + ServiceEnv + "." + configSuffix); err == nil {
			err = RuntimeViper.MergeConfig(f)
		}
	}
	if err != nil { // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %s", err))
	}
}
