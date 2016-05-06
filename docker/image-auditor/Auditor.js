/**
* Created by Henrik on 04.05.2016.
*/
var net = require('net');
var ip = require('ip');
var dgram = require('dgram');
// var ipaddress = '230.1.2.3'
var ipaddress = ip.address();
console.log(ipaddress)
var udp4;
var s = dgram.createSocket('udp4');
udpInfo = {
  'ip': ipaddress,
  'port': '9907'
};
tcpInfo = {
  'ip': ipaddress,
  'port':'2205'
};

logEnabled = process.argv[2];

function logToConsole(toLogg) {
  if(logEnabled == "log") {
    console.log(toLogg);
  }
}
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
  tcpServer.listen(tcpInfo.port, tcpInfo.ip);

  instrumentArray = [];

  var s = dgram.createSocket('udp4');
  s.bind(udpInfo.port, function () {
    // s.addMembership(udpInfo.ip);
  });


  s.on('message', function (msg, source) {
    var obj = JSON.parse(msg);
    var toAdd = true;
    instrumentArray.forEach(function(instr) {
      if(instr.uuid === obj.uuid) {
        instr.lastActive = new Date();
        logToConsole("Got: " + JSON.stringify(instr));
        toAdd = false;
      }
    })
    if (toAdd) {
      obj.lastActive = new Date();
      obj.activeSince = obj.lastActive;
      instrumentArray.push(obj);
      logToConsole("Added new instrument: " + JSON.stringify(obj));
    }
  });

  Auditor.prototype.check = function () {
    instrumentArray.forEach(function(instrument) {
      var d = new Date();
      if((d-instrument.lastActive)/1000 > 5) {
        instrumentArray.splice(instrumentArray.indexOf(instrument), 1);
        logToConsole("Removed! " + instrumentArray)
      }
    })
  };
  setInterval(this.check.bind(this), 1000);
}

var auditor = new Auditor();
