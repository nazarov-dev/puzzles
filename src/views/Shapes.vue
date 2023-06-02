<template>
    <v-stage ref="stage" :config="stageConfig">
        <v-layer>
            <v-group v-if="image">
                <v-group :config="{x: 20, y: 20}" v-for="(row, indexV) in shapes" :key="indexV">
                    <v-group v-for="(shape, indexH) in row" :key="indexH">
                        <Shape :shape="shape" :image="image"></Shape>
                    </v-group>
                </v-group>
            </v-group>
        </v-layer>
    </v-stage>
</template>

<script>
    import {Generate} from '../utils/Generator';
    import LoadImage from '../utils/LoadImage';
    import Shape from "./Shape";

    export default {
        name: "Shapes",
        components: {Shape},
        data: () => {
            return {
                stageConfig: {
                    width: 500,
                    height: 500,
                    offsetX: -0.5,
                    offsetY: -0.5,
                },

                shapes: [],
                tileSize: 40,
                offset: 15,
                // shape: '',
                image: null,
            }
        },

        computed: {

        },

        mounted() {
            const generate = new Generate({
                tileSize: this.tileSize,
                offset: this.offset,
            });

            for (let v = 0; v < 10; v++) {
                this.shapes.push([]);

                for (let h = 0; h < 10; h++) {
                    let x = this.tileSize * h;
                    let y = this.tileSize * v;

                    let prevV = v && this.shapes[v - 1][h];
                    let top   = prevV.bottom || 'line';

                    let prevH = h && this.shapes[v][h - 1];
                    let left  = prevH.right || 'line';

                    let right  = (h === 9) ? 'line' : null;
                    let bottom = (v === 9) ? 'line' : null;

                    this.shapes[v].push(generate.shape([x, y], {top, right, left, bottom}));
                }
            }

            // this.shape = {
            //     id: 11,
            //     row: 1,
            //     col: 1,
            //     sides: {
            //         left: '',
            //         right: '',
            //         top: '',
            //         bottom: '',
            //     },
            //     x: 0,
            //     y: 0,
            //     path: generate.shape([240,200]),
            // };

            const imgSrc = 'https://img.the-village.com.ua/the-village.com.ua/post_image-image/I2ZplgsElJ6IkFrOxgjqsw.jpg';

            LoadImage((img) => {
                this.image = img;
            }, imgSrc);

        }
    }
</script>

<style scoped>

</style>