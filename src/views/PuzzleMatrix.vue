<template>
    <v-stage v-if="image"
             ref="stage"
             :config="stageConfig"
             @dragstart="handleDragstart"
             @dragend="handleDragend"
    >
        <v-layer ref="layer">
            <TilesGroup v-for="group in orderedGroups"
                        :key="group.id"
                        :id="group.id"
                        :tiles="group.tiles"
                        :x="group.x"
                        :y="group.y"
                        :image="image"
                        :tileSize="tileSize"
                        @dragStart="groupDragStart"
                        @dragEnd="groupDragEnd"
            ></TilesGroup>
        </v-layer>
        <v-layer ref="dragLayer"></v-layer>
    </v-stage>
</template>

<script>
    import Vue from 'vue';
    import { Generate } from '../utils/Generator';
    import LoadImage from '../utils/LoadImage';
    import { twoDigitsStr } from '../utils/MyMath';
    import TilesGroup from "./TilesGroup";

    export default {
        name: "PuzzleMatrix",
        components: {
            TilesGroup
        },
        data: () => {
            return {
                stageConfig: {
                    width: 800,
                    height: 600,
                    offsetX: -0.5,
                    offsetY: -0.5,
                },

                puzzles: {},
                groups: [],
                draggingGroupId: null,
                groupsToMerge: [],

                tileSize: 40,
                image: null,
            }
        },

        computed: {
            stage() {
                return this.$refs.stage.getNode();
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
                // big groups where tiles count more than 5 are placed under the little groups

                let bigGroups = this.groups.filter(group => group.tiles.length >= 6);
                let smallGroups = this.groups.filter(group => group.tiles.length < 6);

                return [...bigGroups, ...smallGroups];
            },

        },

        methods: {
            createId(indexV, indexH) {
                // type: String
                return twoDigitsStr(indexV) + twoDigitsStr(indexH);
            },

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

            mergeGroups() {
                // merge draggingGroup and other linked groups to the first found group
                let draggingGroup = this.removeGroupFromGroups(this.draggingGroup);

                if (!this.groupsToMerge.length) return draggingGroup;

                // get first group for merge
                let firstGroup = this.groupsToMerge.shift();

                // remove this first group from groups
                let mergedGroup = this.removeGroupFromGroups(firstGroup);

                // merge other groups tiles to the first group
                this.groupsToMerge.forEach(group => {
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
                // moving to another layer will improve dragging performance
                const shape = evt.target;
                shape.moveTo(this.dragLayer);
                this.stage.draw();
            },

            handleDragend(evt) {
                const shape = evt.target;
                shape.moveTo(this.mainLayer);
                this.stage.draw();

                // set position of draggingGroup
                this.draggingGroup.x = shape.x();
                this.draggingGroup.y = shape.y();
            },

            groupDragStart(groupId) {
                // save an ID of the draggingGroup
                this.draggingGroupId = groupId;
            },

            groupDragEnd({x, y}) {
                // check distance to linked tile groups
                const offset = 10;

                this.groupsToMerge = this.groupsLinkedToDragged.filter(group => {
                    const dx = Math.abs(group.x - x);
                    const dy = Math.abs(group.y - y);

                    return dx <= offset && dy <= offset
                });

                let mergedGroups = this.mergeGroups();

                // change groups order by sets a dragged group to the top
                this.pushGroupToTop(mergedGroups);
            },

        },

        mounted() {
            const generate = new Generate({
                tileSize: this.tileSize,
                offset: this.offset,
            });

            const
                tilesH = 5,
                tilesV = 4;

            // generate puzzle tiles matrix (grid)
            for (let v = 0; v < tilesV; v++) {
                // this.puzzles.push([]);

                for (let h = 0; h < tilesH; h++) {
                    let x = this.tileSize * h;
                    let y = this.tileSize * v;

                    let prevV = v && this.puzzles[this.createId(v - 1, h)];
                    let top   = prevV.bottom || 'line';

                    let prevH = h && this.puzzles[this.createId(v, h - 1)];
                    let left  = prevH.right || 'line';

                    let right  = (h === tilesH - 1) ? 'line' : null;
                    let bottom = (v === tilesV - 1) ? 'line' : null;

                    let tile = generate.tile([x, y], {top, right, left, bottom});

                    // set tile id
                    let tileId = this.createId(v, h);
                    tile.id = tileId;

                    // make links to neighbors
                    let linked = {
                        top: null,
                        left: null,
                        right: null,
                        bottom: null,
                    };

                    if (prevV) {
                        linked.top = prevV.id;
                        Vue.set(prevV.linked, 'bottom', tileId);
                    }

                    if (prevH) {
                        linked.left = prevH.id;
                        Vue.set(prevH.linked, 'right', tileId);
                    }

                    tile.linked = linked;
                    // also set linked bottom (link top) and right (link left) for previous tiles

                    // create puzzle tile items
                    Vue.set(this.puzzles, tileId, tile);

                    // make a group for each of tiles
                    let group = {
                        id: tileId, // we can take the same tile id for the group
                        tiles: [tile],
                        // set random position
                        x: Math.floor(Math.random() * 200), // 200 - depend to window size AND start tile position
                        y: Math.floor(Math.random() * 100),
                    };

                    this.groups.push(group);
                }

            }


            const imgSrc = 'https://img.the-village.com.ua/the-village.com.ua/post_image-image/I2ZplgsElJ6IkFrOxgjqsw.jpg';

            LoadImage((img) => {
                this.image = img;
            }, imgSrc);

        }
    }
</script>

<style scoped>

</style>