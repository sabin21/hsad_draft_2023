import TempNode from"../core/TempNode.js";import{uv}from"../accessors/UVNode.js";import{addNodeClass}from"../core/Node.js";import{addNodeElement,ShaderNode,nodeProxy}from"../shadernode/ShaderNode.js";const checkerShaderNode=new ShaderNode((e=>{const o=e.uv.mul(2),d=o.x.floor(),r=o.y.floor();return d.add(r).mod(2).sign()}));class CheckerNode extends TempNode{constructor(e=uv()){super("float"),this.uvNode=e}generate(e){return checkerShaderNode.call({uv:this.uvNode}).build(e)}}export default CheckerNode;export const checker=nodeProxy(CheckerNode);addNodeElement("checker",checker),addNodeClass(CheckerNode);