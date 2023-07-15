import { createStore } from 'vuex';
import LoadImage from '../utils/LoadImage';
import { exportPuzzles } from '../services/PuzzlesService';

export const store = createStore({
    state () {
        return {
            isDataRestored: false,
            restorePuzzleGroups: [],
            urlSave: '',
            time: 0,
            zoom: 1,
            stageWidth: 500,
            stageHeight: 500,
            groups: [],
            puzzles: {},
            puzzleImageSrc: '',
            puzzleImage: null,
            puzzleWidth: 0,
            puzzleHeight: 0,
            tilesNumberHorizontal: 0,
            tilesNumberVertical: 0,
            canvasOffset: 0,
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

        setTime(state, time) {
            state.time = +time;
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
        initApp({commit, dispatch}, data) {
            const isDataRestored = !!data.importData;
            const urlSave = data.urlSave || '';
            const puzzleImageSrc = data.imageSrc || '';
            const puzzleWidth = +data.puzzleWidth || 0;
            const puzzleHeight = +data.puzzleHeight || 0;
            const tilesNumberHorizontal = +data.tilesNumberHorizontal || 0;
            const tilesNumberVertical = +data.tilesNumberVertical || 0;
            const canvasOffset = +data.canvasOffset || 0;

            // init data
            commit('setIsDataRestored', isDataRestored);
            commit('setUrlSave', urlSave);
            commit('setPuzzleImageSrc', puzzleImageSrc);
            commit('setPuzzleWidth', puzzleWidth);
            commit('setPuzzleHeight', puzzleHeight);
            commit('setPuzzleTilesNumberHorizontal', tilesNumberHorizontal);
            commit('setPuzzleTilesNumberVertical', tilesNumberVertical);
            commit('setCanvasOffset', canvasOffset);

            if (isDataRestored) {
                const restorePuzzleGroups = data.groups || [];
                const time = +data.time || 0;

                commit('setRestorePuzzleGroups', restorePuzzleGroups);
                dispatch('setTime', time);
            }

            // load puzzle image
            LoadImage(image => {
                commit('setPuzzleImage', image)
            }, puzzleImageSrc);
        },

        setTime({commit}, time) {
            commit('setTime', +time);
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
            };

            // send data to the server
            exportPuzzles(url, dataToSave);
        },

    }
});