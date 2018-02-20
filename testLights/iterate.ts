


var ws281x = require('rpi-ws281x-native');
var sudo = require('sudo-prompt');



function test() {

var NUM_LEDS = 30,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});


// ---- animation-loop

var offset = 0;
setInterval(function () {
  var i=NUM_LEDS;
  while(i--) {
      pixelData[i] = 0;
  }
  pixelData[offset] = 0xffffff;

  offset = (offset + 1) % NUM_LEDS;
  ws281x.render(pixelData);
}, 100);

/*
	ws281x.init(NUM_LEDS);
	console.log("In turn on lights: " + pixelData);
	for(var i = 0; i < NUM_LEDS; i++) {
           pixelData[i] = 0xffcc22;
//		pixelData[i] = 0x000000;
	}
	console.log(pixelData);
	ws281x.render(pixelData);
*/

console.log('Press <ctrl>+C to exit.');

}

/*
var options = {
	name: 'Electron'
};
sudo.exec('test', options,
  	function(error: any, stdout: any, stderr: any) {
		if (error) throw error;
    		console.log('stdout: ' + stdout);
	}
);
*/

test();
