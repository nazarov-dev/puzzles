<template>
    <v-stage ref="stage" :config="stageConfig">
        <v-layer>
            <v-path v-for="shape in shapes" :key="shape" ref="path"
                    :config="{
                    data: shape,
                    strokeWidth: 1,
                    stroke: 'black',
                    fillPatternImage: image,
                    }"
                    :x="0"
                    :y="0"
            ></v-path>
        </v-layer>
    </v-stage>
</template>

<script>
    import {Generate} from '../utils/generator';
    import LoadImage from '../utils/LoadImage';

    export default {
        name: "Shapes",

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

            for (let i=1; i < 10; i++) {
                let x = this.tileSize * i;
                this.shapes.push(generate.shape([x,20]));
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