<template>
    <div>
        <template v-if="showFlash">
            <div id="flash"></div>
        </template>
    </div>
</template>

<script>
import {
    mapMutations,
    mapState,
    mapActions
} from 'vuex';

export default {
    name: 'flash',
    computed: {
        ...mapState(['showFlash', 'fetching'])
    },
    watch: {
        fetching: function (newState, oldState) {
            if (newState === true) {
                setTimeout(() => {
                    this.HIDE_FLASH();
                }, 1000);
            }
        }
    },
    methods: {
        ...mapMutations([
            'HIDE_FLASH'
        ]),
        ...mapActions([
            'scoreEmotion'
        ])
    }
}
</script>

<style scoped>
    #flash {
        z-index: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;
    }

</style>
