'use strict'

/**
 * @name
 * getRounds
 * @description
 * Returns a list of objects that describe each round.
 * @returns {array[object]}
 */

export default function getRounds() {
    return [{
        value: 'anger',
        label: 'Get Angry!',
        results: []
    }, {
        value: 'fear',
        label: 'Look scared!',
        results: []
    }, {
        value: 'happiness',
        label: 'Get Happy! :)))',
        results: []
    }, {
        value: 'neutral',
        label: 'Look bored',
        results: []
    }, {
        value: 'sadness',
        label: 'Look sad :(',
        results: []
    }, {
        value: 'surprise',
        label: 'Look Surprised!',
        results: []
    }]
}
