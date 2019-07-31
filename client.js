const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'Julián',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'topico-prueba' })

const run = async () => {

  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'topico-prueba', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error)