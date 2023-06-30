<template>
    <div>
        <header>
            <h1>
                Time:
                <GameTimer
                        :prevTime="220"
                        :stopTimer="stopTimer"
                ></GameTimer>
                <span v-show="isWin"> - You win!!!</span>
            </h1>

            <button @click="displayImagePreview">Preview</button>
            <ImagePreview :imgSrc="imgSrc" :show="showPreview"></ImagePreview>

            <ZoomControls
                    :zoom="zoom"
                    :step="zoomStep"
                    @setZoom="setZoomFromControls"
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
    import EventBus from '../utils/EventBus';
    import PuzzleMatrix from './PuzzleMatrix';
    import GameTimer from "./GameTimer";
    import ImagePreview from "./ImagePreview";
    import ZoomControls from "./ZoomControls";

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

        setZoom(value) {
            const MIN = 1;
            const MAX = 3;

            let newValue = Math.max(MIN, Math.min(MAX, value));

            // check changes
            if (this.zoom === newValue) return;

            this.zoom = newValue;
        },

        setZoomFromControls(value) {
            const oldZoom = this.zoom;

            this.setZoom(value);

            EventBus.$emit('zoomChangedFromControls', oldZoom);
        },

    },
}
</script>

<style>
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  header {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      padding: 0 20px;
  }

  *,
  :before,
  :after {
    box-sizing: border-box;
  }
</style>