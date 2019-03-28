// Code written by youtube.com/in42u
const robot = require('robotjs')
const sleep = require('sleep')

const coords = {
    // replayButton: [1440, 365],
    // pixelCheck: [1280, 400]

    replayButton: [720, 163],
    pixelCheck: [640, 200]
}

function restart () {
    robot.dragMouse(coords.replayButton[0], coords.replayButton[1])
    robot.mouseClick()
    robot.keyToggle('down', 'down')
}

function jump () {
    robot.keyToggle('down', 'up')
    robot.keyToggle('space', 'down')
    sleep.msleep(270)
    robot.keyToggle('space', 'up')
    sleep.msleep(4)
    robot.keyToggle('down', 'down')
}

function main () {
    restart()
    let jumps = 1;
    while (true) {
        if (robot.getPixelColor(coords.pixelCheck[0], coords.pixelCheck[1]) !== 'f7f7f7') {
            jump()
            console.log(`Jump #${jumps++}`)
        }
    }
}

main()