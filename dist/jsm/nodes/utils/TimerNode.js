import UniformNode from"../core/UniformNode.js";import{NodeUpdateType}from"../core/constants.js";import{nodeObject,nodeImmutable}from"../shadernode/ShaderNode.js";import{addNodeClass}from"../core/Node.js";class TimerNode extends UniformNode{constructor(e=TimerNode.LOCAL,o=1,r=0){super(r),this.scope=e,this.scale=o,this.updateType=NodeUpdateType.FRAME}update(e){const o=this.scope,r=this.scale;o===TimerNode.LOCAL?this.value+=e.deltaTime*r:o===TimerNode.DELTA?this.value=e.deltaTime*r:o===TimerNode.FRAME?this.value=e.frameId:this.value=e.time*r}serialize(e){super.serialize(e),e.scope=this.scope,e.scale=this.scale}deserialize(e){super.deserialize(e),this.scope=e.scope,this.scale=e.scale}}TimerNode.LOCAL="local",TimerNode.GLOBAL="global",TimerNode.DELTA="delta",TimerNode.FRAME="frame";export default TimerNode;export const timerLocal=(e,o=0)=>nodeObject(new TimerNode(TimerNode.LOCAL,e,o));export const timerGlobal=(e,o=0)=>nodeObject(new TimerNode(TimerNode.GLOBAL,e,o));export const timerDelta=(e,o=0)=>nodeObject(new TimerNode(TimerNode.DELTA,e,o));export const frameId=nodeImmutable(TimerNode,TimerNode.FRAME);addNodeClass(TimerNode);