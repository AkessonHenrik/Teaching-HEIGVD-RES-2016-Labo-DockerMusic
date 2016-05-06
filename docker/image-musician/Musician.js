/**
* Created by Henrik on 04.05.2016.
*/
var ip = require('ip');
var dgram = require('dgram');
var udp4;
// var ipaddress = '230.1.2.3';
var ipaddress = ip.address();
var s = dgram.createSocket('udp4');
var uuidpackage = require('node-uuid');
var sounds = [
  {'instr': 'piano', 'sound': 'ti-ta-ti'},
  {'instr': 'trumpet', 'sound': 'pouet'},
  {'instr': 'flute', 'sound': 'trulu'},
  {'instr': 'violin', 'sound': 'gzi-gzi'},
  {'instr': 'drum', 'sound': 'boum-boum'}
];
var logEnabled = process.argv[3];
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
    s.send(message, 0, message.length, 9907, ipaddress, function () {
      logToConsole("Playing: " + message);
    });
  }
  setInterval(this.play.bind(this), 1000);
}

var instrument = process.argv[2];

var musician = new Musician(instrument);
