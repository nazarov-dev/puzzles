<template>
    <Main></Main>
</template>

<script>
import Main from './views/Main'

export default {
  name: 'App',
  components: {
      Main
  }
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
