import AnalyticLightNode from"./AnalyticLightNode.js";import{addLightNode}from"./LightsNode.js";import{getDistanceAttenuation}from"./LightUtils.js";import{uniform}from"../core/UniformNode.js";import{objectViewPosition}from"../accessors/Object3DNode.js";import{positionView}from"../accessors/PositionNode.js";import{addNodeClass}from"../core/Node.js";import{PointLight}from"three";class PointLightNode extends AnalyticLightNode{constructor(t=null){super(t),this.cutoffDistanceNode=uniform(0),this.decayExponentNode=uniform(0)}update(t){const{light:o}=this;super.update(t),this.cutoffDistanceNode.value=o.distance,this.decayExponentNode.value=o.decay}construct(t){const{colorNode:o,cutoffDistanceNode:e,decayExponentNode:i,light:n}=this,s=objectViewPosition(n).sub(positionView),d=s.normalize(),c=s.length(),r=getDistanceAttenuation.call({lightDistance:c,cutoffDistance:e,decayExponent:i}),a=o.mul(r),l=t.context.lightingModelNode,h=t.context.reflectedLight;l&&l.direct&&l.direct.call({lightDirection:d,lightColor:a,reflectedLight:h},t)}}export default PointLightNode;addLightNode(PointLight,PointLightNode),addNodeClass(PointLightNode);