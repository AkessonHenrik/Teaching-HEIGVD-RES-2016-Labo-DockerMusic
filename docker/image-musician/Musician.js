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
  this.sound = "";
  this.uuid = uuidpackage.v4();
  for (var i = 0; i < sounds.length; i++) {
    if (sounds[i].instr === instr) {
      this.sound = sounds[i].sound;
    }
  }
  Musician.prototype.play = function () {
    var o = {
      'uuid': this.uuid,
      'instrument': this.instrument,
      'sound': this.sound
    };
    var payload = JSON.stringify(o);
    var message = new Buffer(payload);
    s.send(message, 0, message.length, 9907, "239.255.22.5", function () {
      console.log("Playing: " + message);
    });
  }
  setInterval(this.play.bind(this), 1000);
}

var instrument = process.argv[2];

var musician = new Musician(instrument);
