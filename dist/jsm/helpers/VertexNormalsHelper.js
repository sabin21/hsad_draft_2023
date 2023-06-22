import{BufferGeometry,Float32BufferAttribute,LineSegments,LineBasicMaterial,Matrix3,Vector3}from"three";const _v1=new Vector3,_v2=new Vector3,_normalMatrix=new Matrix3;class VertexNormalsHelper extends LineSegments{constructor(t,e=1,r=16711680){const i=new BufferGeometry,o=t.geometry.attributes.normal.count,a=new Float32BufferAttribute(2*o*3,3);i.setAttribute("position",a),super(i,new LineBasicMaterial({color:r,toneMapped:!1})),this.object=t,this.size=e,this.type="VertexNormalsHelper",this.matrixAutoUpdate=!1,this.update()}update(){this.object.updateMatrixWorld(!0),_normalMatrix.getNormalMatrix(this.object.matrixWorld);const t=this.object.matrixWorld,e=this.geometry.attributes.position,r=this.object.geometry;if(r){const i=r.attributes.position,o=r.attributes.normal;let a=0;for(let r=0,s=i.count;r<s;r++)_v1.fromBufferAttribute(i,r).applyMatrix4(t),_v2.fromBufferAttribute(o,r),_v2.applyMatrix3(_normalMatrix).normalize().multiplyScalar(this.size).add(_v1),e.setXYZ(a,_v1.x,_v1.y,_v1.z),a+=1,e.setXYZ(a,_v2.x,_v2.y,_v2.z),a+=1}e.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}export{VertexNormalsHelper};