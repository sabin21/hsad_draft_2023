import{DoubleSide,LinearFilter,Mesh,MeshBasicMaterial,OrthographicCamera,PlaneGeometry,Scene,ShaderMaterial,Texture,UniformsUtils}from"three";import{UnpackDepthRGBAShader}from"../shaders/UnpackDepthRGBAShader.js";class ShadowMapViewer{constructor(e){const t=this,i=void 0!==e.name&&""!==e.name;let n;const s=new OrthographicCamera(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,1,10);s.position.set(0,0,2);const h=new Scene,o=UnpackDepthRGBAShader,r=UniformsUtils.clone(o.uniforms),a=new ShaderMaterial({uniforms:r,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),d=new PlaneGeometry(256,256),w=new Mesh(d,a);let l,p;if(h.add(w),i){l=document.createElement("canvas");const t=l.getContext("2d");t.font="Bold 20px Arial";const i=t.measureText(e.name).width;l.width=i,l.height=25,t.font="Bold 20px Arial",t.fillStyle="rgba( 255, 0, 0, 1 )",t.fillText(e.name,0,20);const n=new Texture(l);n.magFilter=LinearFilter,n.minFilter=LinearFilter,n.needsUpdate=!0;const s=new MeshBasicMaterial({map:n,side:DoubleSide});s.transparent=!0;const o=new PlaneGeometry(l.width,l.height);p=new Mesh(o,s),h.add(p)}this.enabled=!0,this.size={width:256,height:256,set:function(e,i){this.width=e,this.height=i,w.scale.set(this.width/256,this.height/256,1),t.position.set(t.position.x,t.position.y)}},this.position={x:10,y:10,set:function(e,n){this.x=e,this.y=n;const s=t.size.width,h=t.size.height;w.position.set(-window.innerWidth/2+s/2+this.x,window.innerHeight/2-h/2-this.y,0),i&&p.position.set(w.position.x,w.position.y-t.size.height/2+l.height/2,0)}},this.render=function(t){this.enabled&&(r.tDiffuse.value=e.shadow.map.texture,n=t.autoClear,t.autoClear=!1,t.clearDepth(),t.render(h,s),t.autoClear=n)},this.updateForWindowResize=function(){this.enabled&&(s.left=window.innerWidth/-2,s.right=window.innerWidth/2,s.top=window.innerHeight/2,s.bottom=window.innerHeight/-2,s.updateProjectionMatrix(),this.update())},this.update=function(){this.position.set(this.position.x,this.position.y),this.size.set(this.size.width,this.size.height)},this.update()}}export{ShadowMapViewer};