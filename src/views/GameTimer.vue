<template>
    <span>{{hours}} : {{minutes | twoDigits}} : {{seconds | twoDigits}}</span>
</template>

<script>
    export default {
        name: "GameTimer",

        props: [
            'prevTime',
            'stopTimer',
        ],

        data: () => {
            return {
                time: 0,
                timer: null,
            }
        },

        filters: {
            twoDigits(val) {
                return (100 + val).toString().slice(1);
            },

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
            start() {
                this.timer = setInterval(() => {
                    this.time++
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

        beforeMount() {
            if (this.prevTime) {
                this.time = this.prevTime;
            }

            this.start();
        }
    }
</script>

<style scoped>

</style>