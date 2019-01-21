let icons = ["F", "P", "H"]
let i = -50
let myId = "d"
let icon = ""
let stop = 0
let prev_msg = ""
// basic.forever(function () {
//     let c = input.temperature()
//     // let f = (c * 18) / 10 + 32
//     basic.showNumber(parseInt('32'))
// })

function show_flash() {
    for (let index = 0; index < 3; index++) {
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
}

radio.setGroup(99)
// function parse(msg: string) {
//     return [msg.charAt(0), msg.charAt(1), msg.charAt(2), msg.substr(3, msg.length - 3)];
// }
// let icons = parse(st);
// [originID, piReceived, originRecieved^2, message]
// need to find a way 
input.onButtonPressed(Button.A, function () {
    if (i == -50) {
        i = 0
    } else if (i == 0) {
        i = icons.length - 1
    } else {
        i = i - 1
    }
    basic.showString(icons[i])
})

input.onButtonPressed(Button.B, function () {
    if (i == -50) {
        i = 0
    } else if (i == icons.length - 1) {
        i = 0
    } else {
        i = i + 1
    }
    icon = icons[i]
    basic.showString(icon)
})

input.onButtonPressed(Button.AB, function () {
    stop = 0
    if (i == -50) {
        i = 0
    }
    let c = input.temperature()
    let st = myId + "00" + icons[i] + c.toString()
    radio.sendString(st)
    basic.showString(st)

})

radio.onReceivedString(function (receivedString) {
    let msg = receivedString
    basic.showString(receivedString)
    basic.pause(1000)
    if (myId != "d") {
        if (stop == 0) {
            if (msg[0] != myId) {
                radio.sendString(msg);
                basic.showIcon(IconNames.No)
                if (msg[1] == '1' && msg[2] == '1') {
                    show_flash()
                    stop = 1
                }
            }
            else {
                if (msg[1] == "1" && msg[0] == myId) {
                    radio.sendString(myId + "1" + "1" + msg.substr(3, msg.length - 3))
                    stop = 1
                    show_flash()
                }
            }
        }
    }
    else {
        if (msg[1] == "0" && msg[2] == "0") {
            if (prev_msg != msg) {
                serial.writeString(msg)
                radio.sendString(msg[0] + "1" + "0" + msg.substr(3, msg.length - 3))
                show_flash()
                prev_msg = msg
            }
        }
    }
})

