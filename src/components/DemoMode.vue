<template>
    <div class="autoplay">
        <label
            class="checkbox" 
            v-on:change="TOGGLE_DEMO_MODE"
            for="demo">
                <div v-bind:class="[config.demoMode ? 'checked' : '', 'checkbox-indicator']"></div>
                <input
                    id="demo" 
                    type="checkbox"
                    readonly
                    :value="config.demoMode" />
            Demo Mode
        </label>
        <p>The game will restart itself after completion.  Great for parties!</p>
    </div>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';

export default {
    name: 'DemoMode',
    computed: {
        ...mapState(['config'])
    },
    methods: {
        ...mapMutations(['TOGGLE_DEMO_MODE'])
    }
};
</script>

<style>
    .autoplay {
        padding: 1em;
        margin: 0 auto 2em auto;
    }

    .autoplay label {
        font-weight: bold;
    }

    .autoplay p {
        margin-bottom: 0;
    }

    .autoplay .checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 -1em;
    }

    .autoplay .checkbox-indicator {
        width: 36px;
        height: 36px;
        background: white;
        box-shadow: inset 0 0 0 3px black,
                    inset 0 0 0 6px white;
        border-radius: 4px;
        margin-right: .5em;
    }
    
    .autoplay .checkbox-indicator.checked {
        background: black;
    }

    .autoplay input {
        display: none;
        z-index: -1;
    }
</style>


