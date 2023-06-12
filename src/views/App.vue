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
                :width="width"
                :height="height"
                :tilesHorizontal="2"
                :tilesVertical="3"
                :offset="20"
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