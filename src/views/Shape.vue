<template>
    <v-path
            ref="puzzle"
            :config="{
                // x: 40,
                // y: 80,
                data: shape.path,
                strokeWidth: 1,
                stroke: 'black',
                fillPatternImage: image,
                shadowEnabled: false,
                shadowForStrokeEnabled: false,
                draggable: true,
            }"
    ></v-path>
</template>

<script>
    export default {
        name: "Shape",
        props: [
            'shape',
            'image',
        ],

        mounted() {
            this.$refs.puzzle.getNode().cache();
        },

    }
</script>

<style scoped>

</style>