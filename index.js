const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})
//Crear administrador
const admin = kafka.admin()
const producer = kafka.producer()
var count = 0;
var time = 1000;
//const transaction = await producer.transaction(); 

var sendMessage = async () => {
  //await producer.connect();
  count++
  if(count%2 !== 0){
    console.log('Numero de mensajes', count);
    await producer.send({
      topic: 'topico-prueba',
      messages: [
        { key: 'key1', value: JSON.stringify({ some: 'data' }) }
      ],
  });
  //await admin.fetchTopicOffsets('topico-prueba');
  }else{
    console.log(await admin.fetchOffsets({ groupId : 'topico-prueba', topic :'topico-prueba' }));
    console.log('Envia correo');

  }
  
  //await producer.
  //await producer.disconnect()
}

const getRandomNumber = () => Math.round(Math.random(10) * 1000)
const createMessage = num => ({
  key: `key-${num}`,
  value: `value-${num}-${new Date().toISOString()}`,
})

const run = async () => {
  await admin.connect();
  await producer.connect()
  setInterval(sendMessage, time);
}
run();