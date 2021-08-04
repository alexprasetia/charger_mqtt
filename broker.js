var mosca = require('mosca')
var exec = require('child_process').exec
var settings = {url:"192.168.0.185",port: 1883}
var broker = new mosca.Server(settings)

broker.on('ready', ()=>{
    console.log('mqtt server is opened')
})

broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
    if (Number(message)==0){
        console.log('Charging Stop')
        exec('shutdown +2')
        process.exit()
    }
})
