(function(){"use strict";var e={3869:function(e,t,i){var o=i(9242),s=i(3396);function n(e,t,i,o,n,r){const a=(0,s.up)("Main");return(0,s.wg)(),(0,s.j4)(a)}var r=i(7139);const a={id:"puzzle-main"},l={key:0,class:"controls"};function u(e,t,i,n,u,h){const c=(0,s.up)("GameTimer"),m=(0,s.up)("ZoomControls"),g=(0,s.up)("ImagePreview"),d=(0,s.up)("Puzzles"),p=(0,s.up)("LoadSpinner");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("header",null,[(0,s._)("h2",null,[(0,s.Uk)(" Time: "),(0,s.Wm)(c),(0,s.wy)((0,s._)("span",null," - You win!!!",512),[[o.F8,e.isUserWin]])]),e.puzzleImage?((0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("p",null,[(0,s.Wm)(m,{step:u.zoomStep},null,8,["step"]),(0,s.Uk)(" | "),(0,s._)("button",{onClick:t[0]||(t[0]=(...t)=>e.fullScreen&&e.fullScreen(...t))},"FullScreen"),(0,s.Uk)(" | ")]),(0,s._)("p",null,[(0,s.wy)((0,s._)("button",{onClick:t[1]||(t[1]=(...t)=>e.saveData&&e.saveData(...t))},"Save",512),[[o.F8,!e.isUserWin]]),(0,s.Uk)(" | "),(0,s._)("button",{onClick:t[2]||(t[2]=(...e)=>h.reset&&h.reset(...e))},"Reset"),(0,s.Uk)(" | "),(0,s._)("button",{onClick:t[3]||(t[3]=(...e)=>h.displayImagePreview&&h.displayImagePreview(...e))},"Preview"),(0,s.Wm)(g,{show:u.showPreview},null,8,["show"])])])):(0,s.kq)("",!0)]),(0,s._)("div",{id:"puzzle-container",ref:"canvasContainer",class:(0,r.C_)({blur:h.blurImage})},[e.puzzleImage?((0,s.wg)(),(0,s.j4)(d,{key:0,zoomStep:u.zoomStep,blurImage:h.blurImage,onWin:e.userWin},null,8,["zoomStep","blurImage","onWin"])):((0,s.wg)(),(0,s.j4)(p,{key:1}))],2)])}var h=i(65);function c(e,t,i,o,n,r){const a=(0,s.up)("TilesGroup"),l=(0,s.up)("v-layer"),u=(0,s.up)("v-stage");return(0,s.wg)(),(0,s.j4)(u,{ref:"stage",config:r.stageConfig,onDragstart:r.handleDragstart,onDragend:r.handleDragend,onTouchmove:r.zoomTouch,onTouchend:r.zoomTouchEnd,onWheel:r.zoomWheel},{default:(0,s.w5)((()=>[(0,s.Wm)(l,{ref:"layer"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.orderedGroups,(e=>((0,s.wg)(),(0,s.j4)(a,{key:e.id,id:e.id,tiles:e.tiles,x:e.x,y:e.y,imageScale:r.puzzleSize.scale},null,8,["id","tiles","x","y","imageScale"])))),128))])),_:1},512),(0,s.Wm)(l,{ref:"dragLayer"},null,512)])),_:1},8,["config","onDragstart","onDragend","onTouchmove","onTouchend","onWheel"])}i(7658);function m(e){return(100+e).toString().slice(1)}function g(e){return Math.floor(100*e)/100}function d({tilesH:e=1,tilesV:t=1,tileWidth:i=20,tileHeight:o=20,tilesFlip:s=[]}){const n=.1,r=.04;let a,l,u,h,c,d,p=1e4*Math.random();const z=s.length;let f=0,v=0,T=0,y=0,w=0,S=!1;const I=()=>{p++;let e=1e4*Math.sin(p);return e-Math.floor(e)},b=(e,t)=>{let i=I();return e+i*(t-e)},P=()=>I()>.5,D=e=>{const t=S?o:i,s=y+t*e;return g(s)},x=e=>{const t=S?i:o,s=w+t*e*(d?-1:1);return g(s)},G=()=>D(0),k=()=>D(.2),W=()=>D(.5+l+h),L=()=>D(.5-n+l),O=()=>D(.5-2*n+l-h),M=()=>D(.5+2*n+l-h),C=()=>D(.5+n+l),H=()=>D(.5+l+h),F=()=>D(.8),R=()=>D(1),_=()=>x(0),Z=()=>x(a),N=()=>x(-n+u),E=()=>x(n+u),V=()=>x(3*n+u),j=V,U=E,B=N,Y=()=>x(c),A=()=>x(0),X=()=>{let e=d;z?d=s[f++]:(d=+P(),s.push(d)),c=b(-r,r),a=d==e?-c:c,l=b(-r,r),u=b(-r,r),h=b(-r,r),c=b(-r,r)},$=(e,t)=>{y=e,w=t};this.getTilesFlip=()=>s,this.horizontal=()=>{S=!1,X();let e=[];return e[0]=[" C",k(),Z(),W(),N(),L(),E()],e[1]=[" C",O(),V(),M(),j(),C(),U()],e[2]=[" C",H(),B(),F(),Y(),R(),A()],e},this.vertical=()=>{S=!0,X();let e=[];return e[0]=[" C",Z(),k(),N(),W(),E(),L()],e[1]=[" C",V(),O(),j(),M(),U(),C()],e[2]=[" C",B(),H(),Y(),F(),A(),R()],e},this.makeTileId=(e,t)=>m(e)+m(t),this.createTile=([e,t],{top:s=null,right:n=null,left:r=null,bottom:a=null})=>{v=e,T=t;let l="";return $(v,T),l+=[" M",G(),_()],s="line"===s?[" L",v+i,T]:s,s=s||this.horizontal(),l+=s,$(T,v+i),n="line"===n?[" L",v+i,T+o]:n,n=n||this.vertical(),l+=n,$(v,T),l+=[" M",G(),_()],$(T,v),r="line"===r?[" L",v,T+o]:r,r=r||this.vertical(),l+=r,$(v,T+o),a="line"===a?[" L",v+i,T+o]:a,a=a||this.horizontal(),l+=a,{path:l,top:s,right:n,left:r,bottom:a,offsetX:v,offsetY:T}},this.createTileSides=({prevV:i,prevH:o,v:s,h:n})=>{const r=i.bottom||"line",a=o.right||"line",l=n===e-1?"line":null,u=s===t-1?"line":null;return{top:r,right:l,left:a,bottom:u}},this.createPuzzles=()=>{const s={};for(let n=0;n<t;n++)for(let t=0;t<e;t++){let e=i*t,r=o*n;const a=n&&s[this.makeTileId(n-1,t)],l=t&&s[this.makeTileId(n,t-1)];let u=this.createTileSides({prevV:a,prevH:l,v:n,h:t}),h=this.createTile([e,r],u),c=this.makeTileId(n,t);h.id=c;let m={top:null,left:null,right:null,bottom:null};a&&(m.top=a.id,a.linked["bottom"]=c),l&&(m.left=l.id,l.linked["right"]=c),h.linked=m,s[c]=h}return s}}function p(e,t,i,o,n,r){const a=(0,s.up)("PuzzleTile"),l=(0,s.up)("v-group");return(0,s.wg)(),(0,s.j4)(l,{config:{name:"TilesGroup",id:i.id,x:i.x,y:i.y,draggable:!0}},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.tiles,(e=>((0,s.wg)(),(0,s.j4)(a,{key:e.id,path:e.path,imageScale:i.imageScale},null,8,["path","imageScale"])))),128))])),_:1},8,["config"])}function z(e,t,i,o,n,r){const a=(0,s.up)("v-path");return(0,s.wg)(),(0,s.j4)(a,{ref:"puzzleTile",config:{data:i.path,strokeWidth:1,stroke:"black",fillPatternImage:e.puzzleImage,fillPatternScaleX:i.imageScale,fillPatternScaleY:i.imageScale,fillPatternRepeat:"no-repeat",hitStrokeWidth:0,perfectDrawEnabled:!1,shadowEnabled:!1,shadowForStrokeEnabled:!1}},null,8,["config"])}var f={name:"PuzzleTile",props:["path","imageScale"],computed:{...(0,h.rn)(["puzzleImage"]),puzzleTile(){return this.$refs["puzzleTile"].getNode()}},mounted(){this.puzzleTile.cache({pixelRatio:3})},beforeUnmount(){this.puzzleTile.clearCache()}},v=i(89);const T=(0,v.Z)(f,[["render",z]]);var y=T,w={name:"TilesGroup",components:{PuzzleTile:y},props:["id","tiles","x","y","imageScale"]};const S=(0,v.Z)(w,[["render",p]]);var I=S,b={name:"Puzzles",components:{TilesGroup:I},emits:["win"],props:["zoomStep","blurImage"],data(){return{isWheeling:!1,draggingGroupId:null,zoomTouchLastCenter:null,zoomTouchLastDist:0}},computed:{...(0,h.rn)(["isDataRestored","restorePuzzleGroups","puzzleTilesFlip","groups","puzzles","puzzleWidth","puzzleHeight","tilesNumberHorizontal","tilesNumberVertical","canvasOffset","zoom","stageWidth","stageHeight","isUserWin"]),...(0,h.Se)(["getGroupById","getGroupIndexById"]),stageConfig(){return{width:this.stageWidth,height:this.stageHeight,offsetX:-.5,offsetY:-.5,scaleX:this.zoom,scaleY:this.zoom,draggable:!!(this.zoom-1),dragBoundFunc:this.dragStageBoundFunc}},puzzleSize(){let e=this.puzzleWidth,t=this.puzzleHeight,i=Math.min((this.stageWidth-2*this.canvasOffset)/e,(this.stageHeight-2*this.canvasOffset)/t);return i<1&&(e*=i,t*=i),{width:e,height:t,scale:i}},tileWidth(){return this.puzzleSize.width/this.tilesNumberHorizontal},tileHeight(){return this.puzzleSize.height/this.tilesNumberVertical},connectionOffsetX(){return this.tileWidth/8},connectionOffsetY(){return this.tileHeight/8},stage(){return this.$refs.stage?.getNode()},mainLayer(){return this.$refs.layer.getNode()},dragLayer(){return this.$refs.dragLayer.getNode()},draggingGroup(){return this.getGroupById(this.draggingGroupId)},groupsLinkedToDragged(){const e=this.draggingGroup;if(!e)return[];const t=e.tiles.map((e=>e.id)),i=new Set;e.tiles.forEach((e=>{Object.values(e.linked).forEach((e=>i.add(e)))})),t.forEach((e=>i.delete(e))),i.delete(null);const o=this.groups.filter((e=>e.tiles.find((e=>i.has(e.id)))));return o},orderedGroups(){let e=this.groups.filter((e=>e.tiles.length>=6)),t=this.groups.filter((e=>e.tiles.length<6));return[...e,...t]},groupPositionLimits(){let e=this.canvasOffset+this.connectionOffsetX,t=this.stageWidth-this.tileWidth-2*e,i=this.canvasOffset+this.connectionOffsetY,o=this.stageHeight-this.tileHeight-2*i;return{xMin:e,xMax:t,yMin:i,yMax:o}}},methods:{...(0,h.OI)(["setPuzzles","setPuzzleGroups","setPuzzleTilesFlip"]),...(0,h.nv)(["removeGroupById","pushGroupToTop","setZoom","runGameTimer"]),mergeGroups(e){const t=this.draggingGroup;if(this.removeGroupById(t.id),!e.length)return t;let i=e.shift();return this.removeGroupById(i.id),e.forEach((e=>{let t=e;this.removeGroupById(e.id),i.tiles=[...i.tiles,...t.tiles]})),i.tiles=[...i.tiles,...t.tiles],i},checkLinkedTiles({x:e,y:t}){let i=this.groupsLinkedToDragged.filter((i=>{const o=Math.abs(i.x-e),s=Math.abs(i.y-t);return o<=this.connectionOffsetX&&s<=this.connectionOffsetY})),o=this.mergeGroups(i);this.pushGroupToTop(o)},handleDragstart(e){const t=e.target;if("TilesGroup"!==t.name())return!0;const i=t.id();if(this.draggingGroupId)return t.stopDrag(),!1;this.draggingGroupId=i,t.moveTo(this.dragLayer),this.stage.draw()},handleDragend(e){const t=e.target;if("TilesGroup"!==t.name())return!0;const i=t.x(),o=t.y();this.draggingGroup.x=i,this.draggingGroup.y=o,t.moveTo(this.mainLayer),this.checkLinkedTiles({x:i,y:o}),this.checkGameIsEnd(),this.draggingGroupId=null},getTouchDistance(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},getTouchCenter(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}},zoomTouch(e){const t=e.evt.touches[0],i=e.evt.touches[1];if(t&&i){if(e.evt.preventDefault(),this.stage.isDragging()&&this.stage.stopDrag(),this.draggingGroupId){let e=this.stage.findOne("#"+this.draggingGroupId);e.stopDrag()}let o={x:t.clientX,y:t.clientY},s={x:i.clientX,y:i.clientY};if(!this.zoomTouchLastCenter)return void(this.zoomTouchLastCenter=this.getTouchCenter(o,s));let n=this.getTouchCenter(o,s),r=this.getTouchDistance(o,s);this.zoomTouchLastDist||(this.zoomTouchLastDist=r);const a=this.zoom;let l={x:(n.x-this.stage.x())/a,y:(n.y-this.stage.y())/a},u=a*(r/this.zoomTouchLastDist),h=n.x-this.zoomTouchLastCenter.x,c=n.y-this.zoomTouchLastCenter.y,m={x:n.x-l.x*u+h,y:n.y-l.y*u+c};return this.setZoom(u).then((()=>{u===this.zoom&&this.setStagePosition(m)})),this.zoomTouchLastDist=r,this.zoomTouchLastCenter=n,!1}},zoomTouchEnd(){this.zoomTouchLastDist=0,this.zoomTouchLastCenter=null},zoomWheel(e){if(this.draggingGroupId||this.stage.isDragging())return!1;e.evt.preventDefault(),this.isWheeling=!0;const t=this.stage.getPointerPosition();let i={x:(t.x-this.stage.x())/this.zoom,y:(t.y-this.stage.y())/this.zoom};const o=e.evt.deltaY>0?1:-1,s=o>0?this.zoom-this.zoomStep:this.zoom+this.zoomStep;let n={x:t.x-i.x*s,y:t.y-i.y*s};this.setZoom(s).then((()=>{s===this.zoom&&this.setStagePosition(n)})),this.isWheeling=!1},setStagePosition(e){let t=this.dragStageBoundFunc(e);this.stage.position(t)},dragStageBoundFunc({x:e,y:t}){const i=-this.stageWidth*(this.zoom-1),o=-this.stageHeight*(this.zoom-1);let s=Math.min(0,Math.max(e,i)),n=Math.min(0,Math.max(t,o));return{x:s,y:n}},centerOnZoom(e,t){const i=this.stageWidth/2,o=this.stageHeight/2,s=i-(i-this.stage.x())/e*t,n=o-(o-this.stage.y())/e*t;return{x:s,y:n}},checkGameIsEnd(){this.isUserWin||1===this.groups.length&&this.$emit("win")},setGroupsDataAfterInitialization(){let e=[];if(this.isDataRestored)e=this.restorePuzzleGroups.map((({id:e,x:t,y:i,tilesIdArray:o})=>{let s=o.map((e=>this.puzzles[e]));return{id:e,x:t,y:i,tiles:s}}));else for(const[t,i]of Object.entries(this.puzzles)){const o=this.makeRandomPosition(i.offsetX,i.offsetY);let s={id:t,tiles:[i],x:o.x,y:o.y};e.push(s)}this.setPuzzleGroups(e)},createPuzzles(){const e=new d({tilesH:+this.tilesNumberHorizontal,tilesV:+this.tilesNumberVertical,tileWidth:this.tileWidth,tileHeight:this.tileHeight,tilesFlip:this.puzzleTilesFlip});let t=e.createPuzzles();const i=e.getTilesFlip();this.setPuzzleTilesFlip(i),this.setPuzzles(t),this.setGroupsDataAfterInitialization()},makeRandomPosition(e,t){const i=this.groupPositionLimits;let o=Math.floor(i.xMin+Math.random()*i.xMax-e),s=Math.floor(i.yMin+Math.random()*i.yMax-t);return{x:o,y:s}}},watch:{zoom(e,t){if(this.isWheeling)return;const i=this.centerOnZoom(t,e);this.setStagePosition(i)}},created(){this.createPuzzles()},mounted(){this.runGameTimer()}};const P=(0,v.Z)(b,[["render",c]]);var D=P;function x(e,t,i,o,n,a){return(0,s.wg)(),(0,s.iD)("span",null,(0,r.zw)(a.hours)+" : "+(0,r.zw)(a.twoDigits(a.minutes))+" : "+(0,r.zw)(a.twoDigits(a.seconds)),1)}var G={name:"GameTimer",data(){return{timer:null}},computed:{...(0,h.rn)(["time","isTimerRun"]),seconds(){return this.time%60},minutes(){return Math.floor(this.time%3600/60)},hours(){return Math.floor(this.time/3600)}},methods:{...(0,h.OI)(["setTime"]),...(0,h.nv)(["runGameTimer","stopGameTimer"]),twoDigits(e){return(100+e).toString().slice(1)},start(){this.timer=setInterval((()=>{let e=this.time+1;this.setTime(e)}),1e3)},pause(){clearInterval(this.timer)},timerRun(e){e?this.start():this.pause()}},watch:{isTimerRun(e){this.timerRun(e)}},mounted(){this.timerRun(this.isTimerRun)}};const k=(0,v.Z)(G,[["render",x]]);var W=k;const L={class:"image-container"},O=["src"];function M(e,t,i,n,r,a){return(0,s.wy)(((0,s.wg)(),(0,s.iD)("div",L,[(0,s._)("img",{src:e.puzzleImageSrc,alt:""},null,8,O)],512)),[[o.F8,i.show]])}var C={name:"ImagePreview",props:["show"],computed:{...(0,h.rn)(["puzzleImageSrc"])}};const H=(0,v.Z)(C,[["render",M],["__scopeId","data-v-e7e8bf5a"]]);var F=H;const R={class:"zoom"};function _(e,t,i,o,n,a){return(0,s.wg)(),(0,s.iD)("span",R,[(0,s._)("button",{onClick:t[0]||(t[0]=(...e)=>a.zoomDecrease&&a.zoomDecrease(...e))},"Zoom -"),(0,s.Uk)(" "+(0,r.zw)(a.roundedZoom)+" ",1),(0,s._)("button",{onClick:t[1]||(t[1]=(...e)=>a.zoomIncrease&&a.zoomIncrease(...e))},"Zoom +")])}var Z={name:"ZoomControls",props:{step:{type:Number,default:1}},computed:{...(0,h.rn)(["zoom"]),roundedZoom(){return g(this.zoom)}},methods:{...(0,h.nv)(["setZoom"]),zoomDecrease(){let e=this.zoom-this.step;this.setZoom(e)},zoomIncrease(){let e=this.zoom+this.step;this.setZoom(e)}}};const N=(0,v.Z)(Z,[["render",_],["__scopeId","data-v-6ad29e59"]]);var E=N;const V={class:"loader"};function j(e,t,i,o,n,r){return(0,s.wg)(),(0,s.iD)("span",V)}var U={name:"LoadSpinner"};const B=(0,v.Z)(U,[["render",j],["__scopeId","data-v-7aa26b2a"]]);var Y=B,A={name:"App",components:{Puzzles:D,GameTimer:W,ImagePreview:F,ZoomControls:E,LoadSpinner:Y},data(){return{showPreview:!1,zoomStep:.5}},computed:{...(0,h.rn)(["puzzleImage","isUserWin"]),blurImage(){return this.showPreview}},methods:{...(0,h.nv)(["initApp","saveData","resetLocalStorageData","updateCanvasSize","userWin","fullScreen"]),displayImagePreview(){this.showPreview=!this.showPreview},reset(){this.resetLocalStorageData(),window.handleReset=!0,location.reload()}},mounted(){const e=this.$refs.canvasContainer;this.updateCanvasSize(e)},beforeMount(){this.initApp(window.puzzles)}};const X=(0,v.Z)(A,[["render",u],["__scopeId","data-v-33b8e7d1"]]);var $=X,q={name:"App",components:{Main:$}};const K=(0,v.Z)(q,[["render",n]]);var J=K,Q=(e,t)=>{if(!t.length)return;let i=new Image;i.onload=i=>{let o=i.composedPath()[0];e(o,t)},i.src=t},ee=i(4161),te=i(7840),ie=i.n(te);function oe(e){const t=JSON.stringify(e);return ie().compressToEncodedURIComponent(ie().compress(t))}function se(e){const t=window.puzzles.exportConfig;let i={...t,data:e};(0,ee.Z)(i).then((function(e){console.log(e)})).catch((function(e){console.warn(e)}))}async function ne(e){let t=oe(e);se(t)}async function re(e){let t=oe(e);localStorage.setItem("puzzles",t)}const ae=(0,h.MT)({state(){return{isDataRestored:!1,restorePuzzleGroups:[],puzzleTilesFlip:[],saveToLocalStorageInterval:3e4,onValidFunc:null,tilesNumberHorizontal:0,tilesNumberVertical:0,canvasOffset:0,groups:[],puzzles:{},puzzleImageSrc:"",puzzleImage:null,puzzleWidth:0,puzzleHeight:0,time:0,isTimerRun:!1,isUserWin:!1,zoom:1,stageWidth:500,stageHeight:500,canLockOrientation:!0}},getters:{getGroupById:e=>t=>e.groups.find((e=>e.id===t)),getGroupIndexById:e=>t=>e.groups.findIndex((e=>e.id===t))},mutations:{setIsDataRestored(e,t){e.isDataRestored=t},setRestorePuzzleGroups(e,t){e.restorePuzzleGroups=t},setPuzzleTilesFlip(e,t){e.puzzleTilesFlip=t},setTime(e,t){e.time=+t},setTimerRun(e,t){e.isTimerRun=t},setUserWin(e,t){e.isUserWin=t},setonValidFunc(e,t){e.onValidFunc=t},setZoom(e,t){e.zoom=+t},setSaveToLocalStorageInterval(e,t){e.saveToLocalStorageInterval=t},setPuzzles(e,t){e.puzzles=t},setPuzzleGroups(e,t){e.groups=t},setPuzzleImageSrc(e,t){e.puzzleImageSrc=t},setPuzzleImage(e,t){e.puzzleImage=t},setPuzzleWidth(e,t){e.puzzleWidth=+t},setPuzzleHeight(e,t){e.puzzleHeight=+t},setPuzzleTilesNumberHorizontal(e,t){e.tilesNumberHorizontal=+t},setPuzzleTilesNumberVertical(e,t){e.tilesNumberVertical=+t},setCanvasOffset(e,t){e.canvasOffset=+t},addPuzzlesGroup(e,t){e.groups.push(t)},removePuzzlesGroup(e,t){e.groups.splice(t,1)},setStageWidth(e,t){e.stageWidth=+t},setStageHeight(e,t){e.stageHeight=+t},disableLockOrientation(e){e.canLockOrientation=!1}},actions:{initApp({commit:e,dispatch:t},i){const o=!!i.importData,s=+i.saveToLocalStorageInterval||0,n=i.onValid,r=i.imageSrc||"",a=+i.tilesNumberHorizontal||0,l=+i.tilesNumberVertical||0,u=+i.canvasOffset||0;if(t("initPreventPageReload"),e("setIsDataRestored",o),e("setSaveToLocalStorageInterval",s),e("setonValidFunc",n),e("setPuzzleImageSrc",r),e("setPuzzleTilesNumberHorizontal",a),e("setPuzzleTilesNumberVertical",l),e("setCanvasOffset",u),o){const t=i.groups||[],o=i.tilesFlip||[],s=+i.time||0;e("setRestorePuzzleGroups",t),e("setPuzzleTilesFlip",o),e("setTime",s)}Q((i=>{if(!i)throw new Error(`Image file not found: ${r}`);const o=i.naturalWidth,s=i.naturalHeight;e("setPuzzleWidth",o),e("setPuzzleHeight",s),e("setPuzzleImage",i),t("initAutoSaving")}),r)},runGameTimer({commit:e}){e("setTimerRun",!0)},stopGameTimer({commit:e}){e("setTimerRun",!1)},userWin({state:e,commit:t,dispatch:i}){if(i("stopGameTimer"),i("resetLocalStorageData"),t("setUserWin",!0),e.onValidFunc){let t={time:e.time};e.onValidFunc(t)}},setZoom({commit:e},t){const i=1,o=3;let s=Math.max(i,Math.min(o,+t));e("setZoom",s)},removeGroupById({getters:e,commit:t},i){const o=e.getGroupIndexById(i);t("removePuzzlesGroup",o)},pushGroupToTop({commit:e},t){e("addPuzzlesGroup",t)},updateCanvasSize({commit:e},t){e("setStageWidth",t.offsetWidth),e("setStageHeight",t.offsetHeight)},prepareDataToSave({state:e}){return new Promise((t=>{let i=e.groups.map((({id:e,x:t,y:i,tiles:o})=>{let s=o.map((e=>e.id));return{id:e,x:t,y:i,tilesIdArray:s}})),o={time:e.time,groups:i,tilesFlip:e.puzzleTilesFlip};t(o)}))},initAutoSaving({state:e,dispatch:t}){if(!e.saveToLocalStorageInterval)return;let i=function(){setTimeout((async()=>{if(e.isUserWin)return;let o=await t("prepareDataToSave");await re(o),await t("sendDataToServer",o),i()}),1e3*e.saveToLocalStorageInterval)};i()},async saveData({dispatch:e}){let t=await e("prepareDataToSave");e("sendDataToServer",t)},sendDataToServer(e,t){ne(t)},resetLocalStorageData(){localStorage.removeItem("puzzles")},initPreventPageReload(){if(window.innerWidth>800)return;const e=function(e){return!!window.handleReset||(e.preventDefault(),e.returnValue="Are you sure you want to leave the page?")};window.addEventListener("beforeunload",e,{capture:!0})},fullScreen({dispatch:e}){document.fullscreenElement?document.exitFullscreen&&(document.exitFullscreen(),e("lockMobileDeviceFullScreenOrientation",!1)):(document.getElementById("puzzle-main").requestFullscreen(),e("lockMobileDeviceFullScreenOrientation",!0))},lockMobileDeviceFullScreenOrientation({state:e,commit:t},i){e.canLockOrientation&&(i?screen.orientation.lock("any").catch((e=>{t("disableLockOrientation"),console.warn(e)})):screen.orientation.unlock())},initLockMobileDeviceOrientation(){const e=0,t=function(t,i){let o=i-e;o>=360&&(o-=360),t.setAttribute("style",`rotate:${o}deg;`)};screen.orientation.addEventListener("change",(e=>{const i=document.getElementsByTagName("HTML")[0],o=+e.target.angle;t(i,o)}))}}});var le=i(9398),ue=i.n(le),he=i(3571),ce=i.n(he);ue().hitOnDragEnabled=!0;const me=(0,o.ri)(J);me.use(ae),me.use(ce()),me.mount("#app")}},t={};function i(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,o,s,n){if(!o){var r=1/0;for(h=0;h<e.length;h++){o=e[h][0],s=e[h][1],n=e[h][2];for(var a=!0,l=0;l<o.length;l++)(!1&n||r>=n)&&Object.keys(i.O).every((function(e){return i.O[e](o[l])}))?o.splice(l--,1):(a=!1,n<r&&(r=n));if(a){e.splice(h--,1);var u=s();void 0!==u&&(t=u)}}return t}n=n||0;for(var h=e.length;h>0&&e[h-1][2]>n;h--)e[h]=e[h-1];e[h]=[o,s,n]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,o){var s,n,r=o[0],a=o[1],l=o[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(s in a)i.o(a,s)&&(i.m[s]=a[s]);if(l)var h=l(i)}for(t&&t(o);u<r.length;u++)n=r[u],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(h)},o=self["webpackChunkpuzzles"]=self["webpackChunkpuzzles"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=i.O(void 0,[998],(function(){return i(3869)}));o=i.O(o)})();
//# sourceMappingURL=app.js.map