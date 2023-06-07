<template>
    <div>
        <h1>
            Time:
            <GameTimer
                    :prevTime="220"
                    :stopTimer="stopTimer"
            ></GameTimer>
            <span v-show="isWin"> - You win!!!</span>
        </h1>
        <PuzzleMatrix
                :imgSrc="'https://img.the-village.com.ua/the-village.com.ua/post_image-image/I2ZplgsElJ6IkFrOxgjqsw.jpg'"
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

export default {
  name: 'App',
  components: {
      GameTimer,
      PuzzleMatrix,
  },

    data: () => {
      return {
          stopTimer: false,
          isWin: false,
      }
    },

    computed: {

    },

    methods: {
        userWin() {
            this.isWin = true;
            this.stopTimer = true;
        }
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