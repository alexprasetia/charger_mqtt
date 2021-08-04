var fs = require('fs')
var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://192.168.0.168:1883')
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
        if (battery_level>=battery_target){
            client.publish(topic,0)
            process.exit()
        }
        // battery_level+=20
        console.log(battery_level)
    }, 5000)
})