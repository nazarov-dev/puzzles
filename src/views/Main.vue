<template>
    <div>
        <header>
            <h1>
                Time:
                <GameTimer :stopTimer="stopTimer"></GameTimer>
                <span v-show="isWin"> - You win!!!</span>
            </h1>

            <ZoomControls :step="zoomStep"></ZoomControls>

            <br><br>

            <button v-show="!isWin" @click="saveData">Save</button> |

            <button @click="displayImagePreview">Preview</button>
            <ImagePreview :show="showPreview"></ImagePreview>
        </header>

        <PuzzleMatrix
                :zoomStep="zoomStep"
                :blurImage="blurImage"
                @win="userWin"
        ></PuzzleMatrix>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { importPuzzles } from "../services/PuzzlesService";
    import PuzzleMatrix from '../components/puzzleCanvas/PuzzleMatrix';
    import GameTimer from "../components/headerControls/GameTimer";
    import ImagePreview from "../components/headerControls/ImagePreview";
    import ZoomControls from "../components/headerControls/ZoomControls";

export default {
  name: 'App',
  components: {
      ZoomControls,
      ImagePreview,
      GameTimer,
      PuzzleMatrix,
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
            'puzzles',
            'puzzleImage',
            'zoom',
            'time',
        ]),

        blurImage() {
            return this.showPreview;
        }
    },

    methods: {
        ...mapActions([
            'initApp',
            'saveData',
        ]),

        userWin() {
            this.isWin = true;
            this.stopTimer = true;
        },

        displayImagePreview() {
            this.showPreview = !this.showPreview;
        },

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

<style>

</style>