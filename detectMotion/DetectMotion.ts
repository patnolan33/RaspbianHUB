var net = require('net');
var raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
  io: new raspi()
});

function makeTCPRequest(messageType, messageData) {
  let socket = new net.Socket();
  setupTCPSocket(socket);
  socket.connect(1234, '127.0.0.1', function() {
    let tcpRequest = {
      messageType: messageType,
      messageData: messageData
    };
    socket.write(JSON.stringify(tcpRequest));
    socket.end();
  });
}

function setupTCPSocket(socket) {
  // Add a 'data' event handler for the client socket
  // data is what the server sent to this socket
  socket.on('data', function(data) {
      console.log('DATA: ' + data);
  });

  // Add a 'close' event handler for the client socket
  socket.on('close', function() {
      console.log('Connection closed');
      socket.destroy();
  });

  // Add an 'error' event handler
  socket.on('error', function(err) {
      console.log('Socket ' + err);
      socket.destroy();
  });
}


board.on("ready", function() {

  // Create a new `motion` hardware instance.
  var motion = new five.Motion(7);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart");
    makeTCPRequest('motionStart', 'true');
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend");
    makeTCPRequest('motionStart', 'false');
  });

  // "data" events are fired at the interval set in opts.freq
  // or every 25ms. Uncomment the following to see all
  // motion detection readings.
  // motion.on("data", function(data) {
  //   console.log(data);
  // });
});

