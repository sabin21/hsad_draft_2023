import TempNode from"../core/TempNode.js";import{addNodeClass}from"../core/Node.js";import{addNodeElement,nodeProxy}from"../shadernode/ShaderNode.js";class PosterizeNode extends TempNode{constructor(e,o){super(),this.sourceNode=e,this.stepsNode=o}construct(){const{sourceNode:e,stepsNode:o}=this;return e.mul(o).floor().div(o)}}export default PosterizeNode;export const posterize=nodeProxy(PosterizeNode);addNodeElement("posterize",posterize),addNodeClass(PosterizeNode);