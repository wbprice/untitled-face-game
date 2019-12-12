<template>
    <div id="goal">
        <template v-if="countingDown">
            <h1 class="task shake">{{task}}</h1>
        </template>
    </div>
</template>

<script>

import {
    mapState
} from 'vuex';

export default {
    name: 'RoundGoal',
    computed: {
        ...mapState([
            'rounds',
            'roundIndex',
            'timer',
            'countingDown'
        ]),
        task() {
            const task = this.rounds[this.roundIndex];
            return task && task.label;
        }
    }
};
</script>

<style scoped>
    #goal {
        z-index: 1;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #goal .task {
        color: white;
        font-size: 7em;
        margin: 0;
        text-shadow:
            3px 3px 0 #000,
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000;
    }

    @keyframes shake {
        0% { 
            transform: rotate(.025turn);
        }
        49%{
            transform: rotate(.025turn);
        }
        50% { 
            transform: rotate(-.025turn);
        }
        100% { 
            transform: rotate(-.025turn);
        }
    }

    .shake { 
        animation: shake 1s ease infinite;
    }
</style>


