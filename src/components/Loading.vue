<template>
    <div class="loading">
        <template v-if="fetching">
            <div class="loading-icon">
                <img :src="require('./../assets/sketchy-loading.png')" />
            </div>
        </template>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'

export default {
    name: 'loading',
    computed: {
        ...mapState(['fetching'])
    }
}
</script>

<style>
    .loading {
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading .loading-icon {
        margin: 0;
        animation: spin 1s ease-in infinite;
        filter: invert(100%);
    }

    .loading .loading-icon img {
        display: block;
    }

    @keyframes spin {
        0% {
            transform:rotate(0deg);
        }
        100% {
            transform:rotate(-360deg);
        }
    }

</style>


