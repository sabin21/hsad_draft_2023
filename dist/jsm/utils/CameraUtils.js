import{MathUtils,Quaternion,Vector3}from"three";const _va=new Vector3,_vb=new Vector3,_vc=new Vector3,_vr=new Vector3,_vu=new Vector3,_vn=new Vector3,_vec=new Vector3,_quat=new Quaternion;function frameCorners(t,e,o,r,n=!1){const c=e,_=o,v=r,a=t.position,s=t.near,i=t.far;_vr.copy(_).sub(c).normalize(),_vu.copy(v).sub(c).normalize(),_vn.crossVectors(_vr,_vu).normalize(),_va.copy(c).sub(a),_vb.copy(_).sub(a),_vc.copy(v).sub(a);const u=-_va.dot(_vn),p=_vr.dot(_va)*s/u,l=_vr.dot(_vb)*s/u,m=_vu.dot(_va)*s/u,V=_vu.dot(_vc)*s/u;_quat.setFromUnitVectors(_vec.set(0,1,0),_vu),t.quaternion.setFromUnitVectors(_vec.set(0,0,1).applyQuaternion(_quat),_vn).multiply(_quat),t.projectionMatrix.set(2*s/(l-p),0,(l+p)/(l-p),0,0,2*s/(V-m),(V+m)/(V-m),0,0,0,(i+s)/(s-i),2*i*s/(s-i),0,0,-1,0),t.projectionMatrixInverse.copy(t.projectionMatrix).invert(),n&&(t.fov=MathUtils.RAD2DEG/Math.min(1,t.aspect)*Math.atan((_vec.copy(_).sub(c).length()+_vec.copy(v).sub(c).length())/_va.length()))}export{frameCorners};