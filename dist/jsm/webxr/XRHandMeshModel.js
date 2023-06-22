import{GLTFLoader}from"../loaders/GLTFLoader.js";const DEFAULT_HAND_PROFILE_PATH="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";class XRHandMeshModel{constructor(e,n,i,a,t=null){this.controller=n,this.handModel=e,this.bones=[],null===t&&(t=new GLTFLoader).setPath(i||DEFAULT_HAND_PROFILE_PATH),t.load(`${a}.glb`,(e=>{const n=e.scene.children[0];this.handModel.add(n);const i=n.getObjectByProperty("type","SkinnedMesh");i.frustumCulled=!1,i.castShadow=!0,i.receiveShadow=!0,["wrist","thumb-metacarpal","thumb-phalanx-proximal","thumb-phalanx-distal","thumb-tip","index-finger-metacarpal","index-finger-phalanx-proximal","index-finger-phalanx-intermediate","index-finger-phalanx-distal","index-finger-tip","middle-finger-metacarpal","middle-finger-phalanx-proximal","middle-finger-phalanx-intermediate","middle-finger-phalanx-distal","middle-finger-tip","ring-finger-metacarpal","ring-finger-phalanx-proximal","ring-finger-phalanx-intermediate","ring-finger-phalanx-distal","ring-finger-tip","pinky-finger-metacarpal","pinky-finger-phalanx-proximal","pinky-finger-phalanx-intermediate","pinky-finger-phalanx-distal","pinky-finger-tip"].forEach((e=>{const i=n.getObjectByName(e);void 0!==i?i.jointName=e:console.warn(`Couldn't find ${e} in ${a} hand mesh`),this.bones.push(i)}))}))}updateMesh(){const e=this.controller.joints;for(let n=0;n<this.bones.length;n++){const i=this.bones[n];if(i){const n=e[i.jointName];if(n.visible){const e=n.position;i.position.copy(e),i.quaternion.copy(n.quaternion)}}}}}export{XRHandMeshModel};