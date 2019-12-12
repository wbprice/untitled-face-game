<template>
    <div class="scoreboard">
        <h1>Scores</h1>
        
        <router-link to="/play" class="button">Play Again</router-link>

        <template v-for="(round, index) in rounds">
            <div v-bind:key="index">
                <p class="task">{{round.label}}</p>
                <div class="photos">
                    <template v-for="(image, dex) in round.results">
                        <div class="photo hard-shadow" v-bind:key="dex">
                            <img v-bind:src="getObjectUrl(image.blob)" />
                            <p class="score">{{image.game.score}} pts.</p>
                        </div>
                    </template>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';

import {
    SET_ALERT
} from './../store/mutation-types';

import router from './../router/';

export default {
    name: 'Scoreboard',
    methods: {
        ...mapMutations([
            SET_ALERT
        ]),
        getObjectUrl(blob) {
            return URL.createObjectURL(blob);
        }
    },
    computed: {
        ...mapState([
            'rounds',
            'demoMode',
            'config'
        ])
    },
    mounted() {
        if (this.config.demoMode) {
            this.SET_ALERT({message: 'Next game starting soon!', level: 'success'});
            setTimeout(() => {
                router.push('/play');
            }, this.config.displayScoreboardTime * 1000);
        }
    }
};
</script>

<style>
    .scoreboard {
        margin-top: 6em;
    }

    .task {
        font-size: 3em;
        font-family: Amatic SC, Helvetica, Aria, sans-serif;
        margin: .5em 0;
    }

    .photos {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .photos:last-of-type {
        margin-bottom: 3em;
    }

    .photos > div {
        margin: 0 1.5em;
    }

    .photo {
        font-size: .5em;
        padding: 1em;
        background: white;
        border-radius: 2px;
    }

    .photo img {
        width: 150px;
        height: 150px;
        filter: sepia(33%);
    }

    .photo .score {
        font-family: Amatic SC, Helvetica, Aria, sans-serif;
        font-weight: bold;
        padding: 0;
        margin: 0;
        font-size: 6em;
    }

</style>