import{CompressedTextureLoader,RGBA_PVRTC_2BPPV1_Format,RGBA_PVRTC_4BPPV1_Format,RGB_PVRTC_2BPPV1_Format,RGB_PVRTC_4BPPV1_Format}from"three";class PVRLoader extends CompressedTextureLoader{constructor(r){super(r)}parse(r,t){const e=new Uint32Array(r,0,13),a={buffer:r,header:e,loadMipmaps:t};return 55727696===e[0]?_parseV3(a):559044176===e[11]?_parseV2(a):void console.error("THREE.PVRLoader: Unknown PVR format.")}}function _parseV3(r){const t=r.header;let e,a;const o=t[12],m=t[2],s=t[6],P=t[7],n=t[10],p=t[11];switch(m){case 0:e=2,a=RGB_PVRTC_2BPPV1_Format;break;case 1:e=2,a=RGBA_PVRTC_2BPPV1_Format;break;case 2:e=4,a=RGB_PVRTC_4BPPV1_Format;break;case 3:e=4,a=RGBA_PVRTC_4BPPV1_Format;break;default:console.error("THREE.PVRLoader: Unsupported PVR format:",m)}return r.dataPtr=52+o,r.bpp=e,r.format=a,r.width=P,r.height=s,r.numSurfaces=n,r.numMipmaps=p,r.isCubemap=6===n,_extract(r)}function _parseV2(r){const t=r.header,e=t[0],a=t[1],o=t[2],m=t[3],s=t[4],P=t[10],n=t[12],p=255&s;let _,V;const i=P>0;return 25===p?(V=i?RGBA_PVRTC_4BPPV1_Format:RGB_PVRTC_4BPPV1_Format,_=4):24===p?(V=i?RGBA_PVRTC_2BPPV1_Format:RGB_PVRTC_2BPPV1_Format,_=2):console.error("THREE.PVRLoader: Unknown PVR format:",p),r.dataPtr=e,r.bpp=_,r.format=V,r.width=o,r.height=a,r.numSurfaces=n,r.numMipmaps=m+1,r.isCubemap=6===n,_extract(r)}function _extract(r){const t={mipmaps:[],width:r.width,height:r.height,format:r.format,mipmapCount:r.numMipmaps,isCubemap:r.isCubemap},e=r.buffer;let a=r.dataPtr,o=0,m=0,s=0,P=0,n=0,p=0;const _=r.bpp,V=r.numSurfaces;2===_?(s=8,P=4):(s=4,P=4),m=s*P*_/8,t.mipmaps.length=r.numMipmaps*V;let i=0;for(;i<r.numMipmaps;){const _=r.width>>i,R=r.height>>i;n=_/s,p=R/P,n<2&&(n=2),p<2&&(p=2),o=n*p*m;for(let m=0;m<V;m++){const s={data:new Uint8Array(e,a,o),width:_,height:R};t.mipmaps[m*r.numMipmaps+i]=s,a+=o}i++}return t}export{PVRLoader};