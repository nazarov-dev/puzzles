<template>
    <div id="puzzle-container" ref="canvasContainer" :class="{blur: blurImage}">
        <v-stage v-if="image"
                 ref="stage"
                 :config="stageConfig"
                 @dragstart="handleDragstart"
                 @dragend="handleDragend"
                 @wheel="zoomWheel"
        >
            <v-layer ref="layer">
                <TilesGroup v-for="group in orderedGroups"
                            :key="group.id"
                            :id="group.id"
                            :tiles="group.tiles"
                            :x="group.x"
                            :y="group.y"
                            :image="image"
                            :imageScale="imageScale"
                            @dragStart="groupDragStart"
                            @dragEnd="groupDragEnd"
                ></TilesGroup>
            </v-layer>
            <v-layer ref="dragLayer"></v-layer>
        </v-stage>
    </div>
</template>

<script>
    import { PuzzlesGenerator } from '../../utils/PuzzlesGenerator';
    import LoadImage from '../../utils/LoadImage';
    import TilesGroup from "./TilesGroup";

    export default {
        name: "PuzzleMatrix",
        components: {
            TilesGroup
        },

        props: [
            'tilesHorizontal',
            'tilesVertical',
            'width',
            'height',
            'offset',
            'imgSrc',
            'zoom',
            'zoomStep',
            'blurImage',
        ],

        emits: [
            'setZoom',
            'win',
        ],

        data: () => {
            return {
                stageWidth: 500,
                stageHeight: 500,
                isStageDragging: false,
                isWheeling: false,

                puzzles: {},
                groups: [],
                draggingGroupId: null,
                image: null,
            }
        },

        computed: {
            stageConfig() {
                return {
                    width: this.stageWidth,
                    height: this.stageHeight,
                    offsetX: -0.5,
                    offsetY: -0.5,
                    scaleX: this.zoom,
                    scaleY: this.zoom,
                    draggable: !!(this.zoom - 1),
                    dragBoundFunc: this.dragStageBoundFunc,
                }
            },

            puzzleSize() {
                // The size of the Puzzle takes into account the size of the Canvas

                let
                    width = this.width,
                    height = this.height;

                let scale = Math.min(
                    (this.stageWidth - this.offset*2) / width,
                    (this.stageHeight - this.offset*2) / height
                );

                if (scale < 1) {
                    width *= scale;
                    height *= scale;
                }

                return {
                    width,
                    height,
                }
            },

            imageScale() {
                // The size of the loaded Image takes into account the size of the Puzzle

                let scale = 1;

                if (this.image) {
                    scale = Math.min(
                        this.puzzleSize.width / this.image.width,
                        this.puzzleSize.height / this.image.height
                    );
                }

                return scale;
            },

            tileWidth() {
                return this.puzzleSize.width / this.tilesHorizontal;
            },

            tileHeight() {
                return this.puzzleSize.height / this.tilesVertical;
            },

            connectionOffsetX() {
                return this.tileWidth / 8; // 50% of connector size; connector part have size width: (tileWidth / 4)
            },

            connectionOffsetY() {
                return this.tileHeight / 8; // 50% of connector size; connector part have size height: (tileHeight / 4)
            },

            stage() {
                return this.$refs.stage?.getNode();
            },

            mainLayer() {
                return this.$refs.layer.getNode();
            },

            dragLayer() {
                return this.$refs.dragLayer.getNode();
            },

            draggingGroup() {
                return this.getGroupById(this.draggingGroupId);
            },

            groupsLinkedToDragged() {
                const group = this.draggingGroup;

                if (!group) return [];

                const groupTilesId = group.tiles.map(tile => tile.id);

                const linked = new Set();

                // ID list of linked tiles
                group.tiles
                    .forEach(tile => {
                        Object.values(tile.linked)
                            .forEach(val => linked.add(val));
                    });

                // delete the dragging group tiles from linked, and null
                groupTilesId.forEach(id => linked.delete(id));
                linked.delete(null);

                // get all groups that contain tiles linked to the dragging group
                const linkedGroups = this.groups.filter(group => {
                    return group.tiles.find(tile => linked.has(tile.id));
                });

                return linkedGroups;
            },

            orderedGroups() {
                // big groups where tiles count more than 6 are placed under the little groups

                let bigGroups = this.groups.filter(group => group.tiles.length >= 6);
                let smallGroups = this.groups.filter(group => group.tiles.length < 6);

                return [...bigGroups, ...smallGroups];
            },

            groupPositionLimits() {
                let xMin = this.offset + this.connectionOffsetX;
                let xMax = this.stageWidth - this.tileWidth - (xMin * 2);

                let yMin = this.offset + this.connectionOffsetY;
                let yMax = this.stageHeight - this.tileHeight - (yMin * 2);

                return {xMin, xMax, yMin, yMax};
            },

        },

        methods: {
            getGroupIndexById(id) {
                return this.groups.findIndex(group => group.id === id);
            },

            getGroupById(id) {
                return this.groups.find(group => group.id === id);
            },

            removeGroupFromGroups(group) {
                const index = this.getGroupIndexById(group.id);

                return this.groups.splice(index, 1)[0];
            },

            mergeGroups(groupsToMerge) {
                // merge draggingGroup and other linked groups to the first found group
                let draggingGroup = this.removeGroupFromGroups(this.draggingGroup);

                if (!groupsToMerge.length) return draggingGroup;

                // get first group for merge
                let firstGroup = groupsToMerge.shift();

                // remove this first group from groups
                let mergedGroup = this.removeGroupFromGroups(firstGroup);

                // merge other groups of tiles to the first group
                groupsToMerge.forEach(group => {
                    let removedGroup = this.removeGroupFromGroups(group);

                    mergedGroup.tiles = [...mergedGroup.tiles, ...removedGroup.tiles];
                });

                mergedGroup.tiles = [...mergedGroup.tiles, ...draggingGroup.tiles];

                return mergedGroup;
            },

            pushGroupToTop(group) {
                this.groups.push(group);
            },

            handleDragstart(evt) {
                this.isStageDragging = true;

                // moving to another layer will improve dragging performance
                const shape = evt.target;

                // don't do anything with Stage
                if (shape.name() !== 'TilesGroup') return true;

                // place the drag group to the dragLayer
                shape.moveTo(this.dragLayer);
                this.stage.draw();
            },

            handleDragend(evt) {
                this.isStageDragging = false;

                const shape = evt.target;

                // don't do anything with Stage
                if (shape.name() !== 'TilesGroup') return true;

                // set position of draggingGroup
                this.draggingGroup.x = shape.x();
                this.draggingGroup.y = shape.y();

                // back the drag group to the mainLayer
                shape.moveTo(this.mainLayer);
            },

            zoomWheel(e) {
                if (this.isStageDragging) return false;

                e.evt.preventDefault();

                this.isWheeling = true;

                const pointer = this.stage.getPointerPosition();

                let mousePointTo = {
                    x: (pointer.x - this.stage.x()) / this.zoom,
                    y: (pointer.y - this.stage.y()) / this.zoom,
                };

                // how to scale? Zoom in? Or zoom out?
                const direction = e.evt.deltaY > 0 ? 1 : -1;

                const newZoom = direction > 0 ? this.zoom - this.zoomStep : this.zoom + this.zoomStep;

                this.setZoom(newZoom);

                // $nextTick for set this.zoom with zoom limits
                this.$nextTick(() => {
                    if (newZoom !== this.zoom) return;

                    // new position related to the pointer
                    let newPos = {
                        x: pointer.x - mousePointTo.x * this.zoom,
                        y: pointer.y - mousePointTo.y * this.zoom,
                    };

                    this.setStagePosition(newPos);
                });

                this.isWheeling = false;
            },

            setStagePosition(pos) {
                // limit new position related to the stage bounds
                let boundPos = this.dragStageBoundFunc(pos);

                this.stage.position(boundPos);
            },

            centerOnZoom(oldZoom, newZoom) {
                const halfWidth = this.stageWidth / 2;
                const halfHeight = this.stageHeight / 2;

                const x = halfWidth - (halfWidth - this.stage.x()) / oldZoom * newZoom;
                const y = halfHeight - (halfHeight - this.stage.y()) / oldZoom * newZoom;

                return {x, y};
            },

            dragStageBoundFunc({x, y}) {
                const xMin = -this.stageWidth * (this.zoom - 1);
                const yMin = -this.stageHeight * (this.zoom - 1);

                let newX = Math.min(0, Math.max(x, xMin));
                let newY = Math.min(0, Math.max(y, yMin));

                return {x: newX, y: newY};
            },

            setZoom(value) {
                this.$emit('setZoom', value);
            },

            groupDragStart(groupId) {
                // save an ID of the draggingGroup
                this.draggingGroupId = groupId;
            },

            groupDragEnd({x, y}) {
                // check distance to linked tile groups
                let groupsToMerge = this.groupsLinkedToDragged.filter(group => {
                    const dx = Math.abs(group.x - x);
                    const dy = Math.abs(group.y - y);

                    return dx <= this.connectionOffsetX && dy <= this.connectionOffsetY;
                });

                let mergedGroups = this.mergeGroups(groupsToMerge);

                // change groups order by sets a dragged group to the top
                this.pushGroupToTop(mergedGroups);

                this.checkGameIsEnd();
            },

            checkGameIsEnd() {
                if (this.groups.length === 1) {
                    this.$emit('win');
                }
            },

            createPuzzles() {
                const generator = new PuzzlesGenerator({
                    tilesH: +this.tilesHorizontal,
                    tilesV: +this.tilesVertical,
                    tileWidth: this.tileWidth,
                    tileHeight: this.tileHeight,
                });

                this.puzzles = generator.createPuzzles();
            },

            makeRandomPosition(offsetX, offsetY) {
                // offsetX, offsetY: tile offset position in the group
                const l = this.groupPositionLimits;

                let x = Math.floor(l.xMin + (Math.random() * l.xMax) - offsetX);
                let y = Math.floor(l.yMin + (Math.random() * l.yMax) - offsetY);

                return {x, y};
            },

            initPuzzleGroups() {
                for (const [tileId, tile] of Object.entries(this.puzzles)) {
                    let pos = this.makeRandomPosition(tile.offsetX, tile.offsetY);

                    let group = {
                        id: tileId, // we can take the same tile id for the group
                        tiles: [tile],
                        x: pos.x,
                        y: pos.y,
                    };

                    this.groups.push(group);
                }
            },

            updateCanvasSize () {
                let $container = this.$refs.canvasContainer;

                this.stageWidth = $container.offsetWidth;
                this.stageHeight = $container.offsetHeight;
            },



        },

        watch: {
            zoom(newValue, oldValue) {
                if (this.isWheeling) return;

                const pos = this.centerOnZoom(oldValue, newValue);

                this.setStagePosition(pos);
            },
        },

        mounted() {
            LoadImage((img) => {
                this.updateCanvasSize();

                this.image = img;

                this.createPuzzles();

                // make a group for each of tiles
                this.initPuzzleGroups();
            }, this.imgSrc);

            window.addEventListener('resize', this.updateCanvasSize, false);
        },

        beforeUnmount() {
            window.removeEventListener('resize', this.updateCanvasSize, false);
        },

    }
</script>

<style scoped>
    #puzzle-container {
        max-width: 100%;
        /*width: 600px;*/
        /*height: 450px;*/
        /*margin: 20px auto;*/
        width: 100%;
        height: 100vh;
        margin: 0;
        background: #eee;
    }

    .blur {
        filter: blur(4px);
    }
</style>