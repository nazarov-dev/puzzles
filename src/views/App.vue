<template>
    <div>
        <h1 v-show="isWin">You win!!!</h1>
        <PuzzleMatrix @win="userWin"></PuzzleMatrix>
    </div>
</template>

<script>
    // import { /*mapState, mapGetters,*/ mapActions } from 'vuex';
    import PuzzleMatrix from './PuzzleMatrix';

export default {
  name: 'App',
  components: {
      PuzzleMatrix,
  },

    data: () => {
      return {
          isWin: false,
      }
    },

    computed: {

    },

    methods: {
        userWin() {
            this.isWin = true;
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