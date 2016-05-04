/**
 * Created by Henrik on 04.05.2016.
 */

var dgram = require('dgram');
var udp4;
var s = dgram.createSocket('udp4');
function Auditor() {
    this.info = {
        'ip': '239.255.22.5',
        'port': '2205'
    };
    Auditor.prototype.callMusicians = function () {
        var payload = JSON.stringify(this.info);
        message = new Buffer(payload);
        s.send(message, 0, message.length, 9907, "239.255.22.5", function () {});
    };
    this.interval = setInterval(this.callMusicians.bind(this), 500);
}

var auditor = new Auditor();
auditor.callMusicians();