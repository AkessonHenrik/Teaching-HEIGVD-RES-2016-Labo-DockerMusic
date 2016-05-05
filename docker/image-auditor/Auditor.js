/**
* Created by Henrik on 04.05.2016.
*/
var net = require('net');

var dgram = require('dgram');
var udp4;
var s = dgram.createSocket('udp4');
udpInfo = {
  'ip': '239.255.22.5',
  'port': '9907'
};
tcpInfo = {
  'ip':'239.255.22.5',
  'port':'2205'
};
function Auditor() {
  var tcpServer = net.createServer(function(socket) {
    var arr = []
    instrumentArray.forEach(function(instr) {
      var obj = {
        'uuid': instr.uuid,
      'instrument': instr.instrument,
      'activeSince': instr.activeSince
    }
      arr.push(obj)
    })
    socket.write(JSON.stringify(arr));
    socket.pipe(socket);
    socket.destroy();
  });
  tcpServer.listen(2205, '127.0.0.1');

  instrumentArray = [];

  var s = dgram.createSocket('udp4');
  s.bind(udpInfo.port, function () {
    s.addMembership(udpInfo.ip);
  });


  s.on('message', function (msg, source) {
    var obj = JSON.parse(msg);
    var toAdd = true;
    for (var i = 0; i < instrumentArray.length; i++) {
      if (instrumentArray[i].uuid === obj.uuid) {
        instrumentArray[i].lastActive = new Date();
        console.log("Got: " + JSON.stringify(instrumentArray[i]));
        toAdd = false;
        break;
      }
    }
    if (toAdd) {
      obj.lastActive = new Date();
      obj.activeSince = obj.lastActive;
      instrumentArray.push(obj);
      console.log("Added new instrument: " + JSON.stringify(obj));
    }
  });

  Auditor.prototype.check = function () {
    instrumentArray.forEach(function(instrument) {
      var d = new Date();
      if((d-instrument.lastActive)/1000 > 5) {
        instrumentArray.splice(instrumentArray.indexOf(instrument), 1);
        console.log("Removed! " + instrumentArray)
      }
    })
  };
  setInterval(this.check.bind(this), 1000);
}

var auditor = new Auditor();
