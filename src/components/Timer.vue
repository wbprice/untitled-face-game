<template>
    <div class="timer"
         v-bind:class="{'shot': !countingDown}">
        <Icon icon="camera_alt" />
        <template v-if="countingDown">
            <span>{{timer}}</span>
        </template>
    </div>
</template>

<script>
import Icon from './Icon';
import {
    mapState
} from 'vuex';

export default {
    name: 'Timer',
    components: {
        Icon
    },
    computed: {
        ...mapState([
            'timer'
        ]),
        countingDown() {
            return this.timer > 0;
        }
    }
};
</script>

<style>
    .timer.shot {
        background: white;
        color: black;
    }

    .timer {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: .25em;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        background: black;
        color: white;
        height: 200px;
        width: 200px;
        line-height: 48px;
        clip-path: polygon(0% 15%, 
                           12% 55%,
                           42% 31%,
                           36% 75%,
                           77% 61%,
                           65% 92%,
                           100% 100%, 
                           0% 100%);
    }

    .timer > span {
        margin-left: .125em;
        font-size: 2em;
    }
</style>


