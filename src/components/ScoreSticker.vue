<template>
    <div class="score-sticker">
        <div class="score-points">
            <div class="points shake">
                {{face.game.score}} pts.
            </div>
        </div>
    </div>
</template>

<style scoped>
    .score-sticker {
        width: 100%;
    }

    .score-points {
        position: absolute;
        top: 125%;
        width: 100%;
    }

    .points {
        display: inline-block;
        margin: 0 auto;
        padding: 0 1em;
        color: white;
        text-align: center;
        font-size: 2.5em;
        font-family: Amatic SC, Helvetica, Arial, sans-serif;
        background: black;
        border-radius: 4px;
    }

    @keyframes shake {
        0% {
            transform: rotate(.0125turn);
        }
        49%{
            transform: rotate(.0125turn);
        }
        50% {
            transform: rotate(-.0125turn);
        }
        100% {
            transform: rotate(-.0125turn);
        }
    }

    .shake {
        animation: shake 1s ease infinite;
    }

</style>

<script>
export default {
    name: 'ScoreSticker',
    props: ['face', 'rank']
};
</script>

