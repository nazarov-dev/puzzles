<template>
    <span>{{hours}} : {{twoDigits(minutes)}} : {{twoDigits(seconds)}}</span>
</template>

<script>
    export default {
        name: "GameTimer",

        props: [
            'time',
            'stopTimer',
        ],

        data() {
            return {
                timer: null,
            }
        },

        computed: {
            seconds() {
                return this.time % 60;
            },

            minutes() {
                return Math.floor((this.time % 3600) / 60);
            },

            hours() {
                return Math.floor(this.time / 3600);
            },

        },

        methods: {
            twoDigits(val) {
                return (100 + val).toString().slice(1);
            },

            start() {
                this.pause();

                this.timer = setInterval(() => {
                    let newTime = this.time + 1;

                    this.$emit('timeChanged', newTime);
                }, 1000);
            },

            pause() {
                clearInterval(this.timer);
            },

        },

        watch: {
            stopTimer() {
                if (this.stopTimer) {
                    this.pause();
                }
                else {
                    this.start();
                }
            }
        },

        mounted() {
            this.start();
        }
    }
</script>

<style scoped>

</style>