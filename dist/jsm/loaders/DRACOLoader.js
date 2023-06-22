import{BufferAttribute,BufferGeometry,Color,FileLoader,Loader,LinearSRGBColorSpace,SRGBColorSpace}from"three";const _taskCache=new WeakMap;class DRACOLoader extends Loader{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,r,o){const s=new FileLoader(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,(e=>{this.parse(e,t,o)}),r,o)}parse(e,t,r){this.decodeDracoFile(e,t,null,null,SRGBColorSpace).catch(r)}decodeDracoFile(e,t,r,o,s=LinearSRGBColorSpace){const a={attributeIDs:r||this.defaultAttributeIDs,attributeTypes:o||this.defaultAttributeTypes,useUniqueIDs:!!r,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t)}decodeGeometry(e,t){const r=JSON.stringify(t);if(_taskCache.has(e)){const t=_taskCache.get(e);if(t.key===r)return t.promise;if(0===e.byteLength)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let o;const s=this.workerNextTaskID++,a=e.byteLength,i=this._getWorker(s,a).then((r=>(o=r,new Promise(((r,a)=>{o._callbacks[s]={resolve:r,reject:a},o.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))))).then((e=>this._createGeometry(e.geometry)));return i.catch((()=>!0)).then((()=>{o&&s&&this._releaseTask(o,s)})),_taskCache.set(e,{key:r,promise:i}),i}_createGeometry(e){const t=new BufferGeometry;e.index&&t.setIndex(new BufferAttribute(e.index.array,1));for(let r=0;r<e.attributes.length;r++){const o=e.attributes[r],s=o.name,a=o.array,i=o.itemSize,n=new BufferAttribute(a,i);"color"===s&&this._assignVertexColorSpace(n,o.vertexColorSpace),t.setAttribute(s,n)}return t}_assignVertexColorSpace(e,t){if(t!==SRGBColorSpace)return;const r=new Color;for(let t=0,o=e.count;t<o;t++)r.fromBufferAttribute(e,t).convertSRGBToLinear(),e.setXYZ(t,r.r,r.g,r.b)}_loadLibrary(e,t){const r=new FileLoader(this.manager);return r.setPath(this.decoderPath),r.setResponseType(t),r.setWithCredentials(this.withCredentials),new Promise(((t,o)=>{r.load(e,t,void 0,o)}))}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e="object"!=typeof WebAssembly||"js"===this.decoderConfig.type,t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then((t=>{const r=t[0];e||(this.decoderConfig.wasmBinary=t[1]);const o=DRACOWorker.toString(),s=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join("\n");this.workerSourceURL=URL.createObjectURL(new Blob([s]))})),this.decoderPending}_getWorker(e,t){return this._initDecoder().then((()=>{if(this.workerPool.length<this.workerLimit){const e=new Worker(this.workerSourceURL);e._callbacks={},e._taskCosts={},e._taskLoad=0,e.postMessage({type:"init",decoderConfig:this.decoderConfig}),e.onmessage=function(t){const r=t.data;switch(r.type){case"decode":e._callbacks[r.id].resolve(r);break;case"error":e._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(e)}else this.workerPool.sort((function(e,t){return e._taskLoad>t._taskLoad?-1:1}));const r=this.workerPool[this.workerPool.length-1];return r._taskCosts[e]=t,r._taskLoad+=t,r}))}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map((e=>e._taskLoad)))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,""!==this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),this}}function DRACOWorker(){let e,t;function r(e,t,r,o,s,a){const i=a.num_components(),n=r.num_points()*i,c=n*s.BYTES_PER_ELEMENT,d=function(e,t){switch(t){case Float32Array:return e.DT_FLOAT32;case Int8Array:return e.DT_INT8;case Int16Array:return e.DT_INT16;case Int32Array:return e.DT_INT32;case Uint8Array:return e.DT_UINT8;case Uint16Array:return e.DT_UINT16;case Uint32Array:return e.DT_UINT32}}(e,s),l=e._malloc(c);t.GetAttributeDataArrayForAllPoints(r,a,d,c,l);const u=new s(e.HEAPF32.buffer,l,n).slice();return e._free(l),{name:o,array:u,itemSize:i}}onmessage=function(o){const s=o.data;switch(s.type){case"init":e=s.decoderConfig,t=new Promise((function(t){e.onModuleLoaded=function(e){t({draco:e})},DracoDecoderModule(e)}));break;case"decode":const o=s.buffer,a=s.taskConfig;t.then((e=>{const t=e.draco,i=new t.Decoder;try{const e=function(e,t,o,s){const a=s.attributeIDs,i=s.attributeTypes;let n,c;const d=t.GetEncodedGeometryType(o);if(d===e.TRIANGULAR_MESH)n=new e.Mesh,c=t.DecodeArrayToMesh(o,o.byteLength,n);else{if(d!==e.POINT_CLOUD)throw new Error("THREE.DRACOLoader: Unexpected geometry type.");n=new e.PointCloud,c=t.DecodeArrayToPointCloud(o,o.byteLength,n)}if(!c.ok()||0===n.ptr)throw new Error("THREE.DRACOLoader: Decoding failed: "+c.error_msg());const l={index:null,attributes:[]};for(const o in a){const c=self[i[o]];let d,u;if(s.useUniqueIDs)u=a[o],d=t.GetAttributeByUniqueId(n,u);else{if(u=t.GetAttributeId(n,e[a[o]]),-1===u)continue;d=t.GetAttribute(n,u)}const h=r(e,t,n,o,c,d);"color"===o&&(h.vertexColorSpace=s.vertexColorSpace),l.attributes.push(h)}return d===e.TRIANGULAR_MESH&&(l.index=function(e,t,r){const o=3*r.num_faces(),s=4*o,a=e._malloc(s);t.GetTrianglesUInt32Array(r,s,a);const i=new Uint32Array(e.HEAPF32.buffer,a,o).slice();return e._free(a),{array:i,itemSize:1}}(e,t,n)),e.destroy(n),l}(t,i,new Int8Array(o),a),n=e.attributes.map((e=>e.array.buffer));e.index&&n.push(e.index.array.buffer),self.postMessage({type:"decode",id:s.id,geometry:e},n)}catch(e){console.error(e),self.postMessage({type:"error",id:s.id,error:e.message})}finally{t.destroy(i)}}))}}}export{DRACOLoader};