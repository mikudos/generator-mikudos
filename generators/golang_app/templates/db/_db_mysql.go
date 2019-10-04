package db

import (
	"database/sql"
	"fmt"
	"log"
	"operator/config"

	_ "github.com/go-sql-driver/mysql"
)

var (
	username = "root"
	password = "EventMysqlServerPassword"
	dbName   = "events"
	// Db 数据库链接
	Db *sql.DB
)

// ConnectDb init DB instance
func ConnectDb() error {
	Db, _ = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8", config.RuntimeViper.GetString("mysql.username"), config.RuntimeViper.GetString("mysql.password"), config.RuntimeViper.GetString("mysql.service"), config.RuntimeViper.GetInt("mysql.port"), config.RuntimeViper.GetString("mysql.dbName")))
	log.Println("begin connect DB")
	//设置数据库最大连接数
	Db.SetConnMaxLifetime(100)
	//设置上数据库最大闲置连接数
	Db.SetMaxIdleConns(10)
	//验证连接
	if err := Db.Ping(); err != nil {
		log.Fatalf("open database fail %v", err)
		return err
	}
	log.Println("DB connected")
	return nil
}

func init() {
	ConnectDb()
}
