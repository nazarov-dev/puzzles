<template>
    <span>{{hours}} : {{twoDigits(minutes)}} : {{twoDigits(seconds)}}</span>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "GameTimer",

        props: [
            'stopTimer',
        ],

        data() {
            return {
                timer: null,
            }
        },

        computed: {
            ...mapState([
                'time',
            ]),

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
            ...mapActions([
                'setTime',
            ]),

            twoDigits(val) {
                return (100 + val).toString().slice(1);
            },

            start() {
                this.pause();

                this.timer = setInterval(() => {
                    let newTime = this.time + 1;

                    this.setTime(newTime);
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