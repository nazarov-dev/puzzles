<template>
    <div>
        <Shapes></Shapes>
    </div>
</template>

<script>
    // import { /*mapState, mapGetters,*/ mapActions } from 'vuex';
    import Shapes from './Shapes';

export default {
  name: 'App',
  components: {
      Shapes,
  },

    data: () => {
      return {

      }
    },

    computed: {

    },

    methods: {

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