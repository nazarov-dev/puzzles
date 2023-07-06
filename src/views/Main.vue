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

            <button @click="displayImagePreview">Preview</button>
            <ImagePreview :imgSrc="imgSrc" :show="showPreview"></ImagePreview>

            <ZoomControls
                    :zoom="zoom"
                    :step="zoomStep"
                    @setZoom="setZoom"
            ></ZoomControls>
        </header>

        <PuzzleMatrix
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
                @win="userWin"
        ></PuzzleMatrix>
    </div>
</template>

<script>
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

    data: () => {
      return {
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

    },
}
</script>

<style>

</style>