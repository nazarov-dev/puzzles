<template>
    <div>
        <h1>
            Time:
            <GameTimer
                    :prevTime="'3595'"
                    :stopTimer="stopTimer"
            ></GameTimer>
            <span v-show="isWin"> - You win!!!</span>
        </h1>
        <PuzzleMatrix @win="userWin"></PuzzleMatrix>
    </div>
</template>

<script>
    // import { /*mapState, mapGetters,*/ mapActions } from 'vuex';
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

    beforeMount() {
      // init
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