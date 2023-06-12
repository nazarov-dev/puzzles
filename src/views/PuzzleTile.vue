<template>
    <v-path
            ref="puzzleTile"
            :config="{
                x,
                y,
                data: path,
                strokeWidth: 1,
                stroke: 'black',
                fillPatternImage: image,
                fillPatternScaleX: imageScale,
                fillPatternScaleY: imageScale,
                fillPatternRepeat: 'no-repeat',
                shadowEnabled: false,
                shadowForStrokeEnabled: false,
            }"
    ></v-path>
</template>

<script>
    export default {
        name: "PuzzleTile",
        props: [
            'path',
            'image',
            'imageScale',
            'id',
            'x',
            'y',
            'linked',
        ],

        mounted() {
            this.$refs['puzzleTile'].getNode().cache();
        },

    }
</script>

<style scoped>

</style>