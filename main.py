def on_button_pressed_a():
    global state
    state = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    basic.show_icon(IconNames.SAD)
input.on_button_pressed(Button.B, on_button_pressed_b)

total_distance = 0
sum_time = 0
time2 = 0
time1 = 0
time_finish = 0
time_start = 0
dist = 0
rawdist = 0
state = 0
state = 10
set_dist = 10
pins.digital_write_pin(DigitalPin.P15, 1)

def on_forever():
    global rawdist, dist, state, time_start, time_finish, time1, time2, sum_time, total_distance
    while True:
        pins.digital_write_pin(DigitalPin.P15, 0)
        pins.digital_write_pin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analog_read_pin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.show_number(dist)
        basic.pause(200)
    while state == 0:
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.REVERSE,
            50)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.REVERSE,
            50)
        if dist < set_dist:
            state = 1
    while state == 1:
        basic.pause(500)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.FORWARD,
            75)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.REVERSE,
            75)
        basic.pause(750)
        time_start = control.millis()
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.REVERSE,
            50)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.REVERSE,
            50)
        if dist < set_dist:
            time_finish = control.millis()
            time1 = time_finish - time_start
            state = 2
    while state == 2:
        basic.pause(500)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.FORWARD,
            50)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.REVERSE,
            50)
        basic.pause(300)
        while dist < set_dist:
            kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
                kitronik_motor_driver.MotorDirection.REVERSE,
                50)
            kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
                kitronik_motor_driver.MotorDirection.REVERSE,
                50)
        if dist < set_dist:
            state = 3
    while state == 3:
        basic.pause(500)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.FORWARD,
            75)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.REVERSE,
            75)
        basic.pause(750)
        time_start = control.millis()
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
            kitronik_motor_driver.MotorDirection.REVERSE,
            50)
        kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
            kitronik_motor_driver.MotorDirection.REVERSE,
            50)
        if dist < set_dist:
            time_finish = control.millis()
            time2 = time_finish - time_start
            kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR1,
                kitronik_motor_driver.MotorDirection.REVERSE,
                0)
            kitronik_motor_driver.motor_on(kitronik_motor_driver.Motors.MOTOR2,
                kitronik_motor_driver.MotorDirection.REVERSE,
                0)
            state = 4
    while state == 4:
        sum_time = time1 + time2
        total_distance = sum_time * 22
        total_distance = total_distance + 40
        basic.show_number(total_distance)
basic.forever(on_forever)
