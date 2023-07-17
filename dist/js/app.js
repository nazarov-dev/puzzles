(function(){"use strict";var e={2121:function(e,t,i){var s=i(9242),o=i(3396);function r(e,t,i,s,r,n){const a=(0,o.up)("Main");return(0,o.wg)(),(0,o.j4)(a)}const n=(0,o._)("br",null,null,-1),a=(0,o._)("br",null,null,-1);function l(e,t,i,r,l,u){const h=(0,o.up)("GameTimer"),p=(0,o.up)("ZoomControls"),c=(0,o.up)("ImagePreview"),g=(0,o.up)("PuzzleMatrix");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("header",null,[(0,o._)("h1",null,[(0,o.Uk)(" Time: "),(0,o.Wm)(h,{stopTimer:l.stopTimer},null,8,["stopTimer"]),(0,o.wy)((0,o._)("span",null," - You win!!!",512),[[s.F8,l.isWin]])]),(0,o.Wm)(p,{step:l.zoomStep},null,8,["step"]),n,a,(0,o.wy)((0,o._)("button",{onClick:t[0]||(t[0]=(...t)=>e.saveData&&e.saveData(...t))},"Save",512),[[s.F8,!l.isWin]]),(0,o.Uk)(" | "),(0,o._)("button",{onClick:t[1]||(t[1]=(...e)=>u.reset&&u.reset(...e))},"Reset"),(0,o.Uk)(" | "),(0,o._)("button",{onClick:t[2]||(t[2]=(...e)=>u.displayImagePreview&&u.displayImagePreview(...e))},"Preview"),(0,o.Wm)(c,{show:l.showPreview},null,8,["show"])]),(0,o.Wm)(g,{zoomStep:l.zoomStep,blurImage:u.blurImage,onWin:u.userWin},null,8,["zoomStep","blurImage","onWin"])])}var u=i(7139),h=i(7840),p=i.n(h);function c(e={}){const t=p().decompress(p().decompressFromEncodedURIComponent(e));return JSON.parse(t)}async function g(e,t){const i=JSON.stringify(t);let s=p().compressToEncodedURIComponent(p().compress(i));localStorage.setItem("puzzles",s)}var m=i(2268);function z(e,t,i,s,r,n){const a=(0,o.up)("TilesGroup"),l=(0,o.up)("v-layer"),u=(0,o.up)("v-stage");return(0,o.wg)(),(0,o.iD)("div",{id:"puzzle-container",ref:"canvasContainer",class:(0,m.C_)({blur:i.blurImage})},[e.puzzleImage?((0,o.wg)(),(0,o.j4)(u,{key:0,ref:"stage",config:n.stageConfig,onDragstart:n.handleDragstart,onDragend:n.handleDragend,onTouchmove:n.zoomTouch,onTouchend:n.zoomTouchEnd,onWheel:n.zoomWheel},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{ref:"layer"},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.orderedGroups,(e=>((0,o.wg)(),(0,o.j4)(a,{key:e.id,id:e.id,tiles:e.tiles,x:e.x,y:e.y,imageScale:n.imageScale},null,8,["id","tiles","x","y","imageScale"])))),128))])),_:1},512),(0,o.Wm)(l,{ref:"dragLayer"},null,512)])),_:1},8,["config","onDragstart","onDragend","onTouchmove","onTouchend","onWheel"])):(0,o.kq)("",!0)],2)}i(7658);function d(e){return(100+e).toString().slice(1)}function f(e){return Math.floor(100*e)/100}function v({tilesH:e=1,tilesV:t=1,tileWidth:i=20,tileHeight:s=20,tilesFlip:o=[]}){const r=.1,n=.04;let a,l,u,h,p,c,g=1e4*Math.random();const m=o.length;let z=0,v=0,T=0,y=0,w=0,I=!1;const P=()=>{g++;let e=1e4*Math.sin(g);return e-Math.floor(e)},b=(e,t)=>{let i=P();return e+i*(t-e)},S=()=>P()>.5,x=e=>{const t=I?s:i,o=y+t*e;return f(o)},D=e=>{const t=I?i:s,o=w+t*e*(c?-1:1);return f(o)},G=()=>x(0),W=()=>x(.2),M=()=>x(.5+l+h),k=()=>x(.5-r+l),C=()=>x(.5-2*r+l-h),H=()=>x(.5+2*r+l-h),O=()=>x(.5+r+l),L=()=>x(.5+l+h),F=()=>x(.8),Z=()=>x(1),N=()=>D(0),_=()=>D(a),j=()=>D(-r+u),B=()=>D(r+u),E=()=>D(3*r+u),R=E,Y=B,V=j,X=()=>D(p),A=()=>D(0),U=()=>{let e=c;m?c=o[z++]:(c=+S(),o.push(c)),p=b(-n,n),a=c==e?-p:p,l=b(-n,n),u=b(-n,n),h=b(-n,n),p=b(-n,n)},$=(e,t)=>{y=e,w=t};this.getTilesFlip=()=>o,this.horizontal=()=>{I=!1,U();let e=[];return e[0]=[" C",W(),_(),M(),j(),k(),B()],e[1]=[" C",C(),E(),H(),R(),O(),Y()],e[2]=[" C",L(),V(),F(),X(),Z(),A()],e},this.vertical=()=>{I=!0,U();let e=[];return e[0]=[" C",_(),W(),j(),M(),B(),k()],e[1]=[" C",E(),C(),R(),H(),Y(),O()],e[2]=[" C",V(),L(),X(),F(),A(),Z()],e},this.makeTileId=(e,t)=>d(e)+d(t),this.createTile=([e,t],{top:o=null,right:r=null,left:n=null,bottom:a=null})=>{v=e,T=t;let l="";return $(v,T),l+=[" M",G(),N()],o="line"===o?[" L",v+i,T]:o,o=o||this.horizontal(),l+=o,$(T,v+i),r="line"===r?[" L",v+i,T+s]:r,r=r||this.vertical(),l+=r,$(v,T),l+=[" M",G(),N()],$(T,v),n="line"===n?[" L",v,T+s]:n,n=n||this.vertical(),l+=n,$(v,T+s),a="line"===a?[" L",v+i,T+s]:a,a=a||this.horizontal(),l+=a,{path:l,top:o,right:r,left:n,bottom:a,offsetX:v,offsetY:T}},this.createTileSides=({prevV:i,prevH:s,v:o,h:r})=>{const n=i.bottom||"line",a=s.right||"line",l=r===e-1?"line":null,u=o===t-1?"line":null;return{top:n,right:l,left:a,bottom:u}},this.createPuzzles=()=>{const o={};for(let r=0;r<t;r++)for(let t=0;t<e;t++){let e=i*t,n=s*r;const a=r&&o[this.makeTileId(r-1,t)],l=t&&o[this.makeTileId(r,t-1)];let u=this.createTileSides({prevV:a,prevH:l,v:r,h:t}),h=this.createTile([e,n],u),p=this.makeTileId(r,t);h.id=p;let c={top:null,left:null,right:null,bottom:null};a&&(c.top=a.id,a.linked["bottom"]=p),l&&(c.left=l.id,l.linked["right"]=p),h.linked=c,o[p]=h}return o}}function T(e,t,i,s,r,n){const a=(0,o.up)("PuzzleTile"),l=(0,o.up)("v-group");return(0,o.wg)(),(0,o.j4)(l,{config:{name:"TilesGroup",id:i.id,x:i.x,y:i.y,draggable:!0}},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.tiles,(e=>((0,o.wg)(),(0,o.j4)(a,{key:e.id,path:e.path,imageScale:i.imageScale},null,8,["path","imageScale"])))),128))])),_:1},8,["config"])}function y(e,t,i,s,r,n){const a=(0,o.up)("v-path");return(0,o.wg)(),(0,o.j4)(a,{ref:"puzzleTile",config:{data:i.path,strokeWidth:1,stroke:"black",fillPatternImage:e.puzzleImage,fillPatternScaleX:i.imageScale,fillPatternScaleY:i.imageScale,fillPatternRepeat:"no-repeat",hitStrokeWidth:0,perfectDrawEnabled:!1,shadowEnabled:!1,shadowForStrokeEnabled:!1}},null,8,["config"])}var w={name:"PuzzleTile",props:["path","imageScale"],computed:{...(0,u.rn)(["puzzleImage"]),puzzleTile(){return this.$refs["puzzleTile"].getNode()}},mounted(){this.puzzleTile.cache({pixelRatio:3})},beforeUnmount(){this.puzzleTile.clearCache()}},I=i(89);const P=(0,I.Z)(w,[["render",y]]);var b=P,S={name:"TilesGroup",components:{PuzzleTile:b},props:["id","tiles","x","y","imageScale"]};const x=(0,I.Z)(S,[["render",T]]);var D=x,G={name:"PuzzleMatrix",components:{TilesGroup:D},emits:["win"],props:["zoomStep","blurImage"],data(){return{isWheeling:!1,draggingGroupId:null,zoomTouchLastCenter:null,zoomTouchLastDist:0}},computed:{...(0,u.rn)(["isDataRestored","restorePuzzleGroups","puzzleTilesFlip","groups","puzzles","puzzleImage","puzzleWidth","puzzleHeight","tilesNumberHorizontal","tilesNumberVertical","canvasOffset","zoom","stageWidth","stageHeight"]),...(0,u.Se)(["getGroupById","getGroupIndexById"]),stageConfig(){return{width:this.stageWidth,height:this.stageHeight,offsetX:-.5,offsetY:-.5,scaleX:this.zoom,scaleY:this.zoom,draggable:!!(this.zoom-1),dragBoundFunc:this.dragStageBoundFunc}},puzzleSize(){let e=this.puzzleWidth,t=this.puzzleHeight,i=Math.min((this.stageWidth-2*this.canvasOffset)/e,(this.stageHeight-2*this.canvasOffset)/t);return i<1&&(e*=i,t*=i),{width:e,height:t}},imageScale(){let e=1;return this.puzzleImage&&(e=Math.min(this.puzzleSize.width/this.puzzleImage.width,this.puzzleSize.height/this.puzzleImage.height)),e},tileWidth(){return this.puzzleSize.width/this.tilesNumberHorizontal},tileHeight(){return this.puzzleSize.height/this.tilesNumberVertical},connectionOffsetX(){return this.tileWidth/8},connectionOffsetY(){return this.tileHeight/8},canvasContainer(){return this.$refs.canvasContainer},stage(){return this.$refs.stage?.getNode()},mainLayer(){return this.$refs.layer.getNode()},dragLayer(){return this.$refs.dragLayer.getNode()},draggingGroup(){return this.getGroupById(this.draggingGroupId)},groupsLinkedToDragged(){const e=this.draggingGroup;if(!e)return[];const t=e.tiles.map((e=>e.id)),i=new Set;e.tiles.forEach((e=>{Object.values(e.linked).forEach((e=>i.add(e)))})),t.forEach((e=>i.delete(e))),i.delete(null);const s=this.groups.filter((e=>e.tiles.find((e=>i.has(e.id)))));return s},orderedGroups(){let e=this.groups.filter((e=>e.tiles.length>=6)),t=this.groups.filter((e=>e.tiles.length<6));return[...e,...t]},groupPositionLimits(){let e=this.canvasOffset+this.connectionOffsetX,t=this.stageWidth-this.tileWidth-2*e,i=this.canvasOffset+this.connectionOffsetY,s=this.stageHeight-this.tileHeight-2*i;return{xMin:e,xMax:t,yMin:i,yMax:s}}},methods:{...(0,u.OI)(["setPuzzles","setPuzzleGroups","setPuzzleTilesFlip"]),...(0,u.nv)(["removeGroupById","pushGroupToTop","setZoom","updateCanvasSize"]),mergeGroups(e){const t=this.draggingGroup;if(this.removeGroupById(t.id),!e.length)return t;let i=e.shift();return this.removeGroupById(i.id),e.forEach((e=>{let t=e;this.removeGroupById(e.id),i.tiles=[...i.tiles,...t.tiles]})),i.tiles=[...i.tiles,...t.tiles],i},checkLinkedTiles({x:e,y:t}){let i=this.groupsLinkedToDragged.filter((i=>{const s=Math.abs(i.x-e),o=Math.abs(i.y-t);return s<=this.connectionOffsetX&&o<=this.connectionOffsetY})),s=this.mergeGroups(i);this.pushGroupToTop(s)},handleDragstart(e){const t=e.target;if("TilesGroup"!==t.name())return!0;const i=t.id();if(this.draggingGroupId)return t.stopDrag(),!1;this.draggingGroupId=i,t.moveTo(this.dragLayer),this.stage.draw()},handleDragend(e){const t=e.target;if("TilesGroup"!==t.name())return!0;const i=t.x(),s=t.y();this.draggingGroup.x=i,this.draggingGroup.y=s,t.moveTo(this.mainLayer),this.checkLinkedTiles({x:i,y:s}),this.checkGameIsEnd(),this.draggingGroupId=null},getTouchDistance(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},getTouchCenter(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}},zoomTouch(e){const t=e.evt.touches[0],i=e.evt.touches[1];if(t&&i){if(e.evt.preventDefault(),this.stage.isDragging()&&this.stage.stopDrag(),this.draggingGroupId){let e=this.stage.findOne("#"+this.draggingGroupId);e.stopDrag()}let s={x:t.clientX,y:t.clientY},o={x:i.clientX,y:i.clientY};if(!this.zoomTouchLastCenter)return void(this.zoomTouchLastCenter=this.getTouchCenter(s,o));let r=this.getTouchCenter(s,o),n=this.getTouchDistance(s,o);this.zoomTouchLastDist||(this.zoomTouchLastDist=n);const a=this.zoom;let l={x:(r.x-this.stage.x())/a,y:(r.y-this.stage.y())/a},u=a*(n/this.zoomTouchLastDist),h=r.x-this.zoomTouchLastCenter.x,p=r.y-this.zoomTouchLastCenter.y,c={x:r.x-l.x*u+h,y:r.y-l.y*u+p};return this.setZoom(u).then((()=>{u===this.zoom&&this.setStagePosition(c)})),this.zoomTouchLastDist=n,this.zoomTouchLastCenter=r,!1}},zoomTouchEnd(){this.zoomTouchLastDist=0,this.zoomTouchLastCenter=null},zoomWheel(e){if(this.draggingGroupId||this.stage.isDragging())return!1;e.evt.preventDefault(),this.isWheeling=!0;const t=this.stage.getPointerPosition();let i={x:(t.x-this.stage.x())/this.zoom,y:(t.y-this.stage.y())/this.zoom};const s=e.evt.deltaY>0?1:-1,o=s>0?this.zoom-this.zoomStep:this.zoom+this.zoomStep;let r={x:t.x-i.x*o,y:t.y-i.y*o};this.setZoom(o).then((()=>{o===this.zoom&&this.setStagePosition(r)})),this.isWheeling=!1},setStagePosition(e){let t=this.dragStageBoundFunc(e);this.stage.position(t)},dragStageBoundFunc({x:e,y:t}){const i=-this.stageWidth*(this.zoom-1),s=-this.stageHeight*(this.zoom-1);let o=Math.min(0,Math.max(e,i)),r=Math.min(0,Math.max(t,s));return{x:o,y:r}},centerOnZoom(e,t){const i=this.stageWidth/2,s=this.stageHeight/2,o=i-(i-this.stage.x())/e*t,r=s-(s-this.stage.y())/e*t;return{x:o,y:r}},checkGameIsEnd(){1===this.groups.length&&this.$emit("win")},setGroupsDataAfterInitialization(){let e=[];if(this.isDataRestored)e=this.restorePuzzleGroups.map((({id:e,x:t,y:i,tilesIdArray:s})=>{let o=s.map((e=>this.puzzles[e]));return{id:e,x:t,y:i,tiles:o}}));else for(const[t,i]of Object.entries(this.puzzles)){const s=this.makeRandomPosition(i.offsetX,i.offsetY);let o={id:t,tiles:[i],x:s.x,y:s.y};e.push(o)}this.setPuzzleGroups(e)},createPuzzles(){const e=new v({tilesH:+this.tilesNumberHorizontal,tilesV:+this.tilesNumberVertical,tileWidth:this.tileWidth,tileHeight:this.tileHeight,tilesFlip:this.puzzleTilesFlip});let t=e.createPuzzles();const i=e.getTilesFlip();this.setPuzzleTilesFlip(i),this.setPuzzles(t),this.setGroupsDataAfterInitialization()},makeRandomPosition(e,t){const i=this.groupPositionLimits;let s=Math.floor(i.xMin+Math.random()*i.xMax-e),o=Math.floor(i.yMin+Math.random()*i.yMax-t);return{x:s,y:o}}},watch:{zoom(e,t){if(this.isWheeling)return;const i=this.centerOnZoom(t,e);this.setStagePosition(i)}},mounted(){this.updateCanvasSize(this.canvasContainer),this.createPuzzles()}};const W=(0,I.Z)(G,[["render",z],["__scopeId","data-v-e3fb2b9a"]]);var M=W;function k(e,t,i,s,r,n){return(0,o.wg)(),(0,o.iD)("span",null,(0,m.zw)(n.hours)+" : "+(0,m.zw)(n.twoDigits(n.minutes))+" : "+(0,m.zw)(n.twoDigits(n.seconds)),1)}var C={name:"GameTimer",props:["stopTimer"],data(){return{timer:null}},computed:{...(0,u.rn)(["time"]),seconds(){return this.time%60},minutes(){return Math.floor(this.time%3600/60)},hours(){return Math.floor(this.time/3600)}},methods:{...(0,u.nv)(["setTime"]),twoDigits(e){return(100+e).toString().slice(1)},start(){this.pause(),this.timer=setInterval((()=>{let e=this.time+1;this.setTime(e)}),1e3)},pause(){clearInterval(this.timer)}},watch:{stopTimer(){this.stopTimer?this.pause():this.start()}},mounted(){this.start()}};const H=(0,I.Z)(C,[["render",k]]);var O=H;const L={class:"image-container"},F=["src"];function Z(e,t,i,r,n,a){return(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",L,[(0,o._)("img",{src:e.puzzleImageSrc,alt:""},null,8,F)],512)),[[s.F8,i.show]])}var N={name:"ImagePreview",props:["show"],computed:{...(0,u.rn)(["puzzleImageSrc"])}};const _=(0,I.Z)(N,[["render",Z],["__scopeId","data-v-e7e8bf5a"]]);var j=_;const B={class:""};function E(e,t,i,s,r,n){return(0,o.wg)(),(0,o.iD)("span",B,[(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>n.zoomDecrease&&n.zoomDecrease(...e))},"Zoom -"),(0,o.Uk)(" "+(0,m.zw)(n.roundedZoom)+" ",1),(0,o._)("button",{onClick:t[1]||(t[1]=(...e)=>n.zoomIncrease&&n.zoomIncrease(...e))},"Zoom +")])}var R={name:"ZoomControls",props:{step:{type:Number,default:1}},computed:{...(0,u.rn)(["zoom"]),roundedZoom(){return f(this.zoom)}},methods:{...(0,u.nv)(["setZoom"]),zoomDecrease(){let e=this.zoom-this.step;this.setZoom(e)},zoomIncrease(){let e=this.zoom+this.step;this.setZoom(e)}}};const Y=(0,I.Z)(R,[["render",E]]);var V=Y,X={name:"App",components:{ZoomControls:V,ImagePreview:j,GameTimer:O,PuzzleMatrix:M},data(){return{isWin:!1,stopTimer:!1,showPreview:!1,zoomStep:.5}},computed:{...(0,u.rn)(["puzzles","puzzleImage","zoom","time"]),blurImage(){return this.showPreview}},methods:{...(0,u.nv)(["initApp","saveData","resetData"]),userWin(){this.isWin=!0,this.stopTimer=!0},displayImagePreview(){this.showPreview=!this.showPreview},reset(){this.resetData(),location.reload()}},beforeMount(){let e=window.puzzles.importData;if(e){let{time:t,groups:i,tilesFlip:s}=c(e);window.puzzles.time=t,window.puzzles.groups=i,window.puzzles.tilesFlip=s}this.initApp(window.puzzles)}};const A=(0,I.Z)(X,[["render",l]]);var U=A,$={name:"App",components:{Main:U}};const q=(0,I.Z)($,[["render",r]]);var J=q,K=(e,t)=>{if(!t.length)return;let i=new Image;i.onload=i=>{let s=i.composedPath()[0];e(s,t)},i.src=t};const Q=(0,u.MT)({state(){return{isDataRestored:!1,restorePuzzleGroups:[],puzzleTilesFlip:[],urlSave:"",time:0,zoom:1,stageWidth:500,stageHeight:500,groups:[],puzzles:{},puzzleImageSrc:"",puzzleImage:null,puzzleWidth:0,puzzleHeight:0,tilesNumberHorizontal:0,tilesNumberVertical:0,canvasOffset:0}},getters:{getGroupById:e=>t=>e.groups.find((e=>e.id===t)),getGroupIndexById:e=>t=>e.groups.findIndex((e=>e.id===t))},mutations:{setIsDataRestored(e,t){e.isDataRestored=t},setRestorePuzzleGroups(e,t){e.restorePuzzleGroups=t},setPuzzleTilesFlip(e,t){e.puzzleTilesFlip=t},setTime(e,t){e.time=+t},setZoom(e,t){e.zoom=+t},setUrlSave(e,t){e.urlSave=t},setPuzzles(e,t){e.puzzles=t},setPuzzleGroups(e,t){e.groups=t},setPuzzleImageSrc(e,t){e.puzzleImageSrc=t},setPuzzleImage(e,t){e.puzzleImage=t},setPuzzleWidth(e,t){e.puzzleWidth=+t},setPuzzleHeight(e,t){e.puzzleHeight=+t},setPuzzleTilesNumberHorizontal(e,t){e.tilesNumberHorizontal=+t},setPuzzleTilesNumberVertical(e,t){e.tilesNumberVertical=+t},setCanvasOffset(e,t){e.canvasOffset=+t},addPuzzlesGroup(e,t){e.groups.push(t)},removePuzzlesGroup(e,t){e.groups.splice(t,1)},setStageWidth(e,t){e.stageWidth=+t},setStageHeight(e,t){e.stageHeight=+t}},actions:{initApp({commit:e,dispatch:t},i){const s=!!i.importData,o=i.urlSave||"",r=i.imageSrc||"",n=+i.puzzleWidth||0,a=+i.puzzleHeight||0,l=+i.tilesNumberHorizontal||0,u=+i.tilesNumberVertical||0,h=+i.canvasOffset||0;if(e("setIsDataRestored",s),e("setUrlSave",o),e("setPuzzleImageSrc",r),e("setPuzzleWidth",n),e("setPuzzleHeight",a),e("setPuzzleTilesNumberHorizontal",l),e("setPuzzleTilesNumberVertical",u),e("setCanvasOffset",h),s){const s=i.groups||[],o=i.tilesFlip||[],r=+i.time||0;e("setRestorePuzzleGroups",s),e("setPuzzleTilesFlip",o),t("setTime",r)}K((t=>{e("setPuzzleImage",t)}),r)},setTime({commit:e},t){e("setTime",+t)},setZoom({commit:e},t){const i=1,s=3;let o=Math.max(i,Math.min(s,+t));e("setZoom",o)},removeGroupById({getters:e,commit:t},i){const s=e.getGroupIndexById(i);t("removePuzzlesGroup",s)},pushGroupToTop({commit:e},t){e("addPuzzlesGroup",t)},updateCanvasSize({commit:e},t){e("setStageWidth",t.offsetWidth),e("setStageHeight",t.offsetHeight)},saveData({state:e}){const t=e.urlSave;let i=e.groups.map((({id:e,x:t,y:i,tiles:s})=>{let o=s.map((e=>e.id));return{id:e,x:t,y:i,tilesIdArray:o}})),s={time:e.time,groups:i,tilesFlip:e.puzzleTilesFlip};g(t,s)},resetData(){localStorage.removeItem("puzzles")}}});var ee=i(9398),te=i.n(ee),ie=i(3571),se=i.n(ie);te().hitOnDragEnabled=!0;const oe=(0,s.ri)(J);oe.use(Q),oe.use(se()),oe.mount("#app")}},t={};function i(s){var o=t[s];if(void 0!==o)return o.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,i),r.exports}i.m=e,function(){var e=[];i.O=function(t,s,o,r){if(!s){var n=1/0;for(h=0;h<e.length;h++){s=e[h][0],o=e[h][1],r=e[h][2];for(var a=!0,l=0;l<s.length;l++)(!1&r||n>=r)&&Object.keys(i.O).every((function(e){return i.O[e](s[l])}))?s.splice(l--,1):(a=!1,r<n&&(n=r));if(a){e.splice(h--,1);var u=o();void 0!==u&&(t=u)}}return t}r=r||0;for(var h=e.length;h>0&&e[h-1][2]>r;h--)e[h]=e[h-1];e[h]=[s,o,r]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,s){var o,r,n=s[0],a=s[1],l=s[2],u=0;if(n.some((function(t){return 0!==e[t]}))){for(o in a)i.o(a,o)&&(i.m[o]=a[o]);if(l)var h=l(i)}for(t&&t(s);u<n.length;u++)r=n[u],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(h)},s=self["webpackChunkpuzzles"]=self["webpackChunkpuzzles"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(2121)}));s=i.O(s)})();
//# sourceMappingURL=app.js.map