import{AnimationClip,AnimationMixer,Mesh}from"three";class MorphAnimMesh extends Mesh{constructor(i,t){super(i,t),this.type="MorphAnimMesh",this.mixer=new AnimationMixer(this),this.activeAction=null}setDirectionForward(){this.mixer.timeScale=1}setDirectionBackward(){this.mixer.timeScale=-1}playAnimation(i,t){this.activeAction&&(this.activeAction.stop(),this.activeAction=null);const e=AnimationClip.findByName(this,i);if(!e)throw new Error("THREE.MorphAnimMesh: animations["+i+"] undefined in .playAnimation()");{const i=this.mixer.clipAction(e);i.timeScale=e.tracks.length*t/e.duration,this.activeAction=i.play()}}updateAnimation(i){this.mixer.update(i)}copy(i,t){return super.copy(i,t),this.mixer=new AnimationMixer(this),this}}export{MorphAnimMesh};