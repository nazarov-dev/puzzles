<template>
    <div id="puzzle-container" ref="canvasContainer" :class="{blur: blurImage}">
        <v-stage
                 ref="stage"
                 :config="stageConfig"
                 @dragstart="handleDragstart"
                 @dragend="handleDragend"
                 @touchmove="zoomTouch"
                 @touchend="zoomTouchEnd"
                 @wheel="zoomWheel"
        >
            <v-layer ref="layer">
                <TilesGroup v-for="group in orderedGroups"
                            :key="group.id"
                            :id="group.id"
                            :tiles="group.tiles"
                            :x="group.x"
                            :y="group.y"
                            :imageScale="puzzleSize.scale"
                ></TilesGroup>
            </v-layer>
            <v-layer ref="dragLayer"></v-layer>
        </v-stage>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    import { PuzzlesGenerator } from '../../utils/PuzzlesGenerator';
    import TilesGroup from "./TilesGroup";

    export default {
        name: "PuzzleMatrix",

        components: {
            TilesGroup
        },

        emits: [
            'win',
        ],

        props: [
            'zoomStep',
            'blurImage',
        ],

        data() {
            return {
                isWheeling: false,
                draggingGroupId: null,
                zoomTouchLastCenter: null,
                zoomTouchLastDist: 0,
            }
        },

        computed: {
            ...mapState([
                'isDataRestored',
                'restorePuzzleGroups',
                'puzzleTilesFlip',
                'groups',
                'puzzles',
                'puzzleWidth',
                'puzzleHeight',
                'tilesNumberHorizontal',
                'tilesNumberVertical',
                'canvasOffset',
                'zoom',
                'stageWidth',
                'stageHeight',
            ]),

            ...mapGetters([
                'getGroupById',
                'getGroupIndexById',
            ]),

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
                    width = this.puzzleWidth,
                    height = this.puzzleHeight;

                let scale = Math.min(
                    (this.stageWidth - this.canvasOffset*2) / width,
                    (this.stageHeight - this.canvasOffset*2) / height
                );

                if (scale < 1) {
                    width *= scale;
                    height *= scale;
                }

                return {
                    width,
                    height,
                    scale,
                }
            },

            tileWidth() {
                return this.puzzleSize.width / this.tilesNumberHorizontal;
            },

            tileHeight() {
                return this.puzzleSize.height / this.tilesNumberVertical;
            },

            connectionOffsetX() {
                return this.tileWidth / 8; // 50% of connector size; connector part have size width: (tileWidth / 4)
            },

            connectionOffsetY() {
                return this.tileHeight / 8; // 50% of connector size; connector part have size height: (tileHeight / 4)
            },

            canvasContainer() {
                return this.$refs.canvasContainer;
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
                // get the groups that are neighbors with the tiles of the dragged group

                const draggingGroup = this.draggingGroup;

                if (!draggingGroup) return [];

                const groupTilesId = draggingGroup.tiles.map(tile => tile.id);

                const linked = new Set();

                // ID list of linked tiles
                draggingGroup.tiles
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
                // place groups within the canvas stage

                let xMin = this.canvasOffset + this.connectionOffsetX;
                let xMax = this.stageWidth - this.tileWidth - (xMin * 2);

                let yMin = this.canvasOffset + this.connectionOffsetY;
                let yMax = this.stageHeight - this.tileHeight - (yMin * 2);

                return {xMin, xMax, yMin, yMax};
            },

        },

        methods: {
            ...mapMutations([
                'setPuzzles',
                'setPuzzleGroups',
                'setPuzzleTilesFlip',
            ]),

            ...mapActions([
                'removeGroupById',
                'pushGroupToTop',
                'setZoom',
                'updateCanvasSize',
            ]),

            mergeGroups(groupsToMerge) {
                // merge draggingGroup and other linked groups to the first found group
                const draggingGroup = this.draggingGroup;

                this.removeGroupById(draggingGroup.id);

                if (!groupsToMerge.length) return draggingGroup;

                // get first group for merge
                let mergedGroup = groupsToMerge.shift();

                // remove this first group from groups
                this.removeGroupById(mergedGroup.id);

                // merge other groups of tiles to the first group
                groupsToMerge.forEach(group => {
                    let removedGroup = group;
                    this.removeGroupById(group.id);

                    mergedGroup.tiles = [...mergedGroup.tiles, ...removedGroup.tiles];
                });

                mergedGroup.tiles = [...mergedGroup.tiles, ...draggingGroup.tiles];

                return mergedGroup;
            },

            checkLinkedTiles({x, y}) {
                // check distance to linked tile groups
                let groupsToMerge = this.groupsLinkedToDragged.filter(group => {
                    const dx = Math.abs(group.x - x);
                    const dy = Math.abs(group.y - y);

                    return dx <= this.connectionOffsetX && dy <= this.connectionOffsetY;
                });

                let mergedGroups = this.mergeGroups(groupsToMerge);

                // change groups order by sets a dragged group to the top
                this.pushGroupToTop(mergedGroups);
            },

            handleDragstart(evt) {
                const shape = evt.target;

                // don't do anything with Stage
                if (shape.name() !== 'TilesGroup') return true;

                const shapeId = shape.id();

                // check if anything is currently dragging
                if (this.draggingGroupId) {
                    shape.stopDrag();
                    return false;
                }

                // save an ID of the draggingGroup
                this.draggingGroupId = shapeId;

                // moving to another layer will improve dragging performance
                // place the drag group to the dragLayer
                shape.moveTo(this.dragLayer);
                this.stage.draw();
            },

            handleDragend(evt) {
                const shape = evt.target;

                // don't do anything with Stage
                if (shape.name() !== 'TilesGroup') return true;

                // set position of draggingGroup
                const x = shape.x();
                const y = shape.y();

                this.draggingGroup.x = x;
                this.draggingGroup.y = y;

                // back the drag group to the mainLayer
                shape.moveTo(this.mainLayer);
                
                // check if shape is near the linked puzzle tiles
                this.checkLinkedTiles({x, y});

                this.checkGameIsEnd();

                this.draggingGroupId = null;
            },

            getTouchDistance(p1, p2) {
                return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            },

            getTouchCenter(p1, p2) {
                return {
                    x: (p1.x + p2.x) / 2,
                    y: (p1.y + p2.y) / 2,
                };
            },

            zoomTouch(e) {
                const touch1 = e.evt.touches[0];
                const touch2 = e.evt.touches[1];

                if (touch1 && touch2) {
                    e.evt.preventDefault();

                    // if the stage was under Konva's drag&drop
                    // we need to stop it, and implement our own pan logic with two pointers
                    if (this.stage.isDragging()) {
                        this.stage.stopDrag();
                    }

                    // if any group was drag&drop we need to stop it
                    if (this.draggingGroupId) {
                        let draggingGroup = this.stage.findOne('#' + this.draggingGroupId);

                        draggingGroup.stopDrag();
                    }

                    let p1 = {
                        x: touch1.clientX,
                        y: touch1.clientY,
                    };
                    let p2 = {
                        x: touch2.clientX,
                        y: touch2.clientY,
                    };

                    if (!this.zoomTouchLastCenter) {
                        this.zoomTouchLastCenter = this.getTouchCenter(p1, p2);
                        return;
                    }

                    let newCenter = this.getTouchCenter(p1, p2);

                    let dist = this.getTouchDistance(p1, p2);

                    if (!this.zoomTouchLastDist) {
                        this.zoomTouchLastDist = dist;
                    }

                    // local coordinates of center point
                    const oldZoom = this.zoom;

                    let pointTo = {
                        x: (newCenter.x - this.stage.x()) / oldZoom,
                        y: (newCenter.y - this.stage.y()) / oldZoom,
                    };

                    let zoom = oldZoom * (dist / this.zoomTouchLastDist);

                    // calculate new position of the stage
                    let dx = newCenter.x - this.zoomTouchLastCenter.x;
                    let dy = newCenter.y - this.zoomTouchLastCenter.y;

                    let newPos = {
                        x: newCenter.x - pointTo.x * zoom + dx,
                        y: newCenter.y - pointTo.y * zoom + dy,
                    };

                    this.setZoom(zoom).then(() => {
                        if (zoom !== this.zoom) return;

                        this.setStagePosition(newPos);
                    });

                    this.zoomTouchLastDist = dist;
                    this.zoomTouchLastCenter = newCenter;

                    return false;
                }
            },

            zoomTouchEnd() {
                this.zoomTouchLastDist = 0;
                this.zoomTouchLastCenter = null;
            },

            zoomWheel(e) {
                if (this.draggingGroupId || this.stage.isDragging()) return false;

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

                // new position related to the pointer
                let newPos = {
                    x: pointer.x - mousePointTo.x * newZoom,
                    y: pointer.y - mousePointTo.y * newZoom,
                };

                this.setZoom(newZoom).then(() => {
                    if (newZoom !== this.zoom) return;

                    this.setStagePosition(newPos);
                });

                this.isWheeling = false;
            },

            setStagePosition(pos) {
                // limit new position related to the stage bounds
                let boundPos = this.dragStageBoundFunc(pos);

                this.stage.position(boundPos);
            },

            dragStageBoundFunc({x, y}) {
                const xMin = -this.stageWidth * (this.zoom - 1);
                const yMin = -this.stageHeight * (this.zoom - 1);

                let newX = Math.min(0, Math.max(x, xMin));
                let newY = Math.min(0, Math.max(y, yMin));

                return {x: newX, y: newY};
            },

            centerOnZoom(oldZoom, newZoom) {
                const halfWidth = this.stageWidth / 2;
                const halfHeight = this.stageHeight / 2;

                const x = halfWidth - (halfWidth - this.stage.x()) / oldZoom * newZoom;
                const y = halfHeight - (halfHeight - this.stage.y()) / oldZoom * newZoom;

                return {x, y};
            },

            checkGameIsEnd() {
                if (this.groups.length === 1) {
                    this.$emit('win');
                }
            },

            setGroupsDataAfterInitialization() {
                let puzzleGroups = [];

                // restore puzzleGroups or create new
                if(this.isDataRestored) {
                    puzzleGroups = this.restorePuzzleGroups.map(({id, x, y, tilesIdArray}) => {

                        // recover tiles by id from generated puzzles
                        let tiles = tilesIdArray.map(id => this.puzzles[id]);

                        return { id, x, y, tiles };
                    });
                }
                else {
                    for (const [tileId, tile] of Object.entries(this.puzzles)) {
                        const pos = this.makeRandomPosition(tile.offsetX, tile.offsetY);

                        let group = {
                            id: tileId, // we can take the same tile id for the group
                            tiles: [tile],
                            x: pos.x,
                            y: pos.y,
                        };

                        puzzleGroups.push(group);
                    }
                }

                this.setPuzzleGroups(puzzleGroups);
            },

            createPuzzles() {
                // generate puzzle tile shapes

                const puzzlesGenerator = new PuzzlesGenerator({
                    tilesH: +this.tilesNumberHorizontal,
                    tilesV: +this.tilesNumberVertical,
                    tileWidth: this.tileWidth,
                    tileHeight: this.tileHeight,
                    tilesFlip: this.puzzleTilesFlip,
                });

                let puzzles = puzzlesGenerator.createPuzzles();

                // save flip of the puzzle tiles
                const tilesFlip = puzzlesGenerator.getTilesFlip();
                this.setPuzzleTilesFlip(tilesFlip);

                // commit puzzles
                this.setPuzzles(puzzles);

                // set position for new created or restored groups
                this.setGroupsDataAfterInitialization();
            },

            makeRandomPosition(offsetX, offsetY) {
                // offsetX, offsetY: tile offset position in the group
                const l = this.groupPositionLimits;

                let x = Math.floor(l.xMin + (Math.random() * l.xMax) - offsetX);
                let y = Math.floor(l.yMin + (Math.random() * l.yMax) - offsetY);

                return {x, y};
            },


        },

        watch: {
            zoom(newValue, oldValue) {
                if (this.isWheeling) return;

                // zoom relative to the center when using the zoom buttons on the control panel
                const pos = this.centerOnZoom(oldValue, newValue);

                this.setStagePosition(pos);
            },
        },

        mounted() {
            this.updateCanvasSize(this.canvasContainer);

            this.createPuzzles();
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