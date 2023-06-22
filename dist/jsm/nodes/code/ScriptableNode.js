import Node,{addNodeClass}from"../core/Node.js";import{scriptableValue}from"./ScriptableValueNode.js";import{addNodeElement,nodeProxy,float}from"../shadernode/ShaderNode.js";class Resources extends Map{get(t,e=null,...s){if(this.has(t))return super.get(t);if(null!==e){const r=e(...s);return this.set(t,r),r}}}class Parameters{constructor(t){this.scriptableNode=t}get parameters(){return this.scriptableNode.parameters}get layout(){return this.scriptableNode.getLayout()}getInputLayout(t){return this.scriptableNode.getInputLayout(t)}get(t){const e=this.parameters[t];return e?e.getValue():null}}export const global=new Resources;class ScriptableNode extends Node{constructor(t=null,e={}){super(),this.codeNode=t,this.parameters=e,this._local=new Resources,this._output=scriptableValue(),this._outputs={},this._source=this.source,this._method=null,this._object=null,this._value=null,this._needsOutputUpdate=!0,this.onRefresh=this.onRefresh.bind(this),this.isScriptableNode=!0}get source(){return this.codeNode?this.codeNode.code:""}setLocal(t,e){return this._local.set(t,e)}getLocal(t){return this._local.get(t)}onRefresh(){this._refresh()}getInputLayout(t){for(const e of this.getLayout())if(e.inputType&&(e.id===t||e.name===t))return e}getOutputLayout(t){for(const e of this.getLayout())if(e.outputType&&(e.id===t||e.name===t))return e}setOutput(t,e){const s=this._outputs;return void 0===s[t]?s[t]=scriptableValue(e):s[t].value=e,this}getOutput(t){return this._outputs[t]}getParameter(t){return this.parameters[t]}setParameter(t,e){const s=this.parameters;return e&&e.isScriptableNode?(this.deleteParameter(t),s[t]=e,s[t].getDefaultOutput().events.addEventListener("refresh",this.onRefresh)):e&&e.isScriptableValueNode?(this.deleteParameter(t),s[t]=e,s[t].events.addEventListener("refresh",this.onRefresh)):void 0===s[t]?(s[t]=scriptableValue(e),s[t].events.addEventListener("refresh",this.onRefresh)):s[t].value=e,this}getValue(){return this.getDefaultOutput().getValue()}deleteParameter(t){let e=this.parameters[t];return e&&(e.isScriptableNode&&(e=e.getDefaultOutput()),e.events.removeEventListener("refresh",this.onRefresh)),this}clearParameters(){for(const t of Object.keys(this.parameters))this.deleteParameter(t);return this.needsUpdate=!0,this}call(t,...e){const s=this.getObject()[t];if("function"==typeof s)return s(...e)}async callAsync(t,...e){const s=this.getObject()[t];if("function"==typeof s)return"AsyncFunction"===s.constructor.name?await s(...e):s(...e)}getNodeType(t){return this.getDefaultOutputNode().getNodeType(t)}refresh(t=null){null!==t?this.getOutput(t).refresh():this._refresh()}getObject(){if(this.needsUpdate&&this.dispose(),null!==this._object)return this._object;const t=new Parameters(this),e=global.get("THREE"),s=global.get("TSL"),r=this.getMethod(this.codeNode),u=[t,this._local,global,()=>this.refresh(),(t,e)=>this.setOutput(t,e),e,s];this._object=r(...u);const i=this._object.layout;if(i&&(!1===i.cache&&this._local.clear(),this._output.outputType=i.outputType||null,Array.isArray(i.elements)))for(const t of i.elements){const e=t.id||t.name;t.inputType&&(void 0===this.getParameter(e)&&this.setParameter(e,null),this.getParameter(e).inputType=t.inputType),t.outputType&&(void 0===this.getOutput(e)&&this.setOutput(e,null),this.getOutput(e).outputType=t.outputType)}return this._object}deserialize(t){super.deserialize(t);for(const t in this.parameters){let e=this.parameters[t];e.isScriptableNode&&(e=e.getDefaultOutput()),e.events.addEventListener("refresh",this.onRefresh)}}getLayout(){return this.getObject().layout}getDefaultOutputNode(){const t=this.getDefaultOutput().value;return t&&t.isNode?t:float()}getDefaultOutput(){return this._exec()._output}getMethod(){if(this.needsUpdate&&this.dispose(),null!==this._method)return this._method;const t=["layout","init","main","dispose"].join(", "),e="\nreturn { ...output, "+t+" };",s="var "+t+"; var output = {};\n"+this.codeNode.code+e;return this._method=new Function(...["parameters","local","global","refresh","setOutput","THREE","TSL"],s),this._method}dispose(){null!==this._method&&(this._object&&"function"==typeof this._object.dispose&&this._object.dispose(),this._method=null,this._object=null,this._source=null,this._value=null,this._needsOutputUpdate=!0,this._output.value=null,this._outputs={})}construct(){return this.getDefaultOutputNode()}set needsUpdate(t){!0===t&&this.dispose()}get needsUpdate(){return this.source!==this._source}_exec(){return null===this.codeNode||(!0===this._needsOutputUpdate&&(this._value=this.call("main"),this._needsOutputUpdate=!1),this._output.value=this._value),this}_refresh(){this.needsUpdate=!0,this._exec(),this._output.refresh()}}export default ScriptableNode;export const scriptable=nodeProxy(ScriptableNode);addNodeElement("scriptable",scriptable),addNodeClass(ScriptableNode);