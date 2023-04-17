let total_distance = 0
let sum_time = 0
let time2 = 0
let time1 = 0
let time_finish = 0
let time_start = 0
let dist = 0
let rawdist = 0
let set_dist = 10
pins.digitalWritePin(DigitalPin.P15, 1)
let state = 0
basic.forever(function () {
    while (state == 0) {
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Forward, 50)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analogReadPin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.showNumber(dist)
        basic.pause(200)
        if (dist < set_dist) {
            state = 1
        }
    }
    while (state == 1) {
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 75)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 75)
        basic.pause(750)
        time_start = control.millis()
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Forward, 50)
        if (dist < set_dist) {
            time_finish = control.millis()
            time1 = time_finish - time_start
            state = 2
        }
    }
    while (state == 2) {
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 50)
        basic.pause(300)
        while (dist < set_dist) {
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 50)
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Forward, 50)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.digitalWritePin(DigitalPin.P15, 1)
            basic.pause(200)
            rawdist = pins.analogReadPin(AnalogPin.P2)
            dist = rawdist * 1.1
            basic.showNumber(dist)
            basic.pause(200)
        }
        if (dist < set_dist) {
            state = 3
        }
    }
    while (state == 3) {
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 75)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 75)
        basic.pause(750)
        time_start = control.millis()
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 50)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Forward, 50)
        if (dist < set_dist) {
            time_finish = control.millis()
            time2 = time_finish - time_start
            state = 4
        }
    }
    while (state == 4) {
        sum_time = time1 + time2
        total_distance = sum_time * 22
        basic.showNumber(total_distance)
    }
})
