// MQTT subscriber
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.0.168:1883')
var topic = 'Charger'

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})