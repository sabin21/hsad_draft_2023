import{DataTextureLoader,LinearFilter,LinearMipmapLinearFilter}from"three";import UTIF from"../libs/utif.module.js";class TIFFLoader extends DataTextureLoader{constructor(e){super(e)}parse(e){const r=UTIF.decode(e);UTIF.decodeImage(e,r[0]);const t=UTIF.toRGBA8(r[0]);return{width:r[0].width,height:r[0].height,data:t,flipY:!0,magFilter:LinearFilter,minFilter:LinearMipmapLinearFilter}}}export{TIFFLoader};