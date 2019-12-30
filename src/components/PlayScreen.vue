<template>
    <div class="container">
        <div ref="mirror" class="mirror hard-shadow">
            <video ref="video" v-on:canplay="onCanPlay" />
            <canvas :width="canvasRect.width" :height="canvasRect.height" ref="main" class="main"/>
            <canvas ref="face" class="face"/>
            <Timer />
        </div>
    </div>
</template>

<script>
import Timer from './Timer'

import {
    mapActions,
    mapState,
    mapMutations
} from 'vuex'

import {
    SET_COUNTING_DOWN,
    SET_SHOULD_SCORE_EMOTION,
    SAVE_FACE_TO_EMOTION,
    SET_ALERT,
    SET_CANVAS_RECT,
    SET_VIDEO_SRC_RECT,
    SET_VIDEO_SIZE
} from './../store/mutation-types'

/**
 * @name requestVideo
 * @description
 * When the component is mounted, request permission to use the webcam.
 * If permission is granted, pipe video to the video element.
 * If not, show an error message.
 */

function requestVideo(mirr) {
    const { video } = this.$refs

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
            video.srcObject = stream
            video.play()
        })
        .catch(error => {
            this.SET_ALERT({
                message: 'This game needs your permission to record video :(((',
                level: 'danger'
            })
        })
}

/**
 * @name
 * onCanPlay
 * @description
 * Sets up the canvas when the video feed opens.
 * Afterwards, start piping the video content to the canvas and
 * start the timer.
 */

function onCanPlay() {
    getVideoSize.call(this)
    setCanvasRect.call(this)
    this.SET_COUNTING_DOWN(true)
    this.paintCanvasInterval = setInterval(paintCanvas.bind(this), 16.67)
}

/**
 * @name onDestroy
 * @description
 * Called when the component is unmounted.  Clears paintCanvasInterval.
 */

function onDestroy() {
    clearInterval(this.paintCanvasInterval)
}

/**
 * @name
 * paintCanvas
 * @description
 * Function responsible for painting the input from the video to the canvas.
 * Called 60 times a second.
 */

function paintCanvas() {
    const { main } = this.$refs
    if (this.countingDown) {
        paintContext.call(this)
    } else if (this.shouldScoreEmotion) {
        this.SET_SHOULD_SCORE_EMOTION(false)
        return main.toBlob((blob) => {
            return this.scoreEmotion(blob)
        }, 'image/jpeg', .75)
    }
}
/**
 * @name getVideoSize
 * @description
 * Records the size of the video stream in state.
 */

function getVideoSize(video) {
    const { videoWidth, videoHeight } = this.$refs.video
    this.SET_VIDEO_SIZE({width: videoWidth, height: videoHeight})
}

/**
 * @name setCanvasRect
 * @description
 * Sets the desired canvas size for gameplay in state.
 */

function setCanvasRect(mirror) {
    const { width, height, x, y } = this.$refs.mirror.getClientRects()[0]
    this.SET_CANVAS_RECT({width: width - 32, height: height - 32, x, y})
}

/**
 * @name
 * paintContext
 */

function paintContext() {
    const { main, video } = this.$refs
    const dims = scaleVideo.call(this)
    const context = main.getContext('2d')

    context.drawImage(
        video,
        dims.srcXOffset,
        dims.srcYOffset,
        dims.srcWidth,
        dims.srcHeight,
        dims.destXOffset,
        dims.destYOffset,
        dims.destWidth,
        dims.destHeight
    )
}

/**
 * @name scaleVideo
 * @description
 * Responsible for selecting a video scaling strategy based on the viewport orientation.
 */

function scaleVideo() {
    const { width, height } = this.canvasRect
    const orientation = width > height ? 'landscape' : 'vertical'

    const strategy = (() => {
        switch (orientation) {
            case 'vertical':
                return fitByHeight
            case 'landscape':
                return fitByWidth
            default:
                return centered
        }
    })()
    return strategy.call(this)
}

/**
 * @name centered
 * @description
 * Performs no scaling.  Centers the video in the stream.
 */

function centered() {
    const srcWidth = this.videoSrcSize.width
    const srcHeight = this.videoSrcSize.height
    const destWidth = this.canvasRect.width
    const destHeight = this.canvasRect.height
    const destXOffset = (destWidth - srcWidth) / 2
    const destYOffset = (destHeight - srcHeight) / 2

    return {
        srcXOffset: 0,
        srcYOffset: 0,
        srcWidth: srcWidth,
        srcHeight: srcHeight,
        destXOffset: destXOffset,
        destYOffset: destYOffset,
        destWidth: srcWidth,
        destHeight: srcHeight
    }
}

/**
 * @name fitByHeight
 * @description
 * Scales the video to fit the canvas vertically.
 */

function fitByHeight() {
    const srcWidth = this.videoSrcSize.width
    const srcHeight = this.videoSrcSize.height
    const destHeight = this.canvasRect.height
    const verticalScalingFactor = destHeight / srcHeight
    const destWidth = srcWidth * verticalScalingFactor
    const destXOffset = (this.canvasRect.width - destWidth) / 2

    return {
        srcXOffset: 0,
        srcYOffset: 0,
        srcWidth: srcWidth,
        srcHeight: srcHeight,
        destXOffset: destXOffset,
        destYOffset: 0,
        destWidth: destWidth,
        destHeight: destHeight
    }
}

/**
 * @name fitByWidth
 * @description
 * Scales the video to fit the canvas by width
 */

function fitByWidth() {
    const srcWidth = this.videoSrcSize.width
    const srcHeight = this.videoSrcSize.height
    const destWidth = this.canvasRect.width
    const horizontalScalingFactor = destWidth / srcWidth
    const destHeight = srcHeight * horizontalScalingFactor
    const destYOffset = (this.canvasRect.height - destHeight) / 2

    return {
        srcXOffset: 0,
        srcYOffset: 0,
        srcWidth: srcWidth,
        srcHeight: srcHeight,
        destXOffset: 0,
        destYOffset: destYOffset,
        destWidth: destWidth,
        destHeight: destHeight
    }
}

/**
 * @name captureFaces
 * @description
 * When new face captures are provided by Azure, get a blob representation of each face
 * from the canvas and save it for later.
 */

function captureFaces(newFaces, oldFaces) {
    const { main } = this.$refs
    const faceCanvas = this.$refs.face
    const context = faceCanvas.getContext('2d')

    if (!newFaces.length) {
        return
    }

    return Promise.all(newFaces.map(face => {
        return new Promise((resolve, reject) => {
            const {
                height, width, left, top
            } = face.faceRectangle

            faceCanvas.width = width
            faceCanvas.height = height

            context.drawImage(
                main,
                left, top,
                width, height,
                0, 0,
                width, height
            )

            faceCanvas.toBlob((blob) => {
                face.blob = blob
                this.SAVE_FACE_TO_EMOTION(face)
                resolve()
            }, 'image/jpeg', .75)
        })
    }))
}

export default {
    name: 'PlayScreen',
    components: {
        Timer
    },
    computed: {
        ...mapState([
            'countingDown',
            'faces',
            'shouldScoreEmotion',
            'config',
            'canvasRect',
            'videoSrcSize'
        ])
    },
    watch: {
        faces: captureFaces
    },
    mounted: requestVideo,
    destroyed: onDestroy,
    methods: {
        onCanPlay,
        ...mapMutations([
            SET_COUNTING_DOWN,
            SET_SHOULD_SCORE_EMOTION,
            SAVE_FACE_TO_EMOTION,
            SET_ALERT,
            SET_CANVAS_RECT,
            SET_VIDEO_SRC_RECT,
            SET_VIDEO_SIZE
        ]),
        ...mapActions([
            'scoreEmotion'
        ])
    }
}

</script>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        width: 100vw;
        height: 100vh;
        margin: -2em;
        padding: 2em 2em 2em 2em;
    }

    video {
        display: none;
    }

    .mirror {
        border-radius: 1em;
        box-sizing: border-box;
        padding: 1em;
        background: white;
        display: relative;
        padding: 1em;
    }

    canvas.main {
        background: rgb(241, 246, 250);
        border-radius: .5em;
        width: 100%;
        height: 100%;
    }

    canvas.face {
        position: fixed;
        left: 16;
        top: 16;
        width: 200px;
        height: 200px;
        visibility: hidden;
    }

    .debug-video, .debug-canvas {
        position: absolute;
        border: 4px solid green;
        padding: 1em;
    }

    .debug-canvas {
        border-color: red;
    }
</style>

