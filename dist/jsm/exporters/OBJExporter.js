import{Color,Matrix3,Vector2,Vector3}from"three";class OBJExporter{parse(t){let e="",o=0,r=0,n=0;const i=new Vector3,f=new Color,l=new Vector3,u=new Vector2,a=[];return t.traverse((function(t){!0===t.isMesh&&function(t){let f=0,c=0,m=0;const s=t.geometry,x=new Matrix3,p=s.getAttribute("position"),g=s.getAttribute("normal"),v=s.getAttribute("uv"),b=s.getIndex();if(e+="o "+t.name+"\n",t.material&&t.material.name&&(e+="usemtl "+t.material.name+"\n"),void 0!==p)for(let o=0,r=p.count;o<r;o++,f++)i.fromBufferAttribute(p,o),i.applyMatrix4(t.matrixWorld),e+="v "+i.x+" "+i.y+" "+i.z+"\n";if(void 0!==v)for(let t=0,o=v.count;t<o;t++,m++)u.fromBufferAttribute(v,t),e+="vt "+u.x+" "+u.y+"\n";if(void 0!==g){x.getNormalMatrix(t.matrixWorld);for(let t=0,o=g.count;t<o;t++,c++)l.fromBufferAttribute(g,t),l.applyMatrix3(x).normalize(),e+="vn "+l.x+" "+l.y+" "+l.z+"\n"}if(null!==b)for(let t=0,i=b.count;t<i;t+=3){for(let e=0;e<3;e++){const i=b.getX(t+e)+1;a[e]=o+i+(g||v?"/"+(v?r+i:"")+(g?"/"+(n+i):""):"")}e+="f "+a.join(" ")+"\n"}else for(let t=0,i=p.count;t<i;t+=3){for(let e=0;e<3;e++){const i=t+e+1;a[e]=o+i+(g||v?"/"+(v?r+i:"")+(g?"/"+(n+i):""):"")}e+="f "+a.join(" ")+"\n"}o+=f,r+=m,n+=c}(t),!0===t.isLine&&function(t){let r=0;const n=t.geometry,f=t.type,l=n.getAttribute("position");if(e+="o "+t.name+"\n",void 0!==l)for(let o=0,n=l.count;o<n;o++,r++)i.fromBufferAttribute(l,o),i.applyMatrix4(t.matrixWorld),e+="v "+i.x+" "+i.y+" "+i.z+"\n";if("Line"===f){e+="l ";for(let t=1,r=l.count;t<=r;t++)e+=o+t+" ";e+="\n"}if("LineSegments"===f)for(let t=1,r=t+1,n=l.count;t<n;t+=2,r=t+1)e+="l "+(o+t)+" "+(o+r)+"\n";o+=r}(t),!0===t.isPoints&&function(t){let r=0;const n=t.geometry,l=n.getAttribute("position"),u=n.getAttribute("color");if(e+="o "+t.name+"\n",void 0!==l){for(let o=0,n=l.count;o<n;o++,r++)i.fromBufferAttribute(l,o),i.applyMatrix4(t.matrixWorld),e+="v "+i.x+" "+i.y+" "+i.z,void 0!==u&&(f.fromBufferAttribute(u,o).convertLinearToSRGB(),e+=" "+f.r+" "+f.g+" "+f.b),e+="\n";e+="p ";for(let t=1,r=l.count;t<=r;t++)e+=o+t+" ";e+="\n"}o+=r}(t)})),e}}export{OBJExporter};