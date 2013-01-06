console.debug = function() {};

var output = null;
var ssdpData = "";

window.addEventListener("load", function() {
  console.log("SSDP multicast app starts");
  var connect = document.getElementById("start");
  connect.onclick = ssdpStart;

  output = document.getElementById("output");
});

// translate text string to Arrayed buffer
function t2ab(str /* String */) {
    var buffer = new ArrayBuffer(str.length);
    var view = new DataView(buffer);
    for(var i = 0, l = str.length; i < l; i++) {
      view.setInt8(i, str.charAt(i).charCodeAt());
    }
    return buffer;
}

  // translate Arrayed buffer to text string
  //
function ab2t(buffer /* ArrayBuffer */) {
    var arr = new Int8Array(buffer);
    var str = "";
    for(var i = 0, l = arr.length; i < l; i++) {
      str += String.fromCharCode.call(this, arr[i]);
    }
    return str;
}

var recieveData = function(socket, sid) {
  socket.recvFrom(sid, function(recv) {
    var data = ab2t(recv.data);

    var dt = new Date();
    var tmp = dt + "<br>";
    tmp += data.replace(/"\r\n"/g, "<br>") + "<br><br>";

    tmp += ssdpData;

    console.log(tmp);
    output.innerHTML = tmp;
    ssdpData = tmp;

    recieveData(socket, sid);
  });
};



var ssdpStart = function() {
    var MSearchAll = "M-SEARCH * HTTP/1.1\r\n" +
        "ST: ssdp:all\r\n" +
        "MAN: \"ssdp:discover\"\r\n" +
        "HOST: 239.255.255.250:1900\r\n" +
        "MX: 10\r\n\r\n";
    var socket = chrome.socket || chrome.experimental.socket;

    var SSDPMulticastAddress = "239.255.255.250";
    var SSDPMulticastPort = 1900;
    var sid;

    socket.create('udp', {}, function(socketInfo) {
        sid = socketInfo.socketId;
        console.log("sid: " + sid);
        socket.bind(sid, "0.0.0.0", 0, function(res) {
            if(res !== 0) {
                throw('cannot bind socket');
                return -1;
            }

            recieveData(socket, sid);

            // Send SSDP Search
            var buffer = t2ab(MSearchAll);
            var closure_ = function(e) {
                if(e.bytesWritten < 0) {
                    throw("an Error occured while sending M-SEARCH : "+e.bytesWritten);
                }
            }

            for(var i = 0; i < 2; i++) {
                socket.sendTo(sid, buffer, SSDPMulticastAddress, SSDPMulticastPort, function(e) {
                closure_(e);
                });
            }
        });
    });
};
