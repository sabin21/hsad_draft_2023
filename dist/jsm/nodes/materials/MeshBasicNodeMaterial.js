import NodeMaterial,{addNodeMaterial}from"./NodeMaterial.js";import{MeshBasicMaterial}from"three";const defaultValues=new MeshBasicMaterial;class MeshBasicNodeMaterial extends NodeMaterial{constructor(e){super(),this.isMeshBasicNodeMaterial=!0,this.lights=!1,this.setDefaultValues(defaultValues),this.setValues(e)}copy(e){return this.colorNode=e.colorNode,this.opacityNode=e.opacityNode,this.alphaTestNode=e.alphaTestNode,this.lightNode=e.lightNode,this.positionNode=e.positionNode,super.copy(e)}}export default MeshBasicNodeMaterial;addNodeMaterial(MeshBasicNodeMaterial);