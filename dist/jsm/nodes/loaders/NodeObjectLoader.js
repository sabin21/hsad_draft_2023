import NodeLoader from"./NodeLoader.js";import NodeMaterialLoader from"./NodeMaterialLoader.js";import{ObjectLoader}from"three";class NodeObjectLoader extends ObjectLoader{constructor(e){super(e),this._nodesJSON=null}parse(e,o){this._nodesJSON=e.nodes;const r=super.parse(e,o);return this._nodesJSON=null,r}parseNodes(e,o){if(void 0!==e){const r=new NodeLoader;return r.setTextures(o),r.parseNodes(e)}return{}}parseMaterials(e,o){const r={};if(void 0!==e){const s=this.parseNodes(this._nodesJSON,o),t=new NodeMaterialLoader;t.setTextures(o),t.setNodes(s);for(let o=0,s=e.length;o<s;o++){const s=e[o];r[s.uuid]=t.parse(s)}}return r}}export default NodeObjectLoader;