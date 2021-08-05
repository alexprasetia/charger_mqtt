var mosca = require('mosca')
var exec = require('child_process').exec
var url = require('os').networkInterfaces().Ethernet.filter(s=>s.family=='IPv4').map(s=>s.address)[0]
// var port = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
var port = 2930
var settings = {url:url,port: port}
var broker = new mosca.Server(settings)

broker.authenticate('charger_mqtt','smartphone','password_12345',()=>{})
broker.on('ready', ()=>{
    console.log('mqtt server is opened')
    console.log(url+':'+port.toString())
})

broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
    if (Number(message)==0){
        console.log('Charging Stop')
        if (process.platform =='win32'||process.platform=='win64'){
            exec('shutdown /s')
            setTimeout(()=>process.exit(),1000)
        }
        else{ 
            exec('shutdown +2')
            setTimeout(()=>process.exit(),1000)
        }
    }
})
