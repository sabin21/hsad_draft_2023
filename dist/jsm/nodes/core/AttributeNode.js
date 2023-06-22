import Node,{addNodeClass}from"./Node.js";import{varying}from"./VaryingNode.js";import{nodeObject}from"../shadernode/ShaderNode.js";class AttributeNode extends Node{constructor(t,e=null){super(e),this._attributeName=t}getHash(t){return this.getAttributeName(t)}getNodeType(t){const e=this.getAttributeName(t);let r=super.getNodeType(t);if(null===r)if(t.hasGeometryAttribute(e)){const o=t.geometry.getAttribute(e);r=t.getTypeFromAttribute(o)}else r="float";return r}setAttributeName(t){return this._attributeName=t,this}getAttributeName(){return this._attributeName}generate(t){const e=this.getAttributeName(t),r=this.getNodeType(t);if(!0===t.hasGeometryAttribute(e)){const o=t.geometry.getAttribute(e),i=t.getTypeFromAttribute(o),s=t.getAttribute(e,i);return t.isShaderStage("vertex")?t.format(s.name,i,r):varying(this).build(t,r)}return console.warn(`AttributeNode: Attribute "${e}" not found.`),t.getConst(r)}}export default AttributeNode;export const attribute=(t,e)=>nodeObject(new AttributeNode(t,e));addNodeClass(AttributeNode);