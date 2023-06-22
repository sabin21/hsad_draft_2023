import{EventDispatcher,Quaternion,Vector3}from"three";const _changeEvent={type:"change"};class FlyControls extends EventDispatcher{constructor(t,e){super(),this.object=t,this.domElement=e,this.movementSpeed=1,this.rollSpeed=.005,this.dragToLook=!1,this.autoForward=!1;const o=this,i=1e-6,s=new Quaternion,a=new Vector3;this.tmpQuaternion=new Quaternion,this.status=0,this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0},this.moveVector=new Vector3(0,0,0),this.rotationVector=new Vector3(0,0,0),this.keydown=function(t){if(!t.altKey){switch(t.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=.1;break;case"KeyW":this.moveState.forward=1;break;case"KeyS":this.moveState.back=1;break;case"KeyA":this.moveState.left=1;break;case"KeyD":this.moveState.right=1;break;case"KeyR":this.moveState.up=1;break;case"KeyF":this.moveState.down=1;break;case"ArrowUp":this.moveState.pitchUp=1;break;case"ArrowDown":this.moveState.pitchDown=1;break;case"ArrowLeft":this.moveState.yawLeft=1;break;case"ArrowRight":this.moveState.yawRight=1;break;case"KeyQ":this.moveState.rollLeft=1;break;case"KeyE":this.moveState.rollRight=1}this.updateMovementVector(),this.updateRotationVector()}},this.keyup=function(t){switch(t.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=1;break;case"KeyW":this.moveState.forward=0;break;case"KeyS":this.moveState.back=0;break;case"KeyA":this.moveState.left=0;break;case"KeyD":this.moveState.right=0;break;case"KeyR":this.moveState.up=0;break;case"KeyF":this.moveState.down=0;break;case"ArrowUp":this.moveState.pitchUp=0;break;case"ArrowDown":this.moveState.pitchDown=0;break;case"ArrowLeft":this.moveState.yawLeft=0;break;case"ArrowRight":this.moveState.yawRight=0;break;case"KeyQ":this.moveState.rollLeft=0;break;case"KeyE":this.moveState.rollRight=0}this.updateMovementVector(),this.updateRotationVector()},this.pointerdown=function(t){if(this.dragToLook)this.status++;else{switch(t.button){case 0:this.moveState.forward=1;break;case 2:this.moveState.back=1}this.updateMovementVector()}},this.pointermove=function(t){if(!this.dragToLook||this.status>0){const e=this.getContainerDimensions(),o=e.size[0]/2,i=e.size[1]/2;this.moveState.yawLeft=-(t.pageX-e.offset[0]-o)/o,this.moveState.pitchDown=(t.pageY-e.offset[1]-i)/i,this.updateRotationVector()}},this.pointerup=function(t){if(this.dragToLook)this.status--,this.moveState.yawLeft=this.moveState.pitchDown=0;else{switch(t.button){case 0:this.moveState.forward=0;break;case 2:this.moveState.back=0}this.updateMovementVector()}this.updateRotationVector()},this.update=function(t){const e=t*o.movementSpeed,n=t*o.rollSpeed;o.object.translateX(o.moveVector.x*e),o.object.translateY(o.moveVector.y*e),o.object.translateZ(o.moveVector.z*e),o.tmpQuaternion.set(o.rotationVector.x*n,o.rotationVector.y*n,o.rotationVector.z*n,1).normalize(),o.object.quaternion.multiply(o.tmpQuaternion),(a.distanceToSquared(o.object.position)>i||8*(1-s.dot(o.object.quaternion))>i)&&(o.dispatchEvent(_changeEvent),s.copy(o.object.quaternion),a.copy(o.object.position))},this.updateMovementVector=function(){const t=this.moveState.forward||this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right,this.moveVector.y=-this.moveState.down+this.moveState.up,this.moveVector.z=-t+this.moveState.back},this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp,this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft,this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft},this.getContainerDimensions=function(){return this.domElement!=document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}},this.dispose=function(){this.domElement.removeEventListener("contextmenu",contextmenu),this.domElement.removeEventListener("pointerdown",r),this.domElement.removeEventListener("pointermove",n),this.domElement.removeEventListener("pointerup",h),window.removeEventListener("keydown",c),window.removeEventListener("keyup",m)};const n=this.pointermove.bind(this),r=this.pointerdown.bind(this),h=this.pointerup.bind(this),c=this.keydown.bind(this),m=this.keyup.bind(this);this.domElement.addEventListener("contextmenu",contextmenu),this.domElement.addEventListener("pointerdown",r),this.domElement.addEventListener("pointermove",n),this.domElement.addEventListener("pointerup",h),window.addEventListener("keydown",c),window.addEventListener("keyup",m),this.updateMovementVector(),this.updateRotationVector()}}function contextmenu(t){t.preventDefault()}export{FlyControls};