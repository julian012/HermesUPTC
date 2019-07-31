const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const producer = kafka.producer() 

var sendMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'topico-prueba',
    messages: [
      { key: 'key1', value: 'hello world' },
      { key: 'key1', value: 'hey hey!' },
      { key: 'key1', value: 'LALALA' }
    ],
  })
  await producer.disconnect()
}

sendMessage();