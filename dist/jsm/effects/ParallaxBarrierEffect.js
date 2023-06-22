import{LinearFilter,Mesh,NearestFilter,OrthographicCamera,PlaneGeometry,RGBAFormat,Scene,ShaderMaterial,StereoCamera,WebGLRenderTarget}from"three";class ParallaxBarrierEffect{constructor(e){const r=new OrthographicCamera(-1,1,1,-1,0,1),t=new Scene,a=new StereoCamera,i={minFilter:LinearFilter,magFilter:NearestFilter,format:RGBAFormat},n=new WebGLRenderTarget(512,512,i),o=new WebGLRenderTarget(512,512,i),l=new ShaderMaterial({uniforms:{mapLeft:{value:n.texture},mapRight:{value:o.texture}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = vec2( uv.x, uv.y );","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D mapLeft;","uniform sampler2D mapRight;","varying vec2 vUv;","void main() {","\tvec2 uv = vUv;","\tif ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {","\t\tgl_FragColor = texture2D( mapLeft, uv );","\t} else {","\t\tgl_FragColor = texture2D( mapRight, uv );","\t}","}"].join("\n")}),m=new Mesh(new PlaneGeometry(2,2),l);t.add(m),this.setSize=function(r,t){e.setSize(r,t);const a=e.getPixelRatio();n.setSize(r*a,t*a),o.setSize(r*a,t*a)},this.render=function(i,l){!0===i.matrixWorldAutoUpdate&&i.updateMatrixWorld(),null===l.parent&&!0===l.matrixWorldAutoUpdate&&l.updateMatrixWorld(),a.update(l),e.setRenderTarget(n),e.clear(),e.render(i,a.cameraL),e.setRenderTarget(o),e.clear(),e.render(i,a.cameraR),e.setRenderTarget(null),e.render(t,r)}}}export{ParallaxBarrierEffect};