import{Box3,Float32BufferAttribute,InstancedBufferGeometry,InstancedInterleavedBuffer,InterleavedBufferAttribute,Sphere,Vector3,WireframeGeometry}from"three";const _box=new Box3,_vector=new Vector3;class LineSegmentsGeometry extends InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(t){const e=this.attributes.instanceStart,r=this.attributes.instanceEnd;return void 0!==e&&(e.applyMatrix4(t),r.applyMatrix4(t),e.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const r=new InstancedInterleavedBuffer(e,6,1);return this.setAttribute("instanceStart",new InterleavedBufferAttribute(r,3,0)),this.setAttribute("instanceEnd",new InterleavedBufferAttribute(r,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const r=new InstancedInterleavedBuffer(e,6,1);return this.setAttribute("instanceColorStart",new InterleavedBufferAttribute(r,3,0)),this.setAttribute("instanceColorEnd",new InterleavedBufferAttribute(r,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new WireframeGeometry(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Box3);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;void 0!==t&&void 0!==e&&(this.boundingBox.setFromBufferAttribute(t),_box.setFromBufferAttribute(e),this.boundingBox.union(_box))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new Sphere),null===this.boundingBox&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(void 0!==t&&void 0!==e){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let n=0;for(let i=0,o=t.count;i<o;i++)_vector.fromBufferAttribute(t,i),n=Math.max(n,r.distanceToSquared(_vector)),_vector.fromBufferAttribute(e,i),n=Math.max(n,r.distanceToSquared(_vector));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}export{LineSegmentsGeometry};