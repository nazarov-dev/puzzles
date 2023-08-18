<template>
    <div id="puzzle-main">
        <header>
            <h2>
                Time: <GameTimer></GameTimer>
                <span v-show="isUserWin"> - You win!!!</span>
            </h2>

            <div v-if="puzzleImage" class="controls">
                <p>
                    <ZoomControls :step="zoomStep"></ZoomControls> |
                    <button @click="fullScreen">FullScreen</button> |
                </p>

                <p>
                    <button v-show="!isUserWin" @click="saveData">Save</button> |
                    <button @click="reset">Reset</button> |

                    <button @click="displayImagePreview">Preview</button>
                    <ImagePreview :show="showPreview"></ImagePreview>
                </p>
            </div>
        </header>

        <div id="puzzle-container" ref="canvasContainer" :class="{blur: blurImage}">
            <Puzzles v-if="puzzleImage"
                     :zoomStep="zoomStep"
                     :blurImage="blurImage"
                     @win="userWin"
            ></Puzzles>
            <LoadSpinner v-else></LoadSpinner>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import Puzzles from '../components/puzzleCanvas/Puzzles';
    import GameTimer from "../components/headerControls/GameTimer";
    import ImagePreview from "../components/headerControls/ImagePreview";
    import ZoomControls from "../components/headerControls/ZoomControls";
    import LoadSpinner from "../components/puzzleCanvas/LoadSpinner";

export default {
  name: 'App',
  components: {
      Puzzles,
      GameTimer,
      ImagePreview,
      ZoomControls,
      LoadSpinner,
  },

    data() {
      return {
          showPreview: false,
          zoomStep: 0.5,
      }
    },

    computed: {
        ...mapState([
            'puzzleImage',
            'isUserWin',
        ]),

        blurImage() {
            return this.showPreview;
        }
    },

    methods: {
        ...mapActions([
            'initApp',
            'saveData',
            'resetLocalStorageData',
            'updateCanvasSize',
            'userWin',
            'fullScreen',
        ]),

        displayImagePreview() {
            this.showPreview = !this.showPreview;
        },

        reset() {
            // reset saved data in localStorage
            this.resetLocalStorageData();

            window.handleReset = true;

            // reload the page
            location.reload();
        },

    },

    mounted() {
        const canvasContainer = this.$refs.canvasContainer;
        this.updateCanvasSize(canvasContainer);
    },

    beforeMount() {
      // here we can initialize the data from server on the first load

        this.initApp(window.puzzles);
    }
}
</script>

<style scoped>
    header {
        position: relative;
        z-index: 1;
        padding: 0 20px 1px;
        background: #fff;
        box-shadow: 2px 2px 5px #555;
    }

    @media (min-width: 800px) {
        header {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px 20px;
        }
    }

    h2 {
        margin: 0;
        padding: 0 20px 2px 0;
    }

    p {
        margin: 0 0 7px;
    }

    @media (min-width: 800px) {
        p {
            margin: 0;
        }
    }

    @media (min-width: 800px) {
        .controls {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    button {
        margin: 0 5px;
    }

    .blur {
        filter: blur(4px);
    }

    #puzzle-container {
        width: 100%;
        height: calc(100vh - 86px); /* reduce the header height */
        margin: 0;
        background: #eee;
    }

    @media (min-width: 800px) {
        #puzzle-container {
            height: calc(100vh - 39px); /* reduce the header height */
        }
    }
</style>