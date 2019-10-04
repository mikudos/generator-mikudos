from kafka import KafkaProducer
from configs.config import Config

producer = KafkaProducer(bootstrap_servers=Config['brokers'])


def sendMsg(value, topic='my_topic', key=b'my_key'):
    future = producer.send(topic, key=key,
                           value=value, partition=0)
    result = future.get(timeout=10)
    print(result)
