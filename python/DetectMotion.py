import time
from gpiozero import MotionSensor
from signal import pause

pir = MotionSensor(4)

while True:
#	if pir.motion_detected:
	print 'Motion detected!'	

	time.sleep(1) #loop delay, should be less than detection delay

#def motionDetected() :
#	print 'Motion detected!'

#def endOfMotion() :
#	print 'End of motion'

#pir.when_motion = motionDetected
#pir.when_no_motion = endOfMotion

#pause()
