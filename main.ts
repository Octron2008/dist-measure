let dist = 0
let rawdist = 0
let set_dist = 10
pins.digitalWritePin(DigitalPin.P15, 1)
let state = 0
basic.forever(function () {
    while (state == 0) {
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 20)
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Forward, 20)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(200)
        rawdist = pins.analogReadPin(AnalogPin.P2)
        dist = rawdist * 1.1
        basic.pause(200)
        if (dist < set_dist) {
            state = 1
        }
    }
    while (false) {
    	
    }
})
