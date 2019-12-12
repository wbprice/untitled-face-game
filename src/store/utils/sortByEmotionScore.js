'use strict';

/**
 * @name
 * getEmotionScore
 * @private
 * @description
 * Given a desired emotion and an object describing the Emotion APIs
 * guess for a given face, returns a score from 0 to 100.
 * @param {object} scores
 * @param {string} emotion
 * @return {number}
 */
function getScore(scores, emotion) {
    return Math.round(scores[emotion] * 100);
}

/**
 * @name
 * sortByEmotionScore
 * @description
 * Iterates over a collection of faces, determines the score for each face
 * given a target emotion, and then returns a copy of the collection sorted
 * by score.
 * @param {array[obj]} faces - An array of objects describing faces seen by the Azure Emotion API.
 * @param {string} targetEmotion - a string describing an emotion e.g. 'happiness'
 * @returns {array[obj]}
 */

function sortByEmotionScore(faces, targetEmotion) {
    return faces.map(face => {
        return Object.assign({}, face, {
            game: { score: getScore(face.scores, targetEmotion)
        }});
    }).sort((a, b) => {
        if (a.game.score > b.game.score) {
            return -1;
        } else if (a.game.score < b.game.score) {
            return 1;
        }
        return 0;
    });
}

export default sortByEmotionScore;
