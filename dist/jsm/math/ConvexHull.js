import{Line3,Plane,Triangle,Vector3}from"three";const Visible=0,Deleted=1,_v1=new Vector3,_line3=new Line3,_plane=new Plane,_closestPoint=new Vector3,_triangle=new Triangle;class ConvexHull{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new VertexList,this.unassigned=new VertexList,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new VertexNode(t[e]));this.compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse((function(t){const n=t.geometry;if(void 0!==n){const i=n.attributes.position;if(void 0!==i)for(let n=0,s=i.count;n<s;n++){const s=new Vector3;s.fromBufferAttribute(i,n).applyMatrix4(t.matrixWorld),e.push(s)}}})),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,i=e.length;n<i;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let i=-1/0,s=1/0;for(let e=0,r=n.length;e<r;e++){const r=n[e],o=r.distanceToPoint(t.origin),a=r.normal.dot(t.direction);if(o>0&&a>=0)return null;const l=0!==a?-o/a:0;if(!(l<=0)&&(a>0?s=Math.min(l,s):i=Math.max(l,i),i>s))return null}return i!==-1/0?t.at(i,e):t.at(s,e),e}intersectsRay(t){return null!==this.intersectRay(t,_v1)}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(t,e){return t.face=e,null===e.outside?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}removeVertexFromFace(t,e){return t===e.outside&&(null!==t.next&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}removeAllVerticesFromFace(t){if(null!==t.outside){const e=t.outside;let n=t.outside;for(;null!==n.next&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}deleteFaceVertices(t,e){const n=this.removeAllVerticesFromFace(t);if(void 0!==n)if(void 0===e)this.unassigned.appendChain(n);else{let t=n;do{const n=t.next;e.distanceToPoint(t.point)>this.tolerance?this.addVertexToFace(t,e):this.unassigned.append(t),t=n}while(null!==t)}return this}resolveUnassignedPoints(t){if(!1===this.unassigned.isEmpty()){let e=this.unassigned.first();do{const n=e.next;let i=this.tolerance,s=null;for(let n=0;n<t.length;n++){const r=t[n];if(0===r.mark){const t=r.distanceToPoint(e.point);if(t>i&&(i=t,s=r),i>1e3*this.tolerance)break}}null!==s&&this.addVertexToFace(e,s),e=n}while(null!==e)}return this}computeExtremes(){const t=new Vector3,e=new Vector3,n=[],i=[];for(let t=0;t<3;t++)n[t]=i[t]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let s=0,r=this.vertices.length;s<r;s++){const r=this.vertices[s],o=r.point;for(let e=0;e<3;e++)o.getComponent(e)<t.getComponent(e)&&(t.setComponent(e,o.getComponent(e)),n[e]=r);for(let t=0;t<3;t++)o.getComponent(t)>e.getComponent(t)&&(e.setComponent(t,o.getComponent(t)),i[t]=r)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:i}}computeInitialHull(){const t=this.vertices,e=this.computeExtremes(),n=e.min,i=e.max;let s=0,r=0;for(let t=0;t<3;t++){const e=i[t].point.getComponent(t)-n[t].point.getComponent(t);e>s&&(s=e,r=t)}const o=n[r],a=i[r];let l,h;s=0,_line3.set(o.point,a.point);for(let e=0,n=this.vertices.length;e<n;e++){const n=t[e];if(n!==o&&n!==a){_line3.closestPointToPoint(n.point,!0,_closestPoint);const t=_closestPoint.distanceToSquared(n.point);t>s&&(s=t,l=n)}}s=-1,_plane.setFromCoplanarPoints(o.point,a.point,l.point);for(let e=0,n=this.vertices.length;e<n;e++){const n=t[e];if(n!==o&&n!==a&&n!==l){const t=Math.abs(_plane.distanceToPoint(n.point));t>s&&(s=t,h=n)}}const c=[];if(_plane.distanceToPoint(h.point)<0){c.push(Face.create(o,a,l),Face.create(h,a,o),Face.create(h,l,a),Face.create(h,o,l));for(let t=0;t<3;t++){const e=(t+1)%3;c[t+1].getEdge(2).setTwin(c[0].getEdge(e)),c[t+1].getEdge(1).setTwin(c[e+1].getEdge(0))}}else{c.push(Face.create(o,l,a),Face.create(h,o,a),Face.create(h,a,l),Face.create(h,l,o));for(let t=0;t<3;t++){const e=(t+1)%3;c[t+1].getEdge(2).setTwin(c[0].getEdge((3-t)%3)),c[t+1].getEdge(0).setTwin(c[e+1].getEdge(1))}}for(let t=0;t<4;t++)this.faces.push(c[t]);for(let e=0,n=t.length;e<n;e++){const n=t[e];if(n!==o&&n!==a&&n!==l&&n!==h){s=this.tolerance;let t=null;for(let e=0;e<4;e++){const i=this.faces[e].distanceToPoint(n.point);i>s&&(s=i,t=this.faces[e])}null!==t&&this.addVertexToFace(n,t)}}return this}reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];0===n.mark&&t.push(n)}return this.faces=t,this}nextVertexToAdd(){if(!1===this.assigned.isEmpty()){let t,e=0;const n=this.assigned.first().face;let i=n.outside;do{const s=n.distanceToPoint(i.point);s>e&&(e=s,t=i),i=i.next}while(null!==i&&i.face===n);return t}}computeHorizon(t,e,n,i){let s;this.deleteFaceVertices(n),n.mark=1,s=null===e?e=n.getEdge(0):e.next;do{const e=s.twin,n=e.face;0===n.mark&&(n.distanceToPoint(t)>this.tolerance?this.computeHorizon(t,e,n,i):i.push(s)),s=s.next}while(s!==e);return this}addAdjoiningFace(t,e){const n=Face.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}addNewFaces(t,e){this.newFaces=[];let n=null,i=null;for(let s=0;s<e.length;s++){const r=e[s],o=this.addAdjoiningFace(t,r);null===n?n=o:o.next.setTwin(i),this.newFaces.push(o.face),i=o}return n.next.setTwin(i),this}addVertexToHull(t){const e=[];return this.unassigned.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,e),this.addNewFaces(t,e),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let t;for(this.computeInitialHull();void 0!==(t=this.nextVertexToAdd());)this.addVertexToHull(t);return this.reindexFaces(),this.cleanup(),this}}class Face{constructor(){this.normal=new Vector3,this.midpoint=new Vector3,this.area=0,this.constant=0,this.outside=null,this.mark=0,this.edge=null}static create(t,e,n){const i=new Face,s=new HalfEdge(t,i),r=new HalfEdge(e,i),o=new HalfEdge(n,i);return s.next=o.prev=r,r.next=s.prev=o,o.next=r.prev=s,i.edge=s,i.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return _triangle.set(t.point,e.point,n.point),_triangle.getNormal(this.normal),_triangle.getMidpoint(this.midpoint),this.area=_triangle.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class HalfEdge{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return null!==e?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return null!==e?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class VertexNode{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class VertexList{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,null===e.prev?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,null===e.next?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return null===this.head?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(null===this.head?this.head=t:this.tail.next=t,t.prev=this.tail;null!==t.next;)t=t.next;return this.tail=t,this}remove(t){return null===t.prev?this.head=t.next:t.prev.next=t.next,null===t.next?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return null===t.prev?this.head=e.next:t.prev.next=e.next,null===e.next?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return null===this.head}}export{ConvexHull,Face,HalfEdge,VertexNode,VertexList};