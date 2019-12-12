'use strict';

import router from './../router/';
import 'whatwg-fetch';
import checkStatus from 'fetch-check-http-status';
import sortByEmotionScore from './utils/sortByEmotionScore';
import { blobToBase64String } from 'blob-util';

const {
    AZURE_FUNC_EMOTION_API_ENDPOINT,
    EMOTION_API_ENDPOINT,
    EMOTION_API_KEY
} = process.env;

import {
    SCORE_EMOTION_REQUEST,
    SCORE_EMOTION_SUCCESS,
    QUEUE_NEXT_ROUND,
    SCORE_EMOTION_FAILURE
} from './mutation-types';

/**
 * @name
 * postFaceToEmotionAPI
 * @description
 * Makes a POST request directly to the Emotion API.
 * More performant than proxying the request through
 * an Azure function, but exposes the API key to the client.
 * @param {blob} - An image blob generated using canvas#toBlob
 * @returns {promise}
**/

function postFaceToEmotionAPI(blob) {
    return fetch(EMOTION_API_ENDPOINT, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': EMOTION_API_KEY
        }),
        body: blob
    });
}

/**
 * @name
 * postFaceToAzureFunc
 * @description
 * Proxies a POST request to the Emotion API through an Azure
 * Function. Takes longer than asking directly, but keeps
 * the API key out of the web client.
 * @param {blob} - An image blob generated using canvas#toBlob
 * @return {promise}
 */

function postFaceToAzureFunc(blob) {
    return blobToBase64String(blob)
    .then(base64 => {
        return fetch(AZURE_FUNC_EMOTION_API_ENDPOINT, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                data: base64
            })
        });
    });
}

/**
 * @name
 * postFace
 * @description
 * Facade for working with either useEmotionAPI or useAzureFunc
 * if the emotion API key is in the environemnt, calls the Emotion API
 * directly.
 * @param {blob} - an image blob generated using canvas#toBlob
 * @returns {promise}
 */

function postFace(blob) {
    if (EMOTION_API_KEY === 'undefined') {
        return postFaceToAzureFunc(blob);
    }
    return postFaceToEmotionAPI(blob);
}

/**
 * @name
 * scoreEmotion
 * @description
 * Accepts a blob coming from a canvas element, POSTs the image
 * to the Emotion API, and pipes the response to local state.
 * @param {blob} - an image blob generated using canvas#toBlob
 */

function scoreEmotion({state, commit}, blob) {
    commit(SCORE_EMOTION_REQUEST);
    return postFace(blob)
        .then(checkStatus)
        .then(response => response.json())
        .then(response => {
            commit(SCORE_EMOTION_SUCCESS, sortByEmotionScore(response, state.rounds[state.roundIndex].value));
            setTimeout(() => {
                startNextRound({state, commit});
            }, state.config.displayScoreTime * 1000);
        })
        .catch(error => {
            commit(SCORE_EMOTION_FAILURE, error);
        });
}

/**
 * @name
 * startNextRound
 * @description
 * Starts the next round.  If there are no rounds remaining, changes
 * the route to the score screen
 */

function startNextRound({state, commit}) {
    commit(QUEUE_NEXT_ROUND);
    if (state.roundIndex > state.rounds.length - 1) {
        router.push('/scoreboard');
    }
}

export default {
    scoreEmotion
};
