var mosca = require('mosca')
var exec = require('child_process').exec
if (process.platform =='win32'||process.platform=='win64'){
    command_shutdown= 'shutdown /s' 
    var url = require('os').networkInterfaces().Ethernet.filter(s=>s.family=='IPv4').map(s=>s.address)[0]
}
else{ 
    command_shutdown= 'shutdown +2' 
    var url = require('os').networkInterfaces().enp2s0.filter(s=>s.family=='IPv4').map(s=>s.address)[0]
}
// var port = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
var port = 2930
var settings = {url:url,port: port}
var broker = new mosca.Server(settings)

broker.authenticate('redmik20pro','alexprasetia','redmik20pro_with_pe',()=>{})
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
