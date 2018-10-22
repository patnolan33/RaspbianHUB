import sys
import time
import socket

import Adafruit_MPR121.MPR121 as MPR121


print('Touch tape to toggle lights')

# Create MPR121 instance.
cap = MPR121.MPR121()

# Initialize communication with MPR121 using default I2C bus of device, and
# default I2C address (0x5A).  On BeagleBone Black will default to I2C bus 0.
if not cap.begin():
    print('Error initializing MPR121.  Check your wiring!')
    sys.exit(1)

# Main loop to print a message every time a pin is touched.
print('Press Ctrl-C to quit.')
last_touched = cap.touched()
terminalNum = 1
turnOn = False
while True:
    current_touched = cap.touched()
    pin_bit = 1 << terminalNum
    # First check if transitioned from not touched to touched.
    if current_touched & pin_bit and not last_touched & pin_bit:
        # print('{0} touched!'.format(terminalNum))
	turnOn = not turnOn
	# Create socket to send data:
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

	# Connect the socket to the port where the server is listening:
	server_address = ('10.0.0.93', 10000)
	print >>sys.stderr, 'conneceting to %s port %s' % server_address
	sock.connect(server_address)
	if turnOn:
		print('Turn lights ON')
		message = 'ON'
		print >>sys.stderr,  'sending %s' % message
		sock.sendall(message)
	else:
		print('Turn lights OFF')
		message = 'OFF'
		print >>sys.stderr,  'sending %s' % message
		sock.sendall(message)

	## Look for response:
	#amount_received = 0
	#amount_expected = len(message)
	#while amount_received < amount_expected:
	#	data = sock.recv(16)
	#	amount_received += len(data)
	#	print >>sys.stderr, 'received "%s"' % data

	# Close socket:
	print >>sys.stderr, 'closing socket'
	sock.close()

    # # Next check if transitioned from touched to not touched.
    #if not current_touched & pin_bit and last_touched & pin_bit:
        # print('{0} released!'.format(terminalNum))

    # Update last state and wait a short period before repeating.
    last_touched = current_touched
    time.sleep(0.1)

