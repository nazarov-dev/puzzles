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

    *,
    :before,
    :after {
        box-sizing: border-box;
    }
</style>
