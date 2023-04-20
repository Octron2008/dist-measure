input.onButtonPressed(Button.A, function () {
    state = 0
    test_state = 0
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
let total_distance = 0
let sum_time = 0
let time2 = 0
let time1 = 0
let time_finish = 0
let time_start = 0
let dist = 0
let rawdist = 0
let test_state = 0
let state = 0
state = 10
let set_dist = 10
test_state = 10
pins.digitalWritePin(DigitalPin.P15, 1)
basic.forever(function () {
    while (state == 0) {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analogReadPin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.showNumber(dist)
        basic.pause(200)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 50)
        if (dist < set_dist) {
            state = 1
        }
    }
    while (state == 0) {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analogReadPin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.showNumber(dist)
        basic.pause(200)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 50)
        if (dist < set_dist) {
            state = 1
        }
    }
    while (state == 1) {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analogReadPin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.showNumber(dist)
        basic.pause(200)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 75)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 75)
        basic.pause(750)
        time_start = control.millis()
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 50)
        if (dist < set_dist) {
            time_finish = control.millis()
            time1 = time_finish - time_start
            state = 2
        }
    }
    while (state == 2) {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analogReadPin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.showNumber(dist)
        basic.pause(200)
        basic.pause(500)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 50)
        basic.pause(300)
        while (dist < set_dist) {
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 50)
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 50)
        }
        if (dist < set_dist) {
            state = 3
        }
    }
    while (state == 3) {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analogReadPin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.showNumber(dist)
        basic.pause(200)
        basic.pause(500)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 75)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 75)
        basic.pause(750)
        time_start = control.millis()
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 50)
        if (dist < set_dist) {
            time_finish = control.millis()
            time2 = time_finish - time_start
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 10)
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 10)
            state = 4
        }
    }
    while (state == 4) {
        sum_time = time1 + time2
        total_distance = sum_time * 22
        total_distance = total_distance + 40
        basic.showNumber(total_distance)
    }
})
