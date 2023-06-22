import{WebGLNodeBuilder}from"./WebGLNodeBuilder.js";import{NodeFrame}from"three/nodes";import{Material}from"three";const builders=new WeakMap;export const nodeFrame=new NodeFrame;Material.prototype.onBuild=function(e,o,r){!0===e.material.isNodeMaterial&&builders.set(this,new WebGLNodeBuilder(e,r,o).build())},Material.prototype.onBeforeRender=function(e,o,r,t,a){const d=builders.get(this);if(void 0!==d){nodeFrame.material=this,nodeFrame.camera=r,nodeFrame.object=a,nodeFrame.renderer=e;const o=d.updateNodes;if(o.length>0){e.state.useProgram(null);for(const e of o)nodeFrame.updateNode(e)}}};