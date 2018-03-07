import time

from gpiozero import MotionSensor

pir = MotionSensor(4)

pir.when_motion = print 'Motion detected!'
pir.when_no_motion = print '...end of motion...'

pause()