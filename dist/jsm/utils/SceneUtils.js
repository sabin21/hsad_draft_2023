import{BufferAttribute,BufferGeometry,Color,Group,Matrix4,Mesh,Vector3}from"three";import{mergeGroups,deepCloneAttribute}from"./BufferGeometryUtils.js";const _color=new Color,_matrix=new Matrix4;function createMeshesFromInstancedMesh(e){const t=new Group,r=e.count,o=e.geometry,n=e.material;for(let i=0;i<r;i++){const r=new Mesh(o,n);e.getMatrixAt(i,r.matrix),r.matrix.decompose(r.position,r.quaternion,r.scale),t.add(r)}return t.copy(e),t.updateMatrixWorld(),t}function createMeshesFromMultiMaterialMesh(e){if(!1===Array.isArray(e.material))return console.warn("THREE.SceneUtils.createMeshesFromMultiMaterialMesh(): The given mesh has no multiple materials."),e;const t=new Group;t.copy(e);const r=mergeGroups(e.geometry),o=r.index,n=r.groups,i=Object.keys(r.attributes);for(let s=0;s<n.length;s++){const a=n[s],c=a.start,u=c+a.count,l=new BufferGeometry,m=e.material[a.materialIndex];for(let e=0;e<i.length;e++){const t=i[e],n=r.attributes[t],s=n.itemSize,m=a.count*s,f=new(0,n.array.constructor)(m),M=new BufferAttribute(f,s);for(let e=c,t=0;e<u;e++,t++){const r=o.getX(e);s>=1&&M.setX(t,n.getX(r)),s>=2&&M.setY(t,n.getY(r)),s>=3&&M.setZ(t,n.getZ(r)),s>=4&&M.setW(t,n.getW(r))}l.setAttribute(t,M)}const f=new Mesh(l,m);t.add(f)}return t}function createMultiMaterialObject(e,t){const r=new Group;for(let o=0,n=t.length;o<n;o++)r.add(new Mesh(e,t[o]));return r}function reduceVertices(e,t,r){let o=r;const n=new Vector3;return e.updateWorldMatrix(!0,!0),e.traverseVisible((e=>{const{geometry:r}=e;if(void 0!==r){const{position:i}=r.attributes;if(void 0!==i)for(let r=0,s=i.count;r<s;r++)e.isMesh?e.getVertexPosition(r,n):n.fromBufferAttribute(i,r),e.isSkinnedMesh||n.applyMatrix4(e.matrixWorld),o=t(o,n)}})),o}function sortInstancedMesh(e,t){const r=deepCloneAttribute(e.instanceMatrix),o=e.instanceColor?deepCloneAttribute(e.instanceColor):null,n=new Map;for(const t in e.geometry.attributes){const r=e.geometry.attributes[t];r.isInstancedBufferAttribute&&n.set(r,deepCloneAttribute(r))}const i=[];for(let t=0;t<e.count;t++)i.push(t);i.sort(t);for(let t=0;t<i.length;t++){const s=i[t];_matrix.fromArray(r.array,s*e.instanceMatrix.itemSize),_matrix.toArray(e.instanceMatrix.array,t*e.instanceMatrix.itemSize),e.instanceColor&&(_color.fromArray(o.array,s*e.instanceColor.itemSize),_color.toArray(e.instanceColor.array,t*e.instanceColor.itemSize));for(const r in e.geometry.attributes){const o=e.geometry.attributes[r];if(o.isInstancedBufferAttribute){const e=n.get(o);o.setX(t,e.getX(s)),o.itemSize>1&&o.setY(t,e.getY(s)),o.itemSize>2&&o.setZ(t,e.getZ(s)),o.itemSize>3&&o.setW(t,e.getW(s))}}}}export{createMeshesFromInstancedMesh,createMeshesFromMultiMaterialMesh,createMultiMaterialObject,reduceVertices,sortInstancedMesh};