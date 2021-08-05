var fs = require('fs')
var mqtt = require('mqtt')
, host = require('os').networkInterfaces().Ethernet.filter(s=>s.family=='IPv4').map(s=>s.address)[0]
, port = '2930';

var settings = {
keepalive: 1000,
protocolId: 'MQIsdp',
protocolVersion: 3,
clientId: 'charger_mqtt',
username:'smartphone',
password: 'password_12345'
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
        battery_level=Number(fs.readFileSync('/sys/class/power_supply/battery/capacity','utf-8'))
        console.log(battery_level)
        if (battery_level>=battery_target){
            client.publish(topic,0)
            process.exit()
        }
        // battery_level+=20
    }, 60000)
})
