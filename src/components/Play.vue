<template>
    <div>
        <Loading />
        <Flash />
        <RoundTask />
        <Stickers />
        <PlayScreen />
    </div>
</template>

<script>
import {
    mapMutations,
    mapState,
    mapActions
} from 'vuex'

import PlayScreen from './PlayScreen'
import RoundTask from './RoundTask'
import Loading from './Loading'
import Stickers from './Stickers'
import Flash from './Flash'

export default {
    name: 'Play',
    components: {
        PlayScreen,
        RoundTask,
        Stickers,
        Loading,
        Flash
    },
    computed: {
        ...mapState([
            'countingDown',
            'fetching',
            'showFlash'
        ])
    },
    methods: {
        ...mapMutations([
            'DECREMENT_TIMER',
            'SET_ROUND_ORDER'
        ]),
        ...mapActions([
            'scoreEmotion'
        ])
    },
    mounted() {
        this.SET_ROUND_ORDER();
        this.gameloop = setInterval(() => {
            if (this.countingDown) {
                this.DECREMENT_TIMER();
            }
        }, 500);
    },
    beforeDestroy() {
        clearInterval(this.gameloop);
    }
}
</script>

<style>

</style>
