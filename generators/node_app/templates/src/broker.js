const BROKER_ADDRESSES = process.env.BROKER_ADDRESSES ? String(process.env.BROKER_ADDRESSES).split(',') : null;
const { Kafka } = require('kafkajs');

const run = async (consumer) => {
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
}

module.exports = function (app) {
    if (BROKER_ADDRESSES) app.config.brokers = BROKER_ADDRESSES
    const kafka = new Kafka({
        clientId: app.config.get('app'),
        brokers: app.config.get('brokers')
    })
    const producer = kafka.producer()
    const ProducerConnectPromise = producer.connect()
    const consumer = kafka.consumer({ groupId: app.config.get('consumer_group') })
    const ConsumerConnectPromise = consumer.connect()
    ProducerConnectPromise.then(() => {
        app.context.broker = producer;
    })
    ConsumerConnectPromise.then(() => {
        app.context.consumer = consumer;
        run(consumer)
    })
}