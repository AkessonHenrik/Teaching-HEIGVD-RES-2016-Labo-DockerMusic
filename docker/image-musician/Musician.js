/**
* Created by Henrik on 04.05.2016.
*/

//Used to obtain the current ip address
var ip = require('ip');
var ipaddress = ip.address();

var MULTICAST_ADDRESS = "239.255.22.5"

var dgram = require('dgram');
var s = dgram.createSocket('udp4');

var uuidpackage = require('node-uuid');
var udp4;
var sounds = [
  {'instr': 'piano', 'sound': 'ti-ta-ti'},
  {'instr': 'trumpet', 'sound': 'pouet'},
  {'instr': 'flute', 'sound': 'trulu'},
  {'instr': 'violin', 'sound': 'gzi-gzi'},
  {'instr': 'drum', 'sound': 'boum-boum'}
];
//Will the application print what it's playing?
var logEnabled = process.argv[3];

var instrument = process.argv[2];

//"Custom" output function, will only print if the argument "log" was passed at launch
function logToConsole(toLogg) {
  if(logEnabled == "log") {
    console.log(toLogg);
  }
}

function Musician(instr) {
  instrument = instr;
  sound = "";
  uuid = uuidpackage.v4();
  sounds.forEach(function(snd) {
    if(snd.instr == instrument)
      sound = snd.sound
  })
  Musician.prototype.play = function () {
    var o = {
      'uuid': uuid,
      'instrument': instrument,
      'sound': sound
    };
    var payload = JSON.stringify(o);
    var message = new Buffer(payload);
    s.send(message, 0, message.length, 9907, MULTICAST_ADDRESS, function () {
      logToConsole("Playing: " + message);
    });
  }
  setInterval(this.play.bind(this), 1000);
}
var musician = new Musician(instrument);
