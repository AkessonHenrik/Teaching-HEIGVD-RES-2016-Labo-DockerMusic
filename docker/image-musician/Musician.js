/**
 * Created by Henrik on 04.05.2016.
 */

var dgram = require('dgram');
var udp4;
var s = dgram.createSocket('udp4');
var uuidpackage = require('node-uuid');
var sounds = [
    {'instr': 'piano', 'sound': 'ti-ta-ti'},
    {'instr': 'trumpet', 'sound': 'pouet'},
    {'instr': 'flute', 'sound': 'trulu'},
    {'instr': 'violin', 'sound': 'gzi-gzi'},
    {'instr': 'drum', 'sound': 'boum-boum'}
];

function Musician(instr) {
    this.instrument = instr;
    this.sound = null;
    this.uuid = uuidpackage.v4();
    this.tcpIp = null;
    this.tcpPort = null;
    for (var i = 0; i < sounds.length; i++) {
        if (sounds[i].instr === instr) {
            this.sound = sounds[i].sound;
        }
    }
    Musician.prototype.findAuditor = function () {

        //if we find an auditor we won't need to periodically look for auditors anymore
        var found = false;
        s.bind(9907, function() {
            s.addMembership("239.255.22.5");
        });
        s.on('message', function(msg, source) {
            msg = JSON.parse(msg);
            this.tcpIp = msg.ip;
            this.tcpPort = msg.port;
            console.log("tcpIp = " + this.tcpIp + " and tcpPort = " + this.tcpPort);
            found = true;
        });
        if(found === true) {
            // clearInterval(this.interval);
            this.interval = setInterval(this.play.bind(this), 1000);
        }
    };
    Musician.prototype.play = function () {
        //Define tcp connection here

        s.close();
        var obj = {
            "sound": this.sound
        };
        var payload = JSON.stringify(obj);
        var message = new Buffer(payload);
        console.log("Sending message: " + message);
    };
    this.findAuditor();
    // this.interval = setInterval(this.findAuditor.bind(this), 100);
}

var instrument = process.argv[2];

var musician = new Musician(instrument);