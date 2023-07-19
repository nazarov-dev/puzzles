import { createStore } from 'vuex';
import LoadImage from '../utils/LoadImage';
import { exportPuzzles } from '../services/PuzzlesService';

export const store = createStore({
    state () {
        return {
            isDataRestored: false,
            restorePuzzleGroups: [],
            puzzleTilesFlip: [],
            urlSave: '',
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

            zoom: 1,
            stageWidth: 500,
            stageHeight: 500,
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

        setZoom(state, zoom) {
            state.zoom = +zoom;
        },

        setUrlSave(state, url) {
            state.urlSave = url;
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

    },

    actions: {
        initApp({commit}, data) {
            const isDataRestored = !!data.importData;
            const urlSave = data.urlSave || '';
            const puzzleImageSrc = data.imageSrc || '';
            const tilesNumberHorizontal = +data.tilesNumberHorizontal || 0;
            const tilesNumberVertical = +data.tilesNumberVertical || 0;
            const canvasOffset = +data.canvasOffset || 0;

            // init data
            commit('setIsDataRestored', isDataRestored);
            commit('setUrlSave', urlSave);
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
            }, puzzleImageSrc);
        },

        runGameTimer({commit}) {
            commit('setTimerRun', true);
        },

        stopGameTimer({commit}) {
            commit('setTimerRun', false);
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

        saveData({state}) {
            const url = state.urlSave;

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

            // send data to the server
            exportPuzzles(url, dataToSave);
        },

        resetData() {
            localStorage.removeItem('puzzles');
        },

    }
});