<template>
    <v-group
            :config="{
                name: 'TilesGroup',
                id,
                x,
                y,
                draggable: true,
            }"
    >
        <PuzzleTile v-for="tile in tiles"
                    :key="tile.id"
                    :path="tile.path"
                    :image="image"
                    :imageScale="imageScale"
        ></PuzzleTile>
    </v-group>
</template>

<script>
    import PuzzleTile from "./PuzzleTile";

    export default {
        name: "TilesGroup",

        components: {
            PuzzleTile
        },

        props: [
            'id',
            'tiles',
            'x',
            'y',
            'image',
            'imageScale',
        ],

    }
</script>

<style scoped>

</style>