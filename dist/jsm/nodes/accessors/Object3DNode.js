import Node,{addNodeClass}from"../core/Node.js";import{NodeUpdateType}from"../core/constants.js";import{uniform}from"../core/UniformNode.js";import{nodeProxy}from"../shadernode/ShaderNode.js";import{Vector3}from"three";class Object3DNode extends Node{constructor(e=Object3DNode.VIEW_MATRIX,o=null){super(),this.scope=e,this.object3d=o,this.updateType=NodeUpdateType.OBJECT,this._uniformNode=uniform(null)}getNodeType(){const e=this.scope;return e===Object3DNode.WORLD_MATRIX||e===Object3DNode.VIEW_MATRIX?"mat4":e===Object3DNode.NORMAL_MATRIX?"mat3":e===Object3DNode.POSITION||e===Object3DNode.VIEW_POSITION||e===Object3DNode.DIRECTION?"vec3":void 0}update(e){const o=this.object3d,t=this._uniformNode,d=this.scope;if(d===Object3DNode.VIEW_MATRIX)t.value=o.modelViewMatrix;else if(d===Object3DNode.NORMAL_MATRIX)t.value=o.normalMatrix;else if(d===Object3DNode.WORLD_MATRIX)t.value=o.matrixWorld;else if(d===Object3DNode.POSITION)t.value=t.value||new Vector3,t.value.setFromMatrixPosition(o.matrixWorld);else if(d===Object3DNode.DIRECTION)t.value=t.value||new Vector3,o.getWorldDirection(t.value);else if(d===Object3DNode.VIEW_POSITION){const d=e.camera;t.value=t.value||new Vector3,t.value.setFromMatrixPosition(o.matrixWorld),t.value.applyMatrix4(d.matrixWorldInverse)}}generate(e){const o=this.scope;return o===Object3DNode.WORLD_MATRIX||o===Object3DNode.VIEW_MATRIX?this._uniformNode.nodeType="mat4":o===Object3DNode.NORMAL_MATRIX?this._uniformNode.nodeType="mat3":o!==Object3DNode.POSITION&&o!==Object3DNode.VIEW_POSITION&&o!==Object3DNode.DIRECTION||(this._uniformNode.nodeType="vec3"),this._uniformNode.build(e)}serialize(e){super.serialize(e),e.scope=this.scope}deserialize(e){super.deserialize(e),this.scope=e.scope}}Object3DNode.VIEW_MATRIX="viewMatrix",Object3DNode.NORMAL_MATRIX="normalMatrix",Object3DNode.WORLD_MATRIX="worldMatrix",Object3DNode.POSITION="position",Object3DNode.VIEW_POSITION="viewPosition",Object3DNode.DIRECTION="direction";export default Object3DNode;export const objectDirection=nodeProxy(Object3DNode,Object3DNode.DIRECTION);export const objectViewMatrix=nodeProxy(Object3DNode,Object3DNode.VIEW_MATRIX);export const objectNormalMatrix=nodeProxy(Object3DNode,Object3DNode.NORMAL_MATRIX);export const objectWorldMatrix=nodeProxy(Object3DNode,Object3DNode.WORLD_MATRIX);export const objectPosition=nodeProxy(Object3DNode,Object3DNode.POSITION);export const objectViewPosition=nodeProxy(Object3DNode,Object3DNode.VIEW_POSITION);addNodeClass(Object3DNode);