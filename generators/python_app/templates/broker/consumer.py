from kafka import KafkaConsumer
from configs.config import Config
import asyncio

consumer = KafkaConsumer('my_topic', group_id='group2',
                         bootstrap_servers=Config['brokers'])


async def test(msg):
    print(msg)


async def readFromConsumer():
    for msg in consumer:
        await test(msg)
coroutine = readFromConsumer()
