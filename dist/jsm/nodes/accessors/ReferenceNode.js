import Node,{addNodeClass}from"../core/Node.js";import{NodeUpdateType}from"../core/constants.js";import{uniform}from"../core/UniformNode.js";import{texture}from"./TextureNode.js";import{nodeObject,getConstNodeType}from"../shadernode/ShaderNode.js";class ReferenceNode extends Node{constructor(e,o,t=null){super(),this.property=e,this.uniformType=o,this.object=t,this.node=null,this.updateType=NodeUpdateType.OBJECT,this.setNodeType(o)}setNodeType(e){let o=null;o="texture"===e?texture(null):uniform(e),this.node=o}getNodeType(e){return this.node.getNodeType(e)}update(e){const o=null!==this.object?this.object:e.object,t=this.property;this.node.value=o[t]}construct(){return this.node}}export default ReferenceNode;export const reference=(e,o,t)=>nodeObject(new ReferenceNode(e,getConstNodeType(o),t));addNodeClass(ReferenceNode);