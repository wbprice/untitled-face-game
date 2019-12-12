<template>
    <div>
        <header>
            <h1>Duckface</h1>
            <p>Nonstop Emotion-Matching Game</p>
        </header>

        <section class="description">
            <h2 class="outline">Put your best face foward</h2>
            <div class="photos">
                <div class="photo hard-shadow">
                    <img :src="require('./../assets/angry.jpeg')" />
                </div>
                <div class="photo hard-shadow">
                    <img :src="require('./../assets/happy.jpeg')" />
                </div>
                <div class="photo hard-shadow">
                    <img :src="require('./../assets/surprise.jpeg')" />
                </div>
            </div>

            <p>Each round of this game has a desired emotion (happiness, anger, sadness).  The player who shows expressions the best each round wins!</p>

            <router-link to="/play" class="button">Get Started</router-link>
        </section>

        <DemoMode />
    </div>
</template>

<script>
import DemoMode from './DemoMode';

export default {
    name: 'Index',
    components: {
        DemoMode
    }
}
</script>

<style scoped>
    header {
        margin-bottom: 2em;
    }
    
    header h1, header p {
        margin: 0;
    }

    header h1 {
        font-size: 8em;
        line-height: 1em;
    }

    header p {
        text-transform: uppercase;
        font-weight: bold;
        font-style: italic;
    }

    section.description {
        max-width: 640px;
        margin: 0 auto;
        margin-bottom: 3em;
        text-align: center;
    }

    section.description p {
        font-size: 1.25em;
    }

    section.description p:last-of-type {
        margin-bottom: 2em;
    }

    section.description .button {
        margin-top: 3em;
    }

    .autoplay {
        margin-top: 3em;
    }

    .photos {
        display: flex;
        justify-content: center;
        margin-bottom: 3em;
    }

    .photos .photo {
        font-size: .5em;
        padding: 1em 1em 2em 1em;
        background: white;
        margin: 0 1.5em;
        border-radius: 4px;
    }

    .photos .photo img {
        width: 125px;
        height: 125px;
    }
    
    h2 {
        font-size: 3em;
        color: white;
    }
</style>
