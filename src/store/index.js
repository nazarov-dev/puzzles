import { createStore } from 'vuex';
import LoadImage from '../utils/LoadImage';
import { exportPuzzles, savePuzzlesToLocalStorage } from '../services/PuzzlesService';

export const store = createStore({
    state () {
        return {
            isDataRestored: false,
            restorePuzzleGroups: [],
            puzzleTilesFlip: [],
            saveToLocalStorageInterval: 30000,
            onValidFunc: null,
            tilesNumberHorizontal: 0,
            tilesNumberVertical: 0,
            canvasOffset: 0,

            groups: [],
            puzzles: {},
            puzzleImageSrc: '',
            puzzleImage: null,
            puzzleWidth: 0,
            puzzleHeight: 0,

            time: 0,
            isTimerRun: false,

            isUserWin: false,

            zoom: 1,
            stageWidth: 500,
            stageHeight: 500,

            canLockOrientation: true,
        }
    },

    getters: {
        getGroupById: (state) => (id) => {
            return state.groups.find(group => group.id === id);
        },

        getGroupIndexById: (state) => (id) => {
            return state.groups.findIndex(group => group.id === id);
        },
    },

    mutations: {
        setIsDataRestored(state, isDataRestored) {
            state.isDataRestored = isDataRestored;
        },

        setRestorePuzzleGroups(state, groups) {
            state.restorePuzzleGroups = groups;
        },

        setPuzzleTilesFlip(state, tilesFlip) {
            state.puzzleTilesFlip = tilesFlip;
        },

        setTime(state, time) {
            state.time = +time;
        },

        setTimerRun(state, isRun) {
            state.isTimerRun = isRun;
        },

        setUserWin(state, isWin) {
            state.isUserWin = isWin;
        },

        setonValidFunc(state, onValidFunc) {
            state.onValidFunc = onValidFunc;
        },

        setZoom(state, zoom) {
            state.zoom = +zoom;
        },

        setSaveToLocalStorageInterval(state, intervalInSeconds) {
            state.saveToLocalStorageInterval = intervalInSeconds;
        },

        setPuzzles(state, puzzles) {
            state.puzzles = puzzles;
        },

        setPuzzleGroups(state, groups) {
            state.groups = groups;
        },

        setPuzzleImageSrc(state, src) {
            state.puzzleImageSrc = src;
        },

        setPuzzleImage(state, image) {
            state.puzzleImage = image;
        },

        setPuzzleWidth(state, width) {
            state.puzzleWidth = +width;
        },

        setPuzzleHeight(state, height) {
            state.puzzleHeight = +height;
        },

        setPuzzleTilesNumberHorizontal(state, number) {
            state.tilesNumberHorizontal = +number;
        },

        setPuzzleTilesNumberVertical(state, number) {
            state.tilesNumberVertical = +number;
        },

        setCanvasOffset(state, offset) {
            state.canvasOffset = +offset;
        },

        addPuzzlesGroup(state, group) {
            state.groups.push(group);
        },

        removePuzzlesGroup(state, index) {
            state.groups.splice(index, 1);
        },

        setStageWidth(state, width) {
            state.stageWidth = +width;
        },

        setStageHeight(state, height) {
            state.stageHeight = +height;
        },

        disableLockOrientation(state) {
            state.canLockOrientation = false;
        },

    },

    actions: {
        initApp({commit, dispatch}, data) {
            const isDataRestored = !!data.importData;
            const saveToLocalStorageInterval = +data.saveToLocalStorageInterval || 0;
            const onValidFunc = data.onValid;
            const puzzleImageSrc = data.imageSrc || '';
            const tilesNumberHorizontal = +data.tilesNumberHorizontal || 0;
            const tilesNumberVertical = +data.tilesNumberVertical || 0;
            const canvasOffset = +data.canvasOffset || 0;

            dispatch('initPreventPageReload');

            // init data
            commit('setIsDataRestored', isDataRestored);
            commit('setSaveToLocalStorageInterval', saveToLocalStorageInterval);
            commit('setonValidFunc', onValidFunc);
            commit('setPuzzleImageSrc', puzzleImageSrc);
            commit('setPuzzleTilesNumberHorizontal', tilesNumberHorizontal);
            commit('setPuzzleTilesNumberVertical', tilesNumberVertical);
            commit('setCanvasOffset', canvasOffset);

            if (isDataRestored) {
                const restorePuzzleGroups = data.groups || [];
                const puzzleTilesFlip = data.tilesFlip || [];
                const time = +data.time || 0;

                commit('setRestorePuzzleGroups', restorePuzzleGroups);
                commit('setPuzzleTilesFlip', puzzleTilesFlip);
                commit('setTime', time);
            }

            // load puzzle image
            LoadImage(image => {
                if (!image) throw new Error(`Image file not found: ${puzzleImageSrc}`);

                const puzzleWidth = image.naturalWidth;
                const puzzleHeight = image.naturalHeight;

                commit('setPuzzleWidth', puzzleWidth);
                commit('setPuzzleHeight', puzzleHeight);
                commit('setPuzzleImage', image);

                dispatch('initAutoSaving');
            }, puzzleImageSrc);

            dispatch('initLockMobileDeviceOrientation');
        },

        runGameTimer({commit}) {
            commit('setTimerRun', true);
        },

        stopGameTimer({commit}) {
            commit('setTimerRun', false);
        },

        userWin({state, commit, dispatch}) {
            dispatch('stopGameTimer');
            dispatch('resetLocalStorageData');
            commit('setUserWin', true);

            if (state.onValidFunc) {
                let data = {
                    time: state.time,
                };

                state.onValidFunc(data);
            }
        },

        setZoom({commit}, zoom) {
            const MIN = 1;
            const MAX = 3;

            let newZoom = Math.max(MIN, Math.min(MAX, +zoom));

            commit('setZoom', newZoom);
        },

        removeGroupById({getters, commit}, groupId) {
            const index = getters.getGroupIndexById(groupId);

            commit('removePuzzlesGroup', index);
        },

        pushGroupToTop({commit}, group) {
            commit('addPuzzlesGroup', group);
        },

        updateCanvasSize({commit}, canvasContainer) {
            commit('setStageWidth', canvasContainer.offsetWidth);
            commit('setStageHeight', canvasContainer.offsetHeight);
        },

        prepareDataToSave({state}) {
            return new Promise((resolve) => {
                let groups = state.groups.map(({id, x, y, tiles}) => {

                    // save only id of the grouped tiles
                    let tilesIdArray = tiles.map(tile => tile.id);

                    return {
                        id, x, y,
                        tilesIdArray,
                    }
                });

                let dataToSave = {
                    time: state.time,
                    groups,
                    tilesFlip: state.puzzleTilesFlip
                };

                resolve(dataToSave);
            });
        },

        initAutoSaving({state, dispatch}) {
            if (!state.saveToLocalStorageInterval) return;

            let saveFn = function () {
                setTimeout(async () => {
                    // stop auto save if game is ended
                    if(state.isUserWin) return;

                    let dataToSave = await dispatch('prepareDataToSave');

                    // save to localStorage
                    await savePuzzlesToLocalStorage(dataToSave);

                    // send to the server
                    await dispatch('sendDataToServer', dataToSave);

                    saveFn();
                }, state.saveToLocalStorageInterval * 1000);
            };

            saveFn();
        },

        async saveData({dispatch}) {
            // use to manual save data to the server

            let dataToSave = await dispatch('prepareDataToSave');

            // send data to the server
            dispatch('sendDataToServer', dataToSave);
        },

        sendDataToServer(state, data) {
            exportPuzzles(data);
        },

        resetLocalStorageData() {
            localStorage.removeItem('puzzles');
        },

        initPreventPageReload() {
            if (window.innerWidth > 800) return;

            const onConfirmRefresh = function (event) {
                // check if the user refreshed the page with the "Reset" button from the app control panel
                if (window.handleReset) return true;

                event.preventDefault();
                return event.returnValue = "Are you sure you want to leave the page?";
            };

            window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });
        },

        fullScreen({dispatch}) {

            if (!document.fullscreenElement) {

                document.getElementById('puzzle-main').requestFullscreen();

                dispatch('lockMobileDeviceFullScreenOrientation', true);

            } else if (document.exitFullscreen) {

                document.exitFullscreen();

                dispatch('lockMobileDeviceFullScreenOrientation', false);
            }
        },

        lockMobileDeviceFullScreenOrientation({state, commit }, lockState) {
            // will work only in full-screen mode

            if (!state.canLockOrientation) return;

            if (lockState) {
                screen.orientation.lock("any")
                    .catch(error => {
                        commit('disableLockOrientation');
                        console.warn(error);
                    })
            }
            else {
                screen.orientation.unlock();
            }
        },

        initLockMobileDeviceOrientation() {
            // screen.orientation.addEventListener("change", (event) => {
            //     // const type = event.target.type;
            //     const angle = event.target.angle;
            //     // console.log(`ScreenOrientation change: ${type}, ${angle} degrees.`);
            // });



            // $(window).bind('orientationchange resize', function(event){
            //     console.log(this);
            //
            //     if (event.orientation) {
            //         if (event.orientation == 'landscape') {
            //             if (window.rotation == 90) {
            //                 rotate(this, -90);
            //             } else {
            //                 rotate(this, 90);
            //             }
            //         }
            //     }
            // });

            // function rotate(el, degs) {
            //     let transform = 'rotate('+degs+'deg)';
            //
            //     console.log(el, transform)
            //
            //     // $(el).css(transform);
            // }
        },

    }
});