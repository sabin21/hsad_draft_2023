import{normalGeometry}from"../../accessors/NormalNode.js";import{ShaderNode}from"../../shadernode/ShaderNode.js";const getGeometryRoughness=new ShaderNode((()=>{const e=normalGeometry.dFdx().abs().max(normalGeometry.dFdy().abs());return e.x.max(e.y).max(e.z)}));export default getGeometryRoughness;