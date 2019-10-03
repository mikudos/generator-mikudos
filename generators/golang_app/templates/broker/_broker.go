package broker

import (
	"fmt"
	"log"
	"strings"

	"github.com/Shopify/sarama"
	"github.com/yueguanyu/language_master_schedule/config"
)

// BrokerInstance faaa
var BrokerInstance Broker

// Broker aaa
type Broker struct {
	producer sarama.AsyncProducer
	Client   sarama.ConsumerGroup
}

// Msg aaa
type Msg struct {
	Topic   string
	Key     string
	Message string
}

var (
	brokers = config.RuntimeViper.GetString("brokers.endPoints")
	version = config.RuntimeViper.GetString("brokers.version")
	group   = config.RuntimeViper.GetString("brokers.group")
	topics  = config.RuntimeViper.GetString("brokers.topics")
)

// Send 发送消息
func (b *Broker) Send(m Msg) {
	msg := &sarama.ProducerMessage{
		Topic: m.Topic,
		Key:   sarama.StringEncoder(m.Key),
	}

	for {
		fmt.Scanln(&m.Message)
		msg.Value = sarama.ByteEncoder(m.Message)
		fmt.Printf("input [%s]\n", m.Message)

		// // send to chain
		BrokerInstance.producer.Input() <- msg

		select {
		case suc := <-BrokerInstance.producer.Successes():
			fmt.Printf("offset: %d,  timestamp: %s", suc.Offset, suc.Timestamp.String())
		case fail := <-BrokerInstance.producer.Errors():
			fmt.Printf("err: %s\n", fail.Err.Error())
		}
	}
}

func init() {
	config := sarama.NewConfig()
	config.Producer.RequiredAcks = sarama.WaitForAll
	config.Producer.Partitioner = sarama.NewRandomPartitioner
	config.Producer.Return.Successes = true
	config.Producer.Return.Errors = true
	config.Version = sarama.V0_11_0_2
	config.Consumer.Group.Rebalance.Strategy = sarama.BalanceStrategyRoundRobin
	config.Consumer.Offsets.Initial = sarama.OffsetOldest

	BrokerInstance = Broker{}
	var err error
	BrokerInstance.producer, err = sarama.NewAsyncProducer(strings.Split(brokers, ","), config)
	if err != nil {
		fmt.Printf("producer_test create producer error :%s\n", err.Error())
		return
	}

	BrokerInstance.Client, err = sarama.NewConsumerGroup(strings.Split(brokers, ","), group, config)
	if err != nil {
		log.Panicf("Error creating consumer group client: %v", err)
	}
	defer BrokerInstance.producer.AsyncClose()
}
