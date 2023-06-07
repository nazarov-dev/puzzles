<template>
    <div>
        <button @click="displayImagePreview">Preview</button>
        <ImagePreview :imgSrc="imgSrc" :show="showPreview"></ImagePreview>

        <h1>
            Time:
            <GameTimer
                    :prevTime="220"
                    :stopTimer="stopTimer"
            ></GameTimer>
            <span v-show="isWin"> - You win!!!</span>
        </h1>
        <PuzzleMatrix
                :imgSrc="imgSrc"
                :imgWidth="200"
                :imgHeight="120"
                :tilesHorizontal="4"
                :tilesVertical="3"
                @win="userWin"
        ></PuzzleMatrix>
    </div>
</template>

<script>
    import PuzzleMatrix from './PuzzleMatrix';
    import GameTimer from "./GameTimer";
    import ImagePreview from "./ImagePreview";

export default {
  name: 'App',
  components: {
      ImagePreview,
      GameTimer,
      PuzzleMatrix,
  },

    data: () => {
      return {
          stopTimer: false,
          isWin: false,
          showPreview: false,
          imgSrc: 'https://img.the-village.com.ua/the-village.com.ua/post_image-image/I2ZplgsElJ6IkFrOxgjqsw.jpg',
      }
    },

    computed: {

    },

    methods: {
        userWin() {
            this.isWin = true;
            this.stopTimer = true;
        },

        displayImagePreview() {
            this.showPreview = !this.showPreview;
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

  *,
  :before,
  :after {
    box-sizing: border-box;
  }
</style>