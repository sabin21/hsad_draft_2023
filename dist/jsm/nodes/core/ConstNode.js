import InputNode from"./InputNode.js";import{addNodeClass}from"./Node.js";class ConstNode extends InputNode{constructor(e,t=null){super(e,t),this.isConstNode=!0}generateConst(e){return e.getConst(this.getNodeType(e),this.value)}generate(e,t){const o=this.getNodeType(e);return e.format(this.generateConst(e),o,t)}}export default ConstNode;addNodeClass(ConstNode);