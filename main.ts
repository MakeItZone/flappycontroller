/**
 * Note- display only
 * 
 * shows "wing" status.
 * 
 * Could also show thrust and drop with custom sprites.
 */
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        rightNewFlap = true
        rightTimeStamp = input.runningTime()
    } else if (receivedNumber == 2) {
        leftNewFlap = true
        leftTimeStamp = input.runningTime()
    } else if (receivedNumber == 3) {
        newThrust = true
    } else if (receivedNumber == 4) {
        newDrop = true
    } else if (receivedNumber == 5) {
        newThrust = true
        newDrop = true
    }
})
let newDrop = false
let newThrust = false
let leftTimeStamp = 0
let leftNewFlap = false
let rightTimeStamp = 0
let rightNewFlap = false
serial.redirectToUSB()
radio.setGroup(1)
rightNewFlap = false
rightTimeStamp = 0
leftNewFlap = false
leftTimeStamp = 0
let output = ""
let threshold = 500
newThrust = false
newDrop = false
basic.forever(function () {
    output = ""
    if (rightNewFlap && leftNewFlap) {
        rightNewFlap = false
        leftNewFlap = false
        output = "" + output + "U"
        basic.showArrow(ArrowNames.North)
    } else if (rightNewFlap) {
        rightNewFlap = false
        if (rightTimeStamp - leftTimeStamp < threshold) {
            output = "" + output + "UR"
            basic.showArrow(ArrowNames.NorthEast)
        } else {
            basic.showArrow(ArrowNames.East)
            output = "" + output + "R"
        }
    } else if (leftNewFlap) {
        leftNewFlap = false
        if (leftTimeStamp - rightTimeStamp < threshold) {
            output = "" + output + "UL"
            basic.showArrow(ArrowNames.NorthWest)
        } else {
            basic.showArrow(ArrowNames.West)
            output = "" + output + "L"
        }
    }
    if (newThrust) {
        newThrust = false
        output = "" + output + "T"
    }
    if (newDrop) {
        newDrop = false
        output = "" + output + "D"
    }
    if (output.length > 0) {
        serial.writeLine(output)
    }
    basic.pause(10)
})
