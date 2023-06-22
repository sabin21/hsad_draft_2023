import{Camera,ClampToEdgeWrapping,DataTexture,FloatType,LinearSRGBColorSpace,Mesh,NearestFilter,NoToneMapping,PlaneGeometry,RGBAFormat,Scene,ShaderMaterial,WebGLRenderTarget}from"three";class GPUComputationRenderer{constructor(e,t,r){this.variables=[],this.currentTextureIndex=0;let n=FloatType;const a=new Scene,i=new Camera;i.position.z=1;const s={passThruTexture:{value:null}},o=d("uniform sampler2D passThruTexture;\n\nvoid main() {\n\n\tvec2 uv = gl_FragCoord.xy / resolution.xy;\n\n\tgl_FragColor = texture2D( passThruTexture, uv );\n\n}\n",s),l=new Mesh(new PlaneGeometry(2,2),o);function u(r){r.defines.resolution="vec2( "+e.toFixed(1)+", "+t.toFixed(1)+" )"}function d(e,t){const r=new ShaderMaterial({uniforms:t=t||{},vertexShader:"void main()\t{\n\n\tgl_Position = vec4( position, 1.0 );\n\n}\n",fragmentShader:e});return u(r),r}a.add(l),this.setDataType=function(e){return n=e,this},this.addVariable=function(e,t,r){const n={name:e,initialValueTexture:r,material:this.createShaderMaterial(t),dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:NearestFilter,magFilter:NearestFilter};return this.variables.push(n),n},this.setVariableDependencies=function(e,t){e.dependencies=t},this.init=function(){if(!1===r.capabilities.isWebGL2&&!1===r.extensions.has("OES_texture_float"))return"No OES_texture_float support for float textures.";if(0===r.capabilities.maxVertexTextures)return"No support for vertex shader textures.";for(let r=0;r<this.variables.length;r++){const n=this.variables[r];n.renderTargets[0]=this.createRenderTarget(e,t,n.wrapS,n.wrapT,n.minFilter,n.magFilter),n.renderTargets[1]=this.createRenderTarget(e,t,n.wrapS,n.wrapT,n.minFilter,n.magFilter),this.renderTexture(n.initialValueTexture,n.renderTargets[0]),this.renderTexture(n.initialValueTexture,n.renderTargets[1]);const a=n.material,i=a.uniforms;if(null!==n.dependencies)for(let e=0;e<n.dependencies.length;e++){const t=n.dependencies[e];if(t.name!==n.name){let e=!1;for(let r=0;r<this.variables.length;r++)if(t.name===this.variables[r].name){e=!0;break}if(!e)return"Variable dependency not found. Variable="+n.name+", dependency="+t.name}i[t.name]={value:null},a.fragmentShader="\nuniform sampler2D "+t.name+";\n"+a.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const e=this.currentTextureIndex,t=0===this.currentTextureIndex?1:0;for(let r=0,n=this.variables.length;r<n;r++){const n=this.variables[r];if(null!==n.dependencies){const t=n.material.uniforms;for(let r=0,a=n.dependencies.length;r<a;r++){const a=n.dependencies[r];t[a.name].value=a.renderTargets[e].texture}}this.doRenderTarget(n.material,n.renderTargets[t])}this.currentTextureIndex=t},this.getCurrentRenderTarget=function(e){return e.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(e){return e.renderTargets[0===this.currentTextureIndex?1:0]},this.dispose=function(){l.geometry.dispose(),l.material.dispose();const e=this.variables;for(let t=0;t<e.length;t++){const r=e[t];r.initialValueTexture&&r.initialValueTexture.dispose();const n=r.renderTargets;for(let e=0;e<n.length;e++)n[e].dispose()}},this.addResolutionDefine=u,this.createShaderMaterial=d,this.createRenderTarget=function(r,a,i,s,o,l){return new WebGLRenderTarget(r=r||e,a=a||t,{wrapS:i=i||ClampToEdgeWrapping,wrapT:s=s||ClampToEdgeWrapping,minFilter:o=o||NearestFilter,magFilter:l=l||NearestFilter,format:RGBAFormat,type:n,depthBuffer:!1})},this.createTexture=function(){const r=new Float32Array(e*t*4),n=new DataTexture(r,e,t,RGBAFormat,FloatType);return n.needsUpdate=!0,n},this.renderTexture=function(e,t){s.passThruTexture.value=e,this.doRenderTarget(o,t),s.passThruTexture.value=null},this.doRenderTarget=function(e,t){const n=r.getRenderTarget(),s=r.xr.enabled,u=r.shadowMap.autoUpdate,d=r.outputColorSpace,p=r.toneMapping;r.xr.enabled=!1,r.shadowMap.autoUpdate=!1,r.outputColorSpace=LinearSRGBColorSpace,r.toneMapping=NoToneMapping,l.material=e,r.setRenderTarget(t),r.render(a,i),l.material=o,r.xr.enabled=s,r.shadowMap.autoUpdate=u,r.outputColorSpace=d,r.toneMapping=p,r.setRenderTarget(n)}}}export{GPUComputationRenderer};