<template>
    <div>
        <header>
            <h1>
                Time:
                <GameTimer
                        :time="time"
                        :stopTimer="stopTimer"
                        @timeChanged="setTime"
                ></GameTimer>
                <span v-show="isWin"> - You win!!!</span>
            </h1>

            <ZoomControls
                    :zoom="zoom"
                    :step="zoomStep"
                    @setZoom="setZoom"
            ></ZoomControls>

            <br><br>

            <button @click="saveData">Save</button> |

            <button @click="displayImagePreview">Preview</button>
            <ImagePreview :imgSrc="imgSrc" :show="showPreview"></ImagePreview>
        </header>

        <PuzzleMatrix
                :userId="userId"
                :isDataPreload="isDataPreload"
                :imgSrc="imgSrc"
                :width="width"
                :height="height"
                :tilesHorizontal="2"
                :tilesVertical="3"
                :offset="20"
                :zoom="zoom"
                :zoomStep="zoomStep"
                :blurImage="blurImage"
                @setZoom="setZoom"
                @setTime="setTime"
                @win="userWin"
        ></PuzzleMatrix>
    </div>
</template>

<script>
    import { groups, puzzles } from '../store/puzzles';
    import { exportPuzzles } from '../services/PuzzlesService';
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
          puzzles,
          groups,

          userId: null,
          isDataPreload: false,
          time: 0,
          stopTimer: false,
          isWin: false,
          showPreview: false,
          zoom: 1,
          zoomStep: 0.5,

          // horizontal image
          // width: 900,
          // height: 600,
          // imgSrc: 'https://img.the-village.com.ua/the-village.com.ua/post_image-image/I2ZplgsElJ6IkFrOxgjqsw.jpg',

          // vertical image
          width: 1200,
          height: 1600,
          imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg',

          // small image
          // width: 367,
          // height: 280,
          // imgSrc: 'https://www.shutterstock.com/image-vector/vector-antonyms-opposites-cartoon-characters-260nw-1246528834.jpg',
      }
    },

    computed: {
        blurImage() {
            return this.showPreview;
        }
    },

    methods: {
        userWin() {
            this.isWin = true;
            this.stopTimer = true;
        },

        displayImagePreview() {
            this.showPreview = !this.showPreview;
        },

        setTime(value) {
            this.time = value;
        },

        setZoom(value) {
            const MIN = 1;
            const MAX = 3;

            let newValue = Math.max(MIN, Math.min(MAX, value));

            // check changes
            if (this.zoom === newValue) return;

            this.zoom = newValue;
        },

        saveData() {
            let groups = this.groups.map(({id, x, y, tiles}) => {

                // save only id of the grouped tiles
                let tilesIdArray = tiles.map(tile => tile.id);

                return {
                    id, x, y,
                    tilesIdArray,
                }
            });

            let dataToSave = {
                time: this.time,
                groups,
            };

            exportPuzzles(/*this.userId,*/ dataToSave);
        },

    },

    beforeMount() {
      // here we can initialize the data from server on the first load

        this.isDataPreload = window.isDataPreload || false;
        this.userId = window.userId || 12;
    }
}
</script>

<style>

</style>