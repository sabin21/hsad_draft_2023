import Node,{addNodeClass}from"../core/Node.js";import{uniform}from"../core/UniformNode.js";import{materialReference}from"./MaterialReferenceNode.js";import{uv}from"./UVNode.js";import{nodeImmutable,vec3}from"../shadernode/ShaderNode.js";class MaterialNode extends Node{constructor(e){super(),this.scope=e}getNodeType(e){const a=this.scope,t=e.context.material;return a===MaterialNode.COLOR?null!==t.map?"vec4":"vec3":a===MaterialNode.OPACITY||a===MaterialNode.ROTATION?"float":a===MaterialNode.UV?"vec2":a===MaterialNode.EMISSIVE?"vec3":a===MaterialNode.ROUGHNESS||a===MaterialNode.METALNESS||a===MaterialNode.SPECULAR||a===MaterialNode.SHININESS?"float":void 0}getFloat(e){return materialReference(e,"float")}getColor(e){return materialReference(e,"color")}getTexture(e){const a=materialReference(e,"texture");return a.node.uvNode=materialUV,a}construct(e){const a=e.context.material,t=this.scope;let o=null;if(t===MaterialNode.ALPHA_TEST)o=this.getFloat("alphaTest");else if(t===MaterialNode.COLOR){const e=this.getColor("color");o=a.map&&!0===a.map.isTexture?e.mul(this.getTexture("map")):e}else if(t===MaterialNode.OPACITY){const e=this.getFloat("opacity");o=a.alphaMap&&!0===a.alphaMap.isTexture?e.mul(this.getTexture("alphaMap")):e}else if(t===MaterialNode.SHININESS)o=this.getFloat("shininess");else if(t===MaterialNode.SPECULAR_COLOR)o=this.getColor("specular");else if(t===MaterialNode.REFLECTIVITY){const e=this.getFloat("reflectivity");o=a.specularMap&&!0===a.specularMap.isTexture?e.mul(this.getTexture("specularMap").r):e}else if(t===MaterialNode.ROUGHNESS){const e=this.getFloat("roughness");o=a.roughnessMap&&!0===a.roughnessMap.isTexture?e.mul(this.getTexture("roughnessMap").g):e}else if(t===MaterialNode.METALNESS){const e=this.getFloat("metalness");o=a.metalnessMap&&!0===a.metalnessMap.isTexture?e.mul(this.getTexture("metalnessMap").b):e}else if(t===MaterialNode.EMISSIVE){const e=this.getColor("emissive");o=a.emissiveMap&&!0===a.emissiveMap.isTexture?e.mul(this.getTexture("emissiveMap")):e}else if(t===MaterialNode.ROTATION)o=this.getFloat("rotation");else if(t===MaterialNode.UV){let e=a.map||a.specularMap||a.displacementMap||a.normalMap||a.bumpMap||a.roughnessMap||a.metalnessMap||a.alphaMap||a.emissiveMap||a.clearcoatMap||a.clearcoatNormalMap||a.clearcoatRoughnessMap||a.iridescenceMap||a.iridescenceThicknessMap||a.specularIntensityMap||a.specularColorMap||a.transmissionMap||a.thicknessMap||a.sheenColorMap||a.sheenRoughnessMap;e?(e.isWebGLRenderTarget&&(e=e.texture),!0===e.matrixAutoUpdate&&e.updateMatrix(),o=uniform(e.matrix).mul(vec3(uv(),1))):o=uv()}else{const a=this.getNodeType(e);o=materialReference(t,a)}return o}}MaterialNode.ALPHA_TEST="alphaTest",MaterialNode.COLOR="color",MaterialNode.OPACITY="opacity",MaterialNode.SHININESS="shininess",MaterialNode.SPECULAR_COLOR="specularColor",MaterialNode.REFLECTIVITY="reflectivity",MaterialNode.ROUGHNESS="roughness",MaterialNode.METALNESS="metalness",MaterialNode.EMISSIVE="emissive",MaterialNode.ROTATION="rotation",MaterialNode.UV="uv";export default MaterialNode;export const materialUV=nodeImmutable(MaterialNode,MaterialNode.UV);export const materialAlphaTest=nodeImmutable(MaterialNode,MaterialNode.ALPHA_TEST);export const materialColor=nodeImmutable(MaterialNode,MaterialNode.COLOR);export const materialShininess=nodeImmutable(MaterialNode,MaterialNode.SHININESS);export const materialEmissive=nodeImmutable(MaterialNode,MaterialNode.EMISSIVE);export const materialOpacity=nodeImmutable(MaterialNode,MaterialNode.OPACITY);export const materialSpecularColor=nodeImmutable(MaterialNode,MaterialNode.SPECULAR_COLOR);export const materialReflectivity=nodeImmutable(MaterialNode,MaterialNode.REFLECTIVITY);export const materialRoughness=nodeImmutable(MaterialNode,MaterialNode.ROUGHNESS);export const materialMetalness=nodeImmutable(MaterialNode,MaterialNode.METALNESS);export const materialRotation=nodeImmutable(MaterialNode,MaterialNode.ROTATION);addNodeClass(MaterialNode);