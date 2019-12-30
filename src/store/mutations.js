'use strict'

/**
 * @typedef {object} Alert
 * @property {string} message - What should the alert read?
 * @property {string} level - What kind of alert? eg: 'warning', 'success', 'info', 'danger'
 */

import shuffle from 'lodash.shuffle'
import getRounds from './utils/rounds'

import {
    tick,
    pickup,
    success,
    hurt
} from './../assets/sounds/'

import {
    SET_ROUND_ORDER,
    QUEUE_NEXT_ROUND,
    DECREMENT_TIMER,
    TOGGLE_COUNTING_DOWN,
    SET_COUNTING_DOWN,
    SET_SHOULD_SCORE_EMOTION,
    SCORE_EMOTION_REQUEST,
    SCORE_EMOTION_SUCCESS,
    SCORE_EMOTION_FAILURE,
    SAVE_FACE_TO_EMOTION,
    TOGGLE_DEMO_MODE,
    SET_ALERT,
    SET_VIDEO_SIZE,
    SET_CANVAS_RECT,
    HIDE_FLASH
} from './mutation-types'

export default {

    /**
     * @name
     * SET_ALERT
     * @description
     * Given an Alert object, sets the state of alert.
     * @param {Alert}
     */

    [SET_ALERT] (state, alert) {
        state.alert = alert
    },

    /**
     * @name
     * SET_ROUND_ORDER
     * @description
     * Sets the initial state for a new game.
     * Sorts the rounds, sets the index to zero, and clears any alerts.
     */

    [SET_ROUND_ORDER] (state) {
        state.rounds = shuffle(getRounds())
        state.roundIndex = 0
        state.alert = {}
    },

    /**
     * @name
     * QUEUE_NEXT_ROUND
     * @description
     * After a round has completed, prepares the state for
     * the next round.
     */

    [QUEUE_NEXT_ROUND] (state) {
        success.play()
        state.faces = []
        state.alert = {}
        state.timer = state.config.roundTime
        state.roundIndex = state.roundIndex + 1
        state.countingDown = true
        state.shouldScoreEmotion = true
    },

    /**
     * @name
     * DECREMENT_TIMER
     * @description
     * In a given round, responsible for decrementing the timer once
     * every game tick.  If the timer is zero, set counting down to false.
     */

    [DECREMENT_TIMER] (state) {
        if (state.countingDown && state.timer) {
            state.timer = state.timer - 1
            tick.play()
        }
        if (!state.timer) {
            pickup.play()
            state.countingDown = false
        }
    },

    /**
     * @name
     * TOGGLE_COUNTING_DOWN
     * @description
     * countingDown determines if the game should be decrementing the timer
     * value or not.
     */

    [TOGGLE_COUNTING_DOWN] (state) {
        state.countingDown = !state.countingDown
    },

    /**
     * @name
     * SET_COUNTING_DOWN
     * @param {boolean} bool
     * @description
     * countingDown determines if the game should be decrementing the timer
     * value or not.
     */

    [SET_COUNTING_DOWN] (state, bool) {
        state.countingDown = bool
    },

    /**
     * @name
     * SET_SHOULD_SCORE_EMOTION
     * @param {boolean} bool
     * if shouldScoreEmotion is true, the game will get an image blob
     * from the canvas and post it to the Emotion API.
     */

    [SET_SHOULD_SCORE_EMOTION] (state, bool) {
        state.shouldScoreEmotion = bool
    },

    /**
     * @name
     * SCORE_EMOTION_REQUEST
     * @description
     * When a request to the Emotion API is inflight, set fetching to true.
     */

    [SCORE_EMOTION_REQUEST] (state) {
        state.fetching = true
        state.showFlash = true
    },

    /**
     * @name
     * SCORE_EMOTION_SUCCESS
     * @description
     * Called when a request to the EMOTION API is successful.
     * If there are no faces, alert the user.
     */

    [SCORE_EMOTION_SUCCESS] (state, response) {
        state.faces = response
        state.fetching = false
        if (state.faces.length === 0) {
            state.alert = {
                message: 'No Faces Found',
                level: 'danger'
            }
        }
    },

    /**
     * @name
     * SCORE_EMOTION_FAILURE
     * @description
     * If there was an error posting to the emotion API, alert the user.
     */

    [SCORE_EMOTION_FAILURE] (state, error) {
        state.fetching = false
        hurt.play()
        // TODO: Customize the alert based on the error message
        state.alert = {
            message: 'Emotion Score Error :((((',
            level: 'danger'
        }
    },

    /**
     * @name
     * SAVE_FACE_TO_EMOTION
     * @description
     * Saves each face in the given photo (including score) to the round object.
     */

    [SAVE_FACE_TO_EMOTION] (state, face) {
        state.rounds[state.roundIndex].results.push(face)
    },

    /**
     * @name
     * TOGGLE_DEMO_MODE
     * @description
     * If demoMode is true, the game will restart itself after a given amount of time.
     */

    [TOGGLE_DEMO_MODE] (state) {
        state.config.demoMode = !state.config.demoMode
    },

    /**
     * @name
     * SET_VIDEO_SRC_RECT
     * @description
     * How big is the source video? Set this to state.
     */

    [SET_VIDEO_SIZE] (state, size) {
       state.videoSrcSize = size
    },

    /**
     * @name
     * SET_CANVAS_RECT
     * @description
     * How big is the canvas? Set this to state.
     */

    [SET_CANVAS_RECT] (state, rect) {
       state.canvasRect = rect
    },

    /**
     * @name
     * HIDE_FLASH
     * @description
     * If showFlash is false, the camera flash will be turned off.
     */

    [HIDE_FLASH] (state) {
       state.showFlash = false
    }
}
