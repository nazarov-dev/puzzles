<template>
    <v-group
            :config="{
                x,
                y,
                draggable: true,
                name: 'TilesGroup',
            }"
            @dragstart="dragStart"
            @dragend="dragEnd"
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

        emits: [
            'dragStart',
            'dragEnd',
        ],

        methods: {
            dragStart() {
                this.$emit('dragStart', this.id);
            },

            dragEnd(evt) {
                const e = evt;

                // use $nextTick to do the Stage dragEnd event first
                this.$nextTick(() => {
                    this.$emit('dragEnd', {x: e.target.x(), y: e.target.y()});
                });
            },

        },

    }
</script>

<style scoped>

</style>