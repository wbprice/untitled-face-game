'use strict'

export default {
    // The order of rounds to play.
    rounds: [],
    // What round is currently active?
    roundIndex: 0,
    // What is the state of the game timer?
    timer: 5,
    // Should the timer be decremented after each tick?
    countingDown: false,
    // Should the camera flash be on?
    showFlash: false,
    // Is a network request in progress?
    fetching: false,
    // Should a photo be submitted to Azure Emotion API?
    shouldScoreEmotion: true,
    // What faces were found by Azure?
    faces: [],
    // Should an alert be displayed to the player?
    alert: {},
    config: {
        // How long should the game wait before taking a photo?
        roundTime: 5,
        // how long to display scores in seconds
        displayScoreTime: 3,
        // If autoplay is on, how long to show scores before starting again
        displayScoreboardTime: 15,
        // Should we draw green boxes over faces to test face tracking?
        debug: true,
        // Should a new game start after the old one finishes?
        demoMode: false
    },
    canvasRect: {

    },
    videoSrcSize: {

    }
}
