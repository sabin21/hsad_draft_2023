import Node,{addNodeClass}from"../core/Node.js";import{vectorComponents}from"../core/constants.js";const stringVectorComponents=vectorComponents.join("");class SplitNode extends Node{constructor(e,t="x"){super(),this.node=e,this.components=t}getVectorLength(){let e=this.components.length;for(const t of this.components)e=Math.max(vectorComponents.indexOf(t)+1,e);return e}getNodeType(e){return e.getTypeFromLength(this.components.length)}generate(e,t){const o=this.node,n=e.getTypeLength(o.getNodeType(e));let s=null;if(n>1){let r=null;this.getVectorLength()>=n&&(r=e.getTypeFromLength(this.getVectorLength()));const i=o.build(e,r);s=this.components.length===n&&this.components===stringVectorComponents.slice(0,this.components.length)?e.format(i,r,t):e.format(`${i}.${this.components}`,this.getNodeType(e),t)}else s=o.build(e,t);return s}serialize(e){super.serialize(e),e.components=this.components}deserialize(e){super.deserialize(e),this.components=e.components}}export default SplitNode;addNodeClass(SplitNode);