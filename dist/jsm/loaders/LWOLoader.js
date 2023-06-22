import{AddOperation,BackSide,BufferGeometry,ClampToEdgeWrapping,Color,DoubleSide,EquirectangularReflectionMapping,EquirectangularRefractionMapping,FileLoader,Float32BufferAttribute,FrontSide,LineBasicMaterial,LineSegments,Loader,Mesh,MeshPhongMaterial,MeshPhysicalMaterial,MeshStandardMaterial,MirroredRepeatWrapping,Points,PointsMaterial,RepeatWrapping,SRGBColorSpace,TextureLoader,Vector2}from"three";import{IFFParser}from"./lwo/IFFParser.js";let _lwoTree;class LWOLoader extends Loader{constructor(e,t={}){super(e),this.resourcePath=void 0!==t.resourcePath?t.resourcePath:""}load(e,t,a,r){const s=this,o=""===s.path?extractParentUrl(e,"Objects"):s.path,i=e.split(o).pop().split(".")[0],n=new FileLoader(this.manager);n.setPath(s.path),n.setResponseType("arraybuffer"),n.load(e,(function(a){try{t(s.parse(a,o,i))}catch(t){r?r(t):console.error(t),s.manager.itemError(e)}}),a,r)}parse(e,t,a){_lwoTree=(new IFFParser).parse(e);const r=new TextureLoader(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new LWOTreeParser(r).parse(a)}}class LWOTreeParser{constructor(e){this.textureLoader=e}parse(e){return this.materials=new MaterialParser(this.textureLoader).parse(),this.defaultLayerName=e,this.meshes=this.parseLayers(),{materials:this.materials,meshes:this.meshes}}parseLayers(){const e=[],t=[],a=new GeometryParser,r=this;return _lwoTree.layers.forEach((function(s){const o=a.parse(s.geometry,s),i=r.parseMesh(o,s);e[s.number]=i,-1===s.parent?t.push(i):e[s.parent].add(i)})),this.applyPivots(t),t}parseMesh(e,t){let a;const r=this.getMaterials(e.userData.matNames,t.geometry.type);return a="points"===t.geometry.type?new Points(e,r):"lines"===t.geometry.type?new LineSegments(e,r):new Mesh(e,r),t.name?a.name=t.name:a.name=this.defaultLayerName+"_layer_"+t.number,a.userData.pivot=t.pivot,a}applyPivots(e){e.forEach((function(e){e.traverse((function(e){const t=e.userData.pivot;if(e.position.x+=t[0],e.position.y+=t[1],e.position.z+=t[2],e.parent){const t=e.parent.userData.pivot;e.position.x-=t[0],e.position.y-=t[1],e.position.z-=t[2]}}))}))}getMaterials(e,t){const a=[],r=this;e.forEach((function(e,t){a[t]=r.getMaterialByName(e)})),"points"!==t&&"lines"!==t||a.forEach((function(e,r){const s={color:e.color};"points"===t?(s.size=.1,s.map=e.map,a[r]=new PointsMaterial(s)):"lines"===t&&(a[r]=new LineBasicMaterial(s))}));const s=a.filter(Boolean);return 1===s.length?s[0]:a}getMaterialByName(e){return this.materials.filter((function(t){return t.name===e}))[0]}}class MaterialParser{constructor(e){this.textureLoader=e}parse(){const e=[];this.textures={};for(const t in _lwoTree.materials)"LWO3"===_lwoTree.format?e.push(this.parseMaterial(_lwoTree.materials[t],t,_lwoTree.textures)):"LWO2"===_lwoTree.format&&e.push(this.parseMaterialLwo2(_lwoTree.materials[t],t,_lwoTree.textures));return e}parseMaterial(e,t,a){let r={name:t,side:this.getSide(e.attributes),flatShading:this.getSmooth(e.attributes)};const s=this.parseConnections(e.connections,e.nodes),o=this.parseTextureNodes(s.maps);this.parseAttributeImageMaps(s.attributes,a,o,e.maps);const i=this.parseAttributes(s.attributes,o);this.parseEnvMap(s,o,i),r=Object.assign(o,r),r=Object.assign(r,i);const n=this.getMaterialType(s.attributes);return n!==MeshPhongMaterial&&delete r.refractionRatio,new n(r)}parseMaterialLwo2(e,t){let a={name:t,side:this.getSide(e.attributes),flatShading:this.getSmooth(e.attributes)};const r=this.parseAttributes(e.attributes,{});return a=Object.assign(a,r),new MeshPhongMaterial(a)}getSide(e){if(!e.side)return BackSide;switch(e.side){case 0:case 1:return BackSide;case 2:return FrontSide;case 3:return DoubleSide}}getSmooth(e){return!e.smooth||!e.smooth}parseConnections(e,t){const a={maps:{}},r=e.inputName,s=e.inputNodeName,o=e.nodeName,i=this;return r.forEach((function(e,r){if("Material"===e){const e=i.getNodeByRefName(s[r],t);a.attributes=e.attributes,a.envMap=e.fileName,a.name=s[r]}})),o.forEach((function(e,o){e===a.name&&(a.maps[r[o]]=i.getNodeByRefName(s[o],t))})),a}getNodeByRefName(e,t){for(const a in t)if(t[a].refName===e)return t[a]}parseTextureNodes(e){const t={};for(const a in e){const r=e[a],s=r.fileName;if(!s)return;const o=this.loadTexture(s);switch(void 0!==r.widthWrappingMode&&(o.wrapS=this.getWrappingType(r.widthWrappingMode)),void 0!==r.heightWrappingMode&&(o.wrapT=this.getWrappingType(r.heightWrappingMode)),a){case"Color":t.map=o,t.map.colorSpace=SRGBColorSpace;break;case"Roughness":t.roughnessMap=o,t.roughness=1;break;case"Specular":t.specularMap=o,t.specularMap.colorSpace=SRGBColorSpace,t.specular=16777215;break;case"Luminous":t.emissiveMap=o,t.emissiveMap.colorSpace=SRGBColorSpace,t.emissive=8421504;break;case"Luminous Color":t.emissive=8421504;break;case"Metallic":t.metalnessMap=o,t.metalness=1;break;case"Transparency":case"Alpha":t.alphaMap=o,t.transparent=!0;break;case"Normal":t.normalMap=o,void 0!==r.amplitude&&(t.normalScale=new Vector2(r.amplitude,r.amplitude));break;case"Bump":t.bumpMap=o}}return t.roughnessMap&&t.specularMap&&delete t.specularMap,t}parseAttributeImageMaps(e,t,a){for(const r in e){const s=e[r];if(s.maps){const e=s.maps[0],o=this.getTexturePathByIndex(e.imageIndex,t);if(!o)return;const i=this.loadTexture(o);switch(void 0!==e.wrap&&(i.wrapS=this.getWrappingType(e.wrap.w)),void 0!==e.wrap&&(i.wrapT=this.getWrappingType(e.wrap.h)),r){case"Color":a.map=i,a.map.colorSpace=SRGBColorSpace;break;case"Diffuse":a.aoMap=i;break;case"Roughness":a.roughnessMap=i,a.roughness=1;break;case"Specular":a.specularMap=i,a.specularMap.colorSpace=SRGBColorSpace,a.specular=16777215;break;case"Luminosity":a.emissiveMap=i,a.emissiveMap.colorSpace=SRGBColorSpace,a.emissive=8421504;break;case"Metallic":a.metalnessMap=i,a.metalness=1;break;case"Transparency":case"Alpha":a.alphaMap=i,a.transparent=!0;break;case"Normal":a.normalMap=i;break;case"Bump":a.bumpMap=i}}}}parseAttributes(e,t){const a={};return e.Color&&!t.map?a.color=(new Color).fromArray(e.Color.value):a.color=new Color,e.Transparency&&0!==e.Transparency.value&&(a.opacity=1-e.Transparency.value,a.transparent=!0),e["Bump Height"]&&(a.bumpScale=.1*e["Bump Height"].value),this.parsePhysicalAttributes(a,e,t),this.parseStandardAttributes(a,e,t),this.parsePhongAttributes(a,e,t),a}parsePhysicalAttributes(e,t){t.Clearcoat&&t.Clearcoat.value>0&&(e.clearcoat=t.Clearcoat.value,t["Clearcoat Gloss"]&&(e.clearcoatRoughness=.5*(1-t["Clearcoat Gloss"].value)))}parseStandardAttributes(e,t,a){t.Luminous&&(e.emissiveIntensity=t.Luminous.value,t["Luminous Color"]&&!a.emissive?e.emissive=(new Color).fromArray(t["Luminous Color"].value):e.emissive=new Color(8421504)),t.Roughness&&!a.roughnessMap&&(e.roughness=t.Roughness.value),t.Metallic&&!a.metalnessMap&&(e.metalness=t.Metallic.value)}parsePhongAttributes(e,t,a){t["Refraction Index"]&&(e.refractionRatio=.98/t["Refraction Index"].value),t.Diffuse&&e.color.multiplyScalar(t.Diffuse.value),t.Reflection&&(e.reflectivity=t.Reflection.value,e.combine=AddOperation),t.Luminosity&&(e.emissiveIntensity=t.Luminosity.value,a.emissiveMap||a.map?e.emissive=new Color(8421504):e.emissive=e.color),t.Roughness||!t.Specular||a.specularMap||(t["Color Highlight"]?e.specular=(new Color).setScalar(t.Specular.value).lerp(e.color.clone().multiplyScalar(t.Specular.value),t["Color Highlight"].value):e.specular=(new Color).setScalar(t.Specular.value)),e.specular&&t.Glossiness&&(e.shininess=7+Math.pow(2,12*t.Glossiness.value+2))}parseEnvMap(e,t,a){if(e.envMap){const r=this.loadTexture(e.envMap);a.transparent&&a.opacity<.999?(r.mapping=EquirectangularRefractionMapping,void 0!==a.reflectivity&&(delete a.reflectivity,delete a.combine),void 0!==a.metalness&&(a.metalness=1),a.opacity=1):r.mapping=EquirectangularReflectionMapping,t.envMap=r}}getTexturePathByIndex(e){let t="";return _lwoTree.textures?(_lwoTree.textures.forEach((function(a){a.index===e&&(t=a.fileName)})),t):t}loadTexture(e){return e?this.textureLoader.load(e,void 0,void 0,(function(){console.warn("LWOLoader: non-standard resource hierarchy. Use `resourcePath` parameter to specify root content directory.")})):null}getWrappingType(e){switch(e){case 0:return console.warn('LWOLoader: "Reset" texture wrapping type is not supported in three.js'),ClampToEdgeWrapping;case 1:return RepeatWrapping;case 2:return MirroredRepeatWrapping;case 3:return ClampToEdgeWrapping}}getMaterialType(e){return e.Clearcoat&&e.Clearcoat.value>0?MeshPhysicalMaterial:e.Roughness?MeshStandardMaterial:MeshPhongMaterial}}class GeometryParser{parse(e,t){const a=new BufferGeometry;a.setAttribute("position",new Float32BufferAttribute(e.points,3));const r=this.splitIndices(e.vertexIndices,e.polygonDimensions);return a.setIndex(r),this.parseGroups(a,e),a.computeVertexNormals(),this.parseUVs(a,t,r),this.parseMorphTargets(a,t,r),a.translate(-t.pivot[0],-t.pivot[1],-t.pivot[2]),a}splitIndices(e,t){const a=[];let r=0;return t.forEach((function(t){if(t<4)for(let s=0;s<t;s++)a.push(e[r+s]);else if(4===t)a.push(e[r],e[r+1],e[r+2],e[r],e[r+2],e[r+3]);else if(t>4){for(let s=1;s<t-1;s++)a.push(e[r],e[r+s],e[r+s+1]);console.warn("LWOLoader: polygons with greater than 4 sides are not supported")}r+=t})),a}parseGroups(e,t){const a=_lwoTree.tags,r=[];let s=3;"lines"===t.type&&(s=2),"points"===t.type&&(s=1);const o=this.splitMaterialIndices(t.polygonDimensions,t.materialIndices);let i=0;const n={};let p,l,c=0,u=0;for(let t=0;t<o.length;t+=2){if(l=o[t+1],0===t&&(r[i]=a[l]),void 0===p&&(p=l),l!==p){let t;n[a[p]]?t=n[a[p]]:(t=i,n[a[p]]=i,r[i]=a[p],i++),e.addGroup(c,u,t),c+=u,p=l,u=0}u+=s}if(e.groups.length>0){let t;n[a[l]]?t=n[a[l]]:(t=i,n[a[l]]=i,r[i]=a[l]),e.addGroup(c,u,t)}e.userData.matNames=r}splitMaterialIndices(e,t){const a=[];return e.forEach((function(e,r){if(e<=3)a.push(t[2*r],t[2*r+1]);else if(4===e)a.push(t[2*r],t[2*r+1],t[2*r],t[2*r+1]);else for(let s=0;s<e-2;s++)a.push(t[2*r],t[2*r+1])})),a}parseUVs(e,t){const a=Array.from(Array(2*e.attributes.position.count),(function(){return 0}));for(const e in t.uvs){const r=t.uvs[e].uvs;t.uvs[e].uvIndices.forEach((function(e,t){a[2*e]=r[2*t],a[2*e+1]=r[2*t+1]}))}e.setAttribute("uv",new Float32BufferAttribute(a,2))}parseMorphTargets(e,t){let a=0;for(const r in t.morphTargets){const s=e.attributes.position.array.slice();e.morphAttributes.position||(e.morphAttributes.position=[]);const o=t.morphTargets[r].points,i=t.morphTargets[r].indices,n=t.morphTargets[r].type;i.forEach((function(e,t){"relative"===n?(s[3*e]+=o[3*t],s[3*e+1]+=o[3*t+1],s[3*e+2]+=o[3*t+2]):(s[3*e]=o[3*t],s[3*e+1]=o[3*t+1],s[3*e+2]=o[3*t+2])})),e.morphAttributes.position[a]=new Float32BufferAttribute(s,3),e.morphAttributes.position[a].name=r,a++}e.morphTargetsRelative=!1}}function extractParentUrl(e,t){const a=e.indexOf(t);return-1===a?"./":e.slice(0,a)}export{LWOLoader};