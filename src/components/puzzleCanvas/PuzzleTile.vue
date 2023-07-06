<template>
    <v-path
            ref="puzzleTile"
            :config="{
                data: path,
                strokeWidth: 1,
                // strokeScaleEnabled: false, // not work with cache + drag&drop
                stroke: 'black',
                fillPatternImage: image,
                fillPatternScaleX: imageScale,
                fillPatternScaleY: imageScale,
                fillPatternRepeat: 'no-repeat',
                hitStrokeWidth: 0,
                perfectDrawEnabled: false,
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
        ],

        computed: {
            puzzleTile() {
                return this.$refs['puzzleTile'].getNode();
            },

        },

        mounted() {
            this.puzzleTile.cache({ pixelRatio: 3 });
        },

        beforeUnmount() {
            this.puzzleTile.clearCache();
        }

    }
</script>

<style scoped>

</style>