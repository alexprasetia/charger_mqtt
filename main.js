var exec =require('child_process').exec
var mqtt = require('mqtt')
, host = 'your_ip'
, port = '2930';

var settings = {
keepalive: 1000,
protocolId: 'MQIsdp',
protocolVersion: 3,
clientId: 'clientid',
username:'username',
password: 'password'
};

// client connection
var client = mqtt.connect('mqtt://'+host+':'+port, settings);
var topic = 'Charger'
var battery_level=0
if (typeof (process.argv.slice(2)[0])!='undefined'){
    var battery_target=Number(process.argv.slice(2)[0])
}else{
    var battery_target=100
}

client.on('connect', ()=>{
    setInterval(()=>{
        exec('termux-battery-status',(err,out,der)=>battery_level=Number(JSON.parse(out).percentage))
        if (battery_level>=battery_target){
            client.publish(topic,0)
            process.exit()
        }
        // battery_level+=20
        console.log(battery_level)
    }, 5000)
})
