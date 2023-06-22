import TempNode from"../core/TempNode.js";import{addNodeClass}from"../core/Node.js";import{addNodeElement,nodeArray,nodeObject,nodeObjects}from"../shadernode/ShaderNode.js";class FunctionCallNode extends TempNode{constructor(e=null,o={}){super(),this.functionNode=e,this.parameters=o}setParameters(e){return this.parameters=e,this}getParameters(){return this.parameters}getNodeType(e){return this.functionNode.getNodeType(e)}generate(e){const o=[],t=this.functionNode,n=t.getInputs(e),r=this.parameters;if(Array.isArray(r))for(let t=0;t<r.length;t++){const d=n[t],s=r[t];o.push(s.build(e,d.type))}else for(const t of n){const n=r[t.name];if(void 0===n)throw new Error(`FunctionCallNode: Input '${t.name}' not found in FunctionNode.`);o.push(n.build(e,t.type))}return`${t.build(e,"property")}( ${o.join(", ")} )`}}export default FunctionCallNode;export const call=(e,...o)=>(o=o.length>1||o[0]&&!0===o[0].isNode?nodeArray(o):nodeObjects(o[0]),nodeObject(new FunctionCallNode(nodeObject(e),o)));addNodeElement("call",call),addNodeClass(FunctionCallNode);