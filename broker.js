var mosca = require('mosca')
var exec = require('child_process').exec
var url = require("ip").address();
if (process.platform =='win32'||process.platform=='win64'){
    var command_shutdown= 'shutdown /s' 
}
else{ 
    var command_shutdown= 'shutdown +2' 
}
// var port = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
var port = 2930
var settings = {url:url,port: port}
var broker = new mosca.Server(settings)

broker.authenticate('clientid','username','password',()=>{})
broker.on('ready', ()=>{
    console.log('mqtt server is opened')
    console.log(url+':'+port.toString())
})

broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
    if (Number(message)==0){
        console.log('Charging Stop')
        exec(command_shutdown)
        setTimeout(()=>process.exit(),1000)
    }
})
