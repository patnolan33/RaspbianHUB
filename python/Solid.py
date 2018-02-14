import time
import sys

from neopixel import *

import argparse
import signal
import sys

# LED strip configuration:
LED_COUNT      = 30      # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53
LED_STRIP      = ws.WS2811_STRIP_GRB   # Strip type and colour ordering

RED_VAL	= 0
GREEN_VAL	= 0
BLUE_VAL	= 0

def signal_handler(signal, frame):
        colorWipe(strip, Color(0,0,0))
        sys.exit(0)

def opt_parse():
        parser = argparse.ArgumentParser()
        parser.add_argument('-c', action='store_true', help='clear the display on exit', default=True)
	parser.add_argument('color', help='color to set led strip to') 
        args = parser.parse_args()
	print(args)
        if args.c:
                signal.signal(signal.SIGINT, signal_handler)
	if args.color:
		hexToRGB(args.color)

# Convert hexcode to RGB
def hexToRGB(hexColor):	
	# Convert hex color to RGB:
	rgbColor = tuple(int(hexColor[i:i+2], 16) for i in (1, 3, 5))
	global RED_VAL, GREEN_VAL, BLUE_VAL
	RED_VAL = rgbColor[0]
	GREEN_VAL = rgbColor[1]
	BLUE_VAL = rgbColor[2]

# Define functions which animate LEDs in various ways.
def colorWipe(strip, color, wait_ms=50):
	"""Wipe color across display a pixel at a time."""
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, color)
		strip.show()
		time.sleep(wait_ms/1000.0)

# Main program logic follows:
if __name__ == '__main__':
        # Process arguments
	opt_parse()
	
	# Create NeoPixel object with appropriate configuration.
	strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)
	# Intialize the library (must be called once before other functions).
	strip.begin()

	# while True:
	colorWipe(strip, Color(RED_VAL, GREEN_VAL, BLUE_VAL))  # Set to off
