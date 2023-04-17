time1 = 0
time_finish = 0
time_start = 0
dist = 0
rawdist = 0
set_dist = 10
pins.digital_write_pin(DigitalPin.P15, 1)
state = 0

def on_forever():
    global rawdist, dist, state, time_start, time_finish, time1
    while state == 0:
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.FORWARD,
            20)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.FORWARD,
            20)
        pins.digital_write_pin(DigitalPin.P15, 0)
        pins.digital_write_pin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analog_read_pin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.show_number(dist)
        basic.pause(200)
        if dist < set_dist:
            state = 1
    while state == 1:
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.FORWARD,
            75)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.REVERSE,
            75)
        basic.pause(750)
        time_start = control.millis()
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.FORWARD,
            20)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.FORWARD,
            20)
        if dist < set_dist:
            state = 2
            time_finish = control.millis()
            time1 = time_finish - time_start
basic.forever(on_forever)
