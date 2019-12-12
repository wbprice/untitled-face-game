<template>
    <div class="alert-container">
        <template v-if="alert.message">
            <div v-bind:class="['alert', alert.level]">
                <span>{{alert.message}}</span>
            </div>
        </template>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex';
export default {
    name: 'Alert',
    computed: {
        ...mapState([
            'alert'
        ])
    }
}
</script>

<style>
    .alert-container {
        position: fixed;
        top: 0em;
        width: 100%;
        z-index: 1000;
        margin: 0 -1 -1 -1em;
        padding: 0 3em;
    }

    .alert {
        max-width: 320px;
        padding: 1em;
        margin: 0 auto;
        border-radius: 4px;
        z-index: 100;
        font-weight: bold;
    }

    .danger {
        background: red;
        color: white;
    }

    .warning {
        background: orange;
        color: white;
    }

    .success {
        background: green;
        color: white;
    }

    .info {
        background: lightskyblue;
    }
</style>
