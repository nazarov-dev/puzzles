<template>
    <div>
        <header>
            <h1>
                Time:
                <GameTimer :stopTimer="stopTimer"></GameTimer>
                <span v-show="isWin"> - You win!!!</span>
            </h1>

            <div v-if="puzzleImage">
                <ZoomControls :step="zoomStep"></ZoomControls>

                <br><br>

                <button v-show="!isWin" @click="saveData">Save</button> |
                <button @click="reset">Reset</button> |

                <button @click="displayImagePreview">Preview</button>
                <ImagePreview :show="showPreview"></ImagePreview>
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
    import { importPuzzles } from "../services/PuzzlesService";
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
          isWin: false,
          stopTimer: false,
          showPreview: false,
          zoomStep: 0.5,
      }
    },

    computed: {
        ...mapState([
            'puzzleImage',
        ]),

        blurImage() {
            return this.showPreview;
        }
    },

    methods: {
        ...mapActions([
            'initApp',
            'saveData',
            'resetData',
            'updateCanvasSize',
        ]),

        userWin() {
            this.isWin = true;
            this.stopTimer = true;
        },

        displayImagePreview() {
            this.showPreview = !this.showPreview;
        },

        reset() {
            // reset saved data in localStorage
            this.resetData();

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

        let importData = window.puzzles.importData;

        if (importData) {
            let { time, groups, tilesFlip } = importPuzzles(importData);

            window.puzzles.time = time;
            window.puzzles.groups = groups;
            window.puzzles.tilesFlip = tilesFlip;
        }

        this.initApp(window.puzzles);
    }
}
</script>

<style scoped>
    #puzzle-container {
        max-width: 100%;
        /*width: 600px;*/
        /*height: 450px;*/
        /*margin: 20px auto;*/
        width: 100%;
        height: 100vh;
        margin: 0;
        background: #eee;
    }

    .blur {
        filter: blur(4px);
    }
</style>