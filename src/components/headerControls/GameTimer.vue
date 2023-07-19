<template>
    <span>{{hours}} : {{twoDigits(minutes)}} : {{twoDigits(seconds)}}</span>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';

    export default {
        name: "GameTimer",

        data() {
            return {
                timer: null,
            }
        },

        computed: {
            ...mapState([
                'time',
                'isTimerRun',
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
            ...mapMutations([
                'setTime',
            ]),

            ...mapActions([
                // use runGameTimer/stopGameTimer to control the game timer
                'runGameTimer',
                'stopGameTimer',
            ]),

            twoDigits(val) {
                return (100 + val).toString().slice(1);
            },

            start() {
                this.timer = setInterval(() => {
                    let newTime = this.time + 1;

                    this.setTime(newTime);
                }, 1000);
            },

            pause() {
                clearInterval(this.timer);
            },

            timerRun(isTimerRun) {
                if (isTimerRun) {
                    this.start();
                }
                else {
                    this.pause();
                }
            },

        },

        watch: {
            isTimerRun(value) {
                this.timerRun(value);
            },
        },

        mounted() {
            this.timerRun(this.isTimerRun);
        }
    }
</script>

<style scoped>

</style>