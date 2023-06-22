import{BufferAttribute,BufferGeometry,Color,FileLoader,Group,LineBasicMaterial,LineSegments,Loader,Matrix4,Mesh,MeshStandardMaterial,ShaderMaterial,SRGBColorSpace,UniformsLib,UniformsUtils,Vector3,Ray}from"three";const FINISH_TYPE_DEFAULT=0,FINISH_TYPE_CHROME=1,FINISH_TYPE_PEARLESCENT=2,FINISH_TYPE_RUBBER=3,FINISH_TYPE_MATTE_METALLIC=4,FINISH_TYPE_METAL=5,FILE_LOCATION_TRY_PARTS=0,FILE_LOCATION_TRY_P=1,FILE_LOCATION_TRY_MODELS=2,FILE_LOCATION_AS_IS=3,FILE_LOCATION_TRY_RELATIVE=4,FILE_LOCATION_TRY_ABSOLUTE=5,FILE_LOCATION_NOT_FOUND=6,MAIN_COLOUR_CODE="16",MAIN_EDGE_COLOUR_CODE="24",COLOR_SPACE_LDRAW=SRGBColorSpace,_tempVec0=new Vector3,_tempVec1=new Vector3;class LDrawConditionalLineMaterial extends ShaderMaterial{constructor(e){super({uniforms:UniformsUtils.merge([UniformsLib.fog,{diffuse:{value:new Color},opacity:{value:1}}]),vertexShader:"\n\t\t\t\tattribute vec3 control0;\n\t\t\t\tattribute vec3 control1;\n\t\t\t\tattribute vec3 direction;\n\t\t\t\tvarying float discardFlag;\n\n\t\t\t\t#include <common>\n\t\t\t\t#include <color_pars_vertex>\n\t\t\t\t#include <fog_pars_vertex>\n\t\t\t\t#include <logdepthbuf_pars_vertex>\n\t\t\t\t#include <clipping_planes_pars_vertex>\n\t\t\t\tvoid main() {\n\t\t\t\t\t#include <color_vertex>\n\n\t\t\t\t\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t\tgl_Position = projectionMatrix * mvPosition;\n\n\t\t\t\t\t// Transform the line segment ends and control points into camera clip space\n\t\t\t\t\tvec4 c0 = projectionMatrix * modelViewMatrix * vec4( control0, 1.0 );\n\t\t\t\t\tvec4 c1 = projectionMatrix * modelViewMatrix * vec4( control1, 1.0 );\n\t\t\t\t\tvec4 p0 = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t\tvec4 p1 = projectionMatrix * modelViewMatrix * vec4( position + direction, 1.0 );\n\n\t\t\t\t\tc0.xy /= c0.w;\n\t\t\t\t\tc1.xy /= c1.w;\n\t\t\t\t\tp0.xy /= p0.w;\n\t\t\t\t\tp1.xy /= p1.w;\n\n\t\t\t\t\t// Get the direction of the segment and an orthogonal vector\n\t\t\t\t\tvec2 dir = p1.xy - p0.xy;\n\t\t\t\t\tvec2 norm = vec2( -dir.y, dir.x );\n\n\t\t\t\t\t// Get control point directions from the line\n\t\t\t\t\tvec2 c0dir = c0.xy - p1.xy;\n\t\t\t\t\tvec2 c1dir = c1.xy - p1.xy;\n\n\t\t\t\t\t// If the vectors to the controls points are pointed in different directions away\n\t\t\t\t\t// from the line segment then the line should not be drawn.\n\t\t\t\t\tfloat d0 = dot( normalize( norm ), normalize( c0dir ) );\n\t\t\t\t\tfloat d1 = dot( normalize( norm ), normalize( c1dir ) );\n\t\t\t\t\tdiscardFlag = float( sign( d0 ) != sign( d1 ) );\n\n\t\t\t\t\t#include <logdepthbuf_vertex>\n\t\t\t\t\t#include <clipping_planes_vertex>\n\t\t\t\t\t#include <fog_vertex>\n\t\t\t\t}\n\t\t\t",fragmentShader:"\n\t\t\tuniform vec3 diffuse;\n\t\t\tuniform float opacity;\n\t\t\tvarying float discardFlag;\n\n\t\t\t#include <common>\n\t\t\t#include <color_pars_fragment>\n\t\t\t#include <fog_pars_fragment>\n\t\t\t#include <logdepthbuf_pars_fragment>\n\t\t\t#include <clipping_planes_pars_fragment>\n\t\t\tvoid main() {\n\n\t\t\t\tif ( discardFlag > 0.5 ) discard;\n\n\t\t\t\t#include <clipping_planes_fragment>\n\t\t\t\tvec3 outgoingLight = vec3( 0.0 );\n\t\t\t\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t\t\t\t#include <logdepthbuf_fragment>\n\t\t\t\t#include <color_fragment>\n\t\t\t\toutgoingLight = diffuseColor.rgb; // simple shader\n\t\t\t\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t\t\t\t#include <tonemapping_fragment>\n\t\t\t\t#include <encodings_fragment>\n\t\t\t\t#include <fog_fragment>\n\t\t\t\t#include <premultiplied_alpha_fragment>\n\t\t\t}\n\t\t\t"}),Object.defineProperties(this,{opacity:{get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},color:{get:function(){return this.uniforms.diffuse.value}}}),this.setValues(e),this.isLDrawConditionalLineMaterial=!0}}class ConditionalLineSegments extends LineSegments{constructor(e,t){super(e,t),this.isConditionalLine=!0}}function generateFaceNormals(e){for(let t=0,r=e.length;t<r;t++){const r=e[t],a=r.vertices,n=a[0],i=a[1],o=a[2];_tempVec0.subVectors(i,n),_tempVec1.subVectors(o,i),r.faceNormal=(new Vector3).crossVectors(_tempVec0,_tempVec1).normalize()}}const _ray=new Ray;function smoothNormals(e,t,r=!1){const a=100*(1+1e-10);function n(e){return`${~~(e.x*a)},${~~(e.y*a)},${~~(e.z*a)}`}function i(e,t){return`${n(e)}_${n(t)}`}function o(e,t,r){r.direction.subVectors(t,e).normalize();const a=e.dot(r.direction);return r.origin.copy(e).addScaledVector(r.direction,-a),r}function s(e){return i(e.origin,e.direction)}const l=new Set,c=new Map,d={},h=[];for(let e=0,a=t.length;e<a;e++){const a=t[e].vertices,n=a[0],d=a[1];if(l.add(i(n,d)),l.add(i(d,n)),r){const e=o(n,d,new Ray),t=s(e);if(!c.has(t)){o(d,n,e);const r=s(e),a={ray:e,distances:[]};c.set(t,a),c.set(r,a)}const r=c.get(t);let a=r.ray.direction.dot(n),i=r.ray.direction.dot(d);a>i&&([a,i]=[i,a]),r.distances.push(a,i)}}for(let t=0,a=e.length;t<a;t++){const a=e[t],n=a.vertices,h=n.length;for(let e=0;e<h;e++){const t=e,u=(e+1)%h,g=n[t],m=n[u],p=i(g,m);if(l.has(p))continue;if(r){o(g,m,_ray);const e=s(_ray);if(c.has(e)){const t=c.get(e),{ray:r,distances:a}=t;let n=r.direction.dot(g),i=r.direction.dot(m);n>i&&([n,i]=[i,n]);let o=!1;for(let e=0,t=a.length;e<t;e+=2)if(n>=a[e]&&i<=a[e+1]){o=!0;break}if(o)continue}}const f={index:t,tri:a};d[p]=f}}for(;;){let e=null;for(const t in d){e=d[t];break}if(null===e)break;const t=[e];for(;t.length>0;){const e=t.pop().tri,r=e.vertices,a=e.normals,n=e.faceNormal,o=r.length;for(let s=0;s<o;s++){const l=s,c=(s+1)%o,u=r[l],g=r[c];delete d[i(u,g)];const m=i(g,u),p=d[m];if(p){const r=p.tri,i=p.index,o=r.normals,s=o.length,u=r.faceNormal;if(Math.abs(r.faceNormal.dot(e.faceNormal))<.25)continue;m in d&&(t.push(p),delete d[m]);const g=(i+1)%s;a[l]&&o[g]&&a[l]!==o[g]&&(o[g].norm.add(a[l].norm),a[l].norm=o[g].norm);let f=a[l]||o[g];null===f&&(f={norm:new Vector3},h.push(f.norm)),null===a[l]&&(a[l]=f,f.norm.add(n)),null===o[g]&&(o[g]=f,f.norm.add(u)),a[c]&&o[i]&&a[c]!==o[i]&&(o[i].norm.add(a[c].norm),a[c].norm=o[i].norm);let C=a[c]||o[i];null===C&&(C={norm:new Vector3},h.push(C.norm)),null===a[c]&&(a[c]=C,C.norm.add(n)),null===o[i]&&(o[i]=C,C.norm.add(u))}}}}for(let e=0,t=h.length;e<t;e++)h[e].normalize()}function isPartType(e){return"Part"===e||"Unofficial_Part"===e}function isPrimitiveType(e){return/primitive/i.test(e)||"Subpart"===e}class LineParser{constructor(e,t){this.line=e,this.lineLength=e.length,this.currentCharIndex=0,this.currentChar=" ",this.lineNumber=t}seekNonSpace(){for(;this.currentCharIndex<this.lineLength;){if(this.currentChar=this.line.charAt(this.currentCharIndex)," "!==this.currentChar&&"\t"!==this.currentChar)return;this.currentCharIndex++}}getToken(){const e=this.currentCharIndex++;for(;this.currentCharIndex<this.lineLength&&(this.currentChar=this.line.charAt(this.currentCharIndex)," "!==this.currentChar&&"\t"!==this.currentChar);)this.currentCharIndex++;const t=this.currentCharIndex;return this.seekNonSpace(),this.line.substring(e,t)}getVector(){return new Vector3(parseFloat(this.getToken()),parseFloat(this.getToken()),parseFloat(this.getToken()))}getRemainingString(){return this.line.substring(this.currentCharIndex,this.lineLength)}isAtTheEnd(){return this.currentCharIndex>=this.lineLength}setToEnd(){this.currentCharIndex=this.lineLength}getLineNumberString(){return this.lineNumber>=0?" at line "+this.lineNumber:""}}class LDrawParsedCache{constructor(e){this.loader=e,this._cache={}}cloneResult(e){const t={};return t.faces=e.faces.map((e=>({colorCode:e.colorCode,material:e.material,vertices:e.vertices.map((e=>e.clone())),normals:e.normals.map((()=>null)),faceNormal:null}))),t.conditionalSegments=e.conditionalSegments.map((e=>({colorCode:e.colorCode,material:e.material,vertices:e.vertices.map((e=>e.clone())),controlPoints:e.controlPoints.map((e=>e.clone()))}))),t.lineSegments=e.lineSegments.map((e=>({colorCode:e.colorCode,material:e.material,vertices:e.vertices.map((e=>e.clone()))}))),t.type=e.type,t.category=e.category,t.keywords=e.keywords,t.author=e.author,t.subobjects=e.subobjects,t.fileName=e.fileName,t.totalFaces=e.totalFaces,t.startingBuildingStep=e.startingBuildingStep,t.materials=e.materials,t.group=null,t}async fetchData(e){let t=!1,r=0;for(;6!==r;){let a=e;switch(r){case 3:r+=1;break;case 0:a="parts/"+a,r+=1;break;case 1:a="p/"+a,r+=1;break;case 2:a="models/"+a,r+=1;break;case 4:a=e.substring(0,e.lastIndexOf("/")+1)+a,r+=1;break;case 5:t?r=6:(a=e=e.toLowerCase(),t=!0,r=0)}const n=this.loader,i=new FileLoader(n.manager);i.setPath(n.partsLibraryPath),i.setRequestHeader(n.requestHeader),i.setWithCredentials(n.withCredentials);try{return await i.loadAsync(a)}catch{continue}}throw new Error('LDrawLoader: Subobject "'+e+'" could not be loaded.')}parse(e,t=null){const r=this.loader,a=[],n=[],i=[],o=[],s={},l=e=>s[e]||null;let c="Model",d=null,h=null,u=null,g=0;-1!==e.indexOf("\r\n")&&(e=e.replace(/\r\n/g,"\n"));const m=e.split("\n"),p=m.length;let f=!1,C=null,L=null,M=!1,w=!0,y=!1,b=!0,_=!1;for(let e=0;e<p;e++){const t=m[e];if(0===t.length)continue;if(f){t.startsWith("0 FILE ")?(this.setData(C,L),C=t.substring(7),L=""):L+=t+"\n";continue}const p=new LineParser(t,e+1);if(p.seekNonSpace(),p.isAtTheEnd())continue;const E=p.getToken();let S,D,T,v,k,N,x,A,F,I,O;switch(E){case"0":const t=p.getToken();if(t)switch(t){case"!LDRAW_ORG":c=p.getToken();break;case"!COLOUR":S=r.parseColorMetaDirective(p),S?s[S.userData.code]=S:console.warn("LDrawLoader: Error parsing material"+p.getLineNumberString());break;case"!CATEGORY":d=p.getToken();break;case"!KEYWORDS":const t=p.getRemainingString().split(",");t.length>0&&(h||(h=[]),t.forEach((function(e){h.push(e.trim())})));break;case"FILE":e>0&&(f=!0,C=p.getRemainingString(),L="",M=!1,w=!0);break;case"BFC":for(;!p.isAtTheEnd();){const e=p.getToken();switch(e){case"CERTIFY":case"NOCERTIFY":M="CERTIFY"===e,w=!0;break;case"CW":case"CCW":w="CCW"===e;break;case"INVERTNEXT":y=!0;break;case"CLIP":case"NOCLIP":b="CLIP"===e;break;default:console.warn('THREE.LDrawLoader: BFC directive "'+e+'" is unknown.')}}break;case"STEP":_=!0;break;case"Author:":u=p.getToken()}break;case"1":D=p.getToken(),S=l(D);const m=parseFloat(p.getToken()),V=parseFloat(p.getToken()),P=parseFloat(p.getToken()),R=parseFloat(p.getToken()),B=parseFloat(p.getToken()),U=parseFloat(p.getToken()),W=parseFloat(p.getToken()),G=parseFloat(p.getToken()),z=parseFloat(p.getToken()),j=parseFloat(p.getToken()),H=parseFloat(p.getToken()),Y=parseFloat(p.getToken()),q=(new Matrix4).set(R,B,U,m,W,G,z,V,j,H,Y,P,0,0,0,1);let $=p.getRemainingString().trim().replace(/\\/g,"/");r.fileMap[$]?$=r.fileMap[$]:$.startsWith("s/")?$="parts/"+$:$.startsWith("48/")&&($="p/"+$),o.push({material:S,colorCode:D,matrix:q,fileName:$,inverted:y,startingBuildingStep:_}),_=!1,y=!1;break;case"2":D=p.getToken(),S=l(D),N=p.getVector(),x=p.getVector(),T={material:S,colorCode:D,vertices:[N,x]},n.push(T);break;case"5":D=p.getToken(),S=l(D),N=p.getVector(),x=p.getVector(),I=p.getVector(),O=p.getVector(),T={material:S,colorCode:D,vertices:[N,x],controlPoints:[I,O]},i.push(T);break;case"3":D=p.getToken(),S=l(D),v=w,k=!M||!b,!0===v?(N=p.getVector(),x=p.getVector(),A=p.getVector()):(A=p.getVector(),x=p.getVector(),N=p.getVector()),a.push({material:S,colorCode:D,faceNormal:null,vertices:[N,x,A],normals:[null,null,null]}),g++,!0===k&&(a.push({material:S,colorCode:D,faceNormal:null,vertices:[A,x,N],normals:[null,null,null]}),g++);break;case"4":D=p.getToken(),S=l(D),v=w,k=!M||!b,!0===v?(N=p.getVector(),x=p.getVector(),A=p.getVector(),F=p.getVector()):(F=p.getVector(),A=p.getVector(),x=p.getVector(),N=p.getVector()),a.push({material:S,colorCode:D,faceNormal:null,vertices:[N,x,A,F],normals:[null,null,null,null]}),g+=2,!0===k&&(a.push({material:S,colorCode:D,faceNormal:null,vertices:[F,A,x,N],normals:[null,null,null,null]}),g+=2);break;default:throw new Error('LDrawLoader: Unknown line type "'+E+'"'+p.getLineNumberString()+".")}}return f&&this.setData(C,L),{faces:a,conditionalSegments:i,lineSegments:n,type:c,category:d,keywords:h,author:u,subobjects:o,totalFaces:g,startingBuildingStep:_,materials:s,fileName:t,group:null}}getData(e,t=!0){const r=e.toLowerCase(),a=this._cache[r];return null===a||a instanceof Promise?null:t?this.cloneResult(a):a}async ensureDataLoaded(e){const t=e.toLowerCase();t in this._cache||(this._cache[t]=this.fetchData(e).then((r=>{const a=this.parse(r,e);return this._cache[t]=a,a}))),await this._cache[t]}setData(e,t){const r=e.toLowerCase();this._cache[r]=this.parse(t,e)}}function getMaterialFromCode(e,t,r,a){return(!a&&"16"===e||a&&"24"===e)&&(e=t),r[e]||null}class LDrawPartsGeometryCache{constructor(e){this.loader=e,this.parseCache=new LDrawParsedCache(e),this._cache={}}async processIntoMesh(e){const t=this.loader,r=this.parseCache,a=new Set,n=async(e,i=null)=>{const o=e.subobjects,s=[];for(let e=0,t=o.length;e<t;e++){const t=o[e],a=r.ensureDataLoaded(t.fileName).then((()=>isPrimitiveType(r.getData(t.fileName,!1).type)?n(r.getData(t.fileName),t):this.loadModel(t.fileName).catch((e=>(console.warn(e),null)))));s.push(a)}const l=new Group;l.userData.category=e.category,l.userData.keywords=e.keywords,l.userData.author=e.author,l.userData.type=e.type,l.userData.fileName=e.fileName,e.group=l;const c=await Promise.all(s);for(let r=0,n=c.length;r<n;r++){const n=e.subobjects[r],i=c[r];if(null===i)continue;if(i.isGroup){const r=i;n.matrix.decompose(r.position,r.quaternion,r.scale),r.userData.startingBuildingStep=n.startingBuildingStep,r.name=n.fileName,t.applyMaterialsToMesh(r,n.colorCode,e.materials),r.userData.colorCode=n.colorCode,l.add(r);continue}i.group.children.length&&l.add(i.group);const o=e.lineSegments,s=e.conditionalSegments,d=e.faces,h=i.lineSegments,u=i.conditionalSegments,g=i.faces,m=n.matrix,p=n.inverted,f=m.determinant()<0,C=n.colorCode,L="16"===C?"24":C;for(let t=0,r=h.length;t<r;t++){const r=h[t],a=r.vertices;a[0].applyMatrix4(m),a[1].applyMatrix4(m),r.colorCode="24"===r.colorCode?L:r.colorCode,r.material=r.material||getMaterialFromCode(r.colorCode,r.colorCode,e.materials,!0),o.push(r)}for(let t=0,r=u.length;t<r;t++){const r=u[t],a=r.vertices,n=r.controlPoints;a[0].applyMatrix4(m),a[1].applyMatrix4(m),n[0].applyMatrix4(m),n[1].applyMatrix4(m),r.colorCode="24"===r.colorCode?L:r.colorCode,r.material=r.material||getMaterialFromCode(r.colorCode,r.colorCode,e.materials,!0),s.push(r)}for(let t=0,r=g.length;t<r;t++){const r=g[t],n=r.vertices;for(let e=0,t=n.length;e<t;e++)n[e].applyMatrix4(m);r.colorCode="16"===r.colorCode?C:r.colorCode,r.material=r.material||getMaterialFromCode(r.colorCode,C,e.materials,!1),a.add(r.colorCode),f!==p&&n.reverse(),d.push(r)}e.totalFaces+=i.totalFaces}return i&&(t.applyMaterialsToMesh(l,i.colorCode,e.materials),l.userData.colorCode=i.colorCode),e};for(let t=0,r=e.faces;t<r;t++)a.add(e.faces[t].colorCode);if(await n(e),t.smoothNormals){const t=a.size>1;generateFaceNormals(e.faces),smoothNormals(e.faces,e.lineSegments,t)}const i=e.group;return e.faces.length>0&&i.add(createObject(e.faces,3,!1,e.totalFaces)),e.lineSegments.length>0&&i.add(createObject(e.lineSegments,2)),e.conditionalSegments.length>0&&i.add(createObject(e.conditionalSegments,2,!0)),i}hasCachedModel(e){return null!==e&&e.toLowerCase()in this._cache}async getCachedModel(e){if(null!==e&&this.hasCachedModel(e)){const t=e.toLowerCase();return(await this._cache[t]).clone()}return null}async loadModel(e){const t=this.parseCache,r=e.toLowerCase();if(this.hasCachedModel(e))return this.getCachedModel(e);{await t.ensureDataLoaded(e);const a=t.getData(e),n=this.processIntoMesh(a);return this.hasCachedModel(e)?this.getCachedModel(e):(isPartType(a.type)&&(this._cache[r]=n),(await n).clone())}}async parseModel(e){const t=this.parseCache.parse(e);return isPartType(t.type)&&this.hasCachedModel(t.fileName)?this.getCachedModel(t.fileName):this.processIntoMesh(t)}}function sortByMaterial(e,t){return e.colorCode===t.colorCode?0:e.colorCode<t.colorCode?-1:1}function createObject(e,t,r=!1,a=null){e.sort(sortByMaterial),null===a&&(a=e.length);const n=new Float32Array(t*a*3),i=3===t?new Float32Array(t*a*3):null,o=[],s=new Array(6),l=new BufferGeometry;let c=null,d=0,h=0,u=0;for(let a=0,g=e.length;a<g;a++){const g=e[a];let m=g.vertices;4===m.length&&(s[0]=m[0],s[1]=m[1],s[2]=m[2],s[3]=m[0],s[4]=m[2],s[5]=m[3],m=s);for(let e=0,t=m.length;e<t;e++){const t=m[e],r=u+3*e;n[r+0]=t.x,n[r+1]=t.y,n[r+2]=t.z}if(3===t){if(!g.faceNormal){const e=m[0],t=m[1],r=m[2];_tempVec0.subVectors(t,e),_tempVec1.subVectors(r,t),g.faceNormal=(new Vector3).crossVectors(_tempVec0,_tempVec1).normalize()}let e=g.normals;4===e.length&&(s[0]=e[0],s[1]=e[1],s[2]=e[2],s[3]=e[0],s[4]=e[2],s[5]=e[3],e=s);for(let t=0,r=e.length;t<r;t++){let r=g.faceNormal;e[t]&&(r=e[t].norm);const a=u+3*t;i[a+0]=r.x,i[a+1]=r.y,i[a+2]=r.z}}if(c!==g.colorCode){null!==c&&l.addGroup(d,h,o.length-1);const e=g.material;null!==e?3===t?o.push(e):2===t&&(r?o.push(e.userData.edgeMaterial.userData.conditionalEdgeMaterial):o.push(e.userData.edgeMaterial)):o.push(g.colorCode),c=g.colorCode,d=u/3,h=m.length}else h+=m.length;u+=3*m.length}h>0&&l.addGroup(d,1/0,o.length-1),l.setAttribute("position",new BufferAttribute(n,3)),null!==i&&l.setAttribute("normal",new BufferAttribute(i,3));let g=null;if(2===t?g=r?new ConditionalLineSegments(l,1===o.length?o[0]:o):new LineSegments(l,1===o.length?o[0]:o):3===t&&(g=new Mesh(l,1===o.length?o[0]:o)),r){g.isConditionalLine=!0;const t=new Float32Array(3*e.length*2),r=new Float32Array(3*e.length*2),a=new Float32Array(3*e.length*2);for(let n=0,i=e.length;n<i;n++){const i=e[n],o=i.vertices,s=i.controlPoints,l=s[0],c=s[1],d=o[0],h=o[1],u=3*n*2;t[u+0]=l.x,t[u+1]=l.y,t[u+2]=l.z,t[u+3]=l.x,t[u+4]=l.y,t[u+5]=l.z,r[u+0]=c.x,r[u+1]=c.y,r[u+2]=c.z,r[u+3]=c.x,r[u+4]=c.y,r[u+5]=c.z,a[u+0]=h.x-d.x,a[u+1]=h.y-d.y,a[u+2]=h.z-d.z,a[u+3]=h.x-d.x,a[u+4]=h.y-d.y,a[u+5]=h.z-d.z}l.setAttribute("control0",new BufferAttribute(t,3,!1)),l.setAttribute("control1",new BufferAttribute(r,3,!1)),l.setAttribute("direction",new BufferAttribute(a,3,!1))}return g}class LDrawLoader extends Loader{constructor(e){super(e),this.materials=[],this.materialLibrary={},this.partsCache=new LDrawPartsGeometryCache(this),this.fileMap={},this.setMaterials([]),this.smoothNormals=!0,this.partsLibraryPath="",this.missingColorMaterial=new MeshStandardMaterial({color:16711935,roughness:.3,metalness:0}),this.missingColorMaterial.name="Missing material",this.missingEdgeColorMaterial=new LineBasicMaterial({color:16711935}),this.missingEdgeColorMaterial.name="Missing material - Edge",this.missingConditionalEdgeColorMaterial=new LDrawConditionalLineMaterial({fog:!0,color:16711935}),this.missingConditionalEdgeColorMaterial.name="Missing material - Conditional Edge",this.missingColorMaterial.userData.edgeMaterial=this.missingEdgeColorMaterial,this.missingEdgeColorMaterial.userData.conditionalEdgeMaterial=this.missingConditionalEdgeColorMaterial}setPartsLibraryPath(e){return this.partsLibraryPath=e,this}async preloadMaterials(e){const t=new FileLoader(this.manager);t.setPath(this.path),t.setRequestHeader(this.requestHeader),t.setWithCredentials(this.withCredentials);const r=/^0 !COLOUR/,a=(await t.loadAsync(e)).split(/[\n\r]/g),n=[];for(let e=0,t=a.length;e<t;e++){const t=a[e];if(r.test(t)){const e=t.replace(r,""),a=this.parseColorMetaDirective(new LineParser(e));n.push(a)}}this.setMaterials(n)}load(e,t,r,a){const n=new FileLoader(this.manager);n.setPath(this.path),n.setRequestHeader(this.requestHeader),n.setWithCredentials(this.withCredentials),n.load(e,(r=>{this.partsCache.parseModel(r,this.materialLibrary).then((r=>{this.applyMaterialsToMesh(r,"16",this.materialLibrary,!0),this.computeBuildingSteps(r),r.userData.fileName=e,t(r)})).catch(a)}),r,a)}parse(e,t){this.partsCache.parseModel(e,this.materialLibrary).then((e=>{this.applyMaterialsToMesh(e,"16",this.materialLibrary,!0),this.computeBuildingSteps(e),e.userData.fileName="",t(e)}))}setMaterials(e){this.materialLibrary={},this.materials=[];for(let t=0,r=e.length;t<r;t++)this.addMaterial(e[t]);return this.addMaterial(this.parseColorMetaDirective(new LineParser("Main_Colour CODE 16 VALUE #FF8080 EDGE #333333"))),this.addMaterial(this.parseColorMetaDirective(new LineParser("Edge_Colour CODE 24 VALUE #A0A0A0 EDGE #333333"))),this}setFileMap(e){return this.fileMap=e,this}addMaterial(e){const t=this.materialLibrary;return t[e.userData.code]||(this.materials.push(e),t[e.userData.code]=e),this}getMaterial(e){if(e.startsWith("0x2")){const t=e.substring(3);return this.parseColorMetaDirective(new LineParser("Direct_Color_"+t+" CODE -1 VALUE #"+t+" EDGE #"+t))}return this.materialLibrary[e]||null}applyMaterialsToMesh(e,t,r,a=!1){const n=this,i="16"===t;function o(e,o){if(i&&!(o in r)&&!a)return o;const s=e.isLineSegments||e.isConditionalLine;(!s&&"16"===o||s&&"24"===o)&&(o=t);let l=null;if(o in r)l=r[o];else{if(!a)return o;l=n.getMaterial(o),null===l&&(console.warn(`LDrawLoader: Material properties for code ${o} not available.`),l=n.missingColorMaterial)}return e.isLineSegments&&(l=l.userData.edgeMaterial,e.isConditionalLine&&(l=l.userData.conditionalEdgeMaterial)),l}e.traverse((e=>{if(e.isMesh||e.isLineSegments)if(Array.isArray(e.material))for(let t=0,r=e.material.length;t<r;t++)e.material[t].isMaterial||(e.material[t]=o(e,e.material[t]));else e.material.isMaterial||(e.material=o(e,e.material))}))}getMainMaterial(){return this.getMaterial("16")}getMainEdgeMaterial(){const e=this.getMaterial("24");return e?e.userData.edgeMaterial:null}parseColorMetaDirective(e){let t=null,r="#FF00FF",a="#FF00FF",n=1,i=!1,o=0,s=0,l=null;const c=e.getToken();if(!c)throw new Error('LDrawLoader: Material name was expected after "!COLOUR tag'+e.getLineNumberString()+".");let d=null;for(;d=e.getToken(),d;)if(!u(d))switch(d.toUpperCase()){case"CODE":t=e.getToken();break;case"VALUE":if(r=e.getToken(),r.startsWith("0x"))r="#"+r.substring(2);else if(!r.startsWith("#"))throw new Error("LDrawLoader: Invalid color while parsing material"+e.getLineNumberString()+".");break;case"EDGE":if(a=e.getToken(),a.startsWith("0x"))a="#"+a.substring(2);else if(!a.startsWith("#")){if(l=this.getMaterial(a),!l)throw new Error("LDrawLoader: Invalid edge color while parsing material"+e.getLineNumberString()+".");l=l.userData.edgeMaterial}break;case"ALPHA":if(n=parseInt(e.getToken()),isNaN(n))throw new Error("LDrawLoader: Invalid alpha value in material definition"+e.getLineNumberString()+".");n=Math.max(0,Math.min(1,n/255)),n<1&&(i=!0);break;case"LUMINANCE":if(!u(e.getToken()))throw new Error("LDrawLoader: Invalid luminance value in material definition"+LineParser.getLineNumberString()+".");break;case"CHROME":s=1;break;case"PEARLESCENT":s=2;break;case"RUBBER":s=3;break;case"MATTE_METALLIC":s=4;break;case"METAL":s=5;break;case"MATERIAL":e.setToEnd();break;default:throw new Error('LDrawLoader: Unknown token "'+d+'" while parsing material'+e.getLineNumberString()+".")}let h=null;switch(s){case 0:h=new MeshStandardMaterial({roughness:.3,metalness:0});break;case 2:h=new MeshStandardMaterial({roughness:.3,metalness:.25});break;case 1:h=new MeshStandardMaterial({roughness:0,metalness:1});break;case 3:h=new MeshStandardMaterial({roughness:.9,metalness:0});break;case 4:h=new MeshStandardMaterial({roughness:.8,metalness:.4});break;case 5:h=new MeshStandardMaterial({roughness:.2,metalness:.85})}return h.color.setStyle(r,COLOR_SPACE_LDRAW),h.transparent=i,h.premultipliedAlpha=!0,h.opacity=n,h.depthWrite=!i,h.polygonOffset=!0,h.polygonOffsetFactor=1,0!==o&&h.emissive.setStyle(r,COLOR_SPACE_LDRAW).multiplyScalar(o),l||(l=new LineBasicMaterial({color:(new Color).setStyle(a,COLOR_SPACE_LDRAW),transparent:i,opacity:n,depthWrite:!i}),l.color,l.userData.code=t,l.name=c+" - Edge",l.userData.conditionalEdgeMaterial=new LDrawConditionalLineMaterial({fog:!0,transparent:i,depthWrite:!i,color:(new Color).setStyle(a,COLOR_SPACE_LDRAW),opacity:n}),l.userData.conditionalEdgeMaterial.userData.code=t,l.userData.conditionalEdgeMaterial.name=c+" - Conditional Edge"),h.userData.code=t,h.name=c,h.userData.edgeMaterial=l,this.addMaterial(h),h;function u(e){let t;return t=e.startsWith("LUMINANCE")?parseInt(e.substring(9)):parseInt(e),!isNaN(t)&&(o=Math.max(0,Math.min(1,t/255)),!0)}}computeBuildingSteps(e){let t=0;e.traverse((e=>{e.isGroup&&(e.userData.startingBuildingStep&&t++,e.userData.buildingStep=t)})),e.userData.numBuildingSteps=t+1}}export{LDrawLoader};