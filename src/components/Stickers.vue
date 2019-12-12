<template>
    <div id="stickers">
        <template v-for="(face, index) in faces">
            <div 
                class="faceRect"
                v-bind:key="index" 
                v-bind:style="positionFaceRect(face)">
                <template v-if="config.debug">
                    <DebugSticker />
                </template>
                <ScoreSticker
                    v-bind:rank="index"
                    v-bind:face="face" />
            </div>
        </template>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex';

import DebugSticker from './DebugSticker';
import ScoreSticker from './ScoreSticker';

export default {
    name: 'Stickers',
    components: {
        DebugSticker,
        ScoreSticker
    },
    computed: {
        ...mapState([
            'faces',
            'config'
        ])
    },
    methods: {
        positionFaceRect(face) {
            const rect = face.faceRectangle;
            return {
                height: `${rect.height}px`,
                width: `${rect.width}px`,
                top: `${rect.top + 32}px`,
                left: `${rect.left + 32}px`
            };
        }
    }
};
</script>

<style scoped>
    #stickers {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    .faceRect {
        position: absolute;
        padding: 0;
    }

    .faceRect > div {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
    }
</style>