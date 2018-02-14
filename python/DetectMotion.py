import time

from gpiozero import MotionSensor

pir = MotionSensor(4) 

counter = 1
while True:
	if pir.motion_detected:
		print 'Motion Detected: ',  counter
		counter = counter + 1
	
