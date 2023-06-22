import{Vector3,Vector4}from"three";function findSpan(t,c,e){const n=e.length-t-1;if(c>=e[n])return n-1;if(c<=e[t])return t;let o=t,l=n,r=Math.floor((o+l)/2);for(;c<e[r]||c>=e[r+1];)c<e[r]?l=r:o=r,r=Math.floor((o+l)/2);return r}function calcBasisFunctions(t,c,e,n){const o=[],l=[],r=[];o[0]=1;for(let i=1;i<=e;++i){l[i]=c-n[t+1-i],r[i]=n[t+i]-c;let e=0;for(let t=0;t<i;++t){const c=r[t+1],n=l[i-t],a=o[t]/(c+n);o[t]=e+c*a,e=n*a}o[i]=e}return o}function calcBSplinePoint(t,c,e,n){const o=findSpan(t,n,c),l=calcBasisFunctions(o,n,t,c),r=new Vector4(0,0,0,0);for(let c=0;c<=t;++c){const n=e[o-t+c],i=l[c],a=n.w*i;r.x+=n.x*a,r.y+=n.y*a,r.z+=n.z*a,r.w+=n.w*i}return r}function calcBasisFunctionDerivatives(t,c,e,n,o){const l=[];for(let t=0;t<=e;++t)l[t]=0;const r=[];for(let t=0;t<=n;++t)r[t]=l.slice(0);const i=[];for(let t=0;t<=e;++t)i[t]=l.slice(0);i[0][0]=1;const a=l.slice(0),s=l.slice(0);for(let n=1;n<=e;++n){a[n]=c-o[t+1-n],s[n]=o[t+n]-c;let e=0;for(let t=0;t<n;++t){const c=s[t+1],o=a[n-t];i[n][t]=c+o;const l=i[t][n-1]/i[n][t];i[t][n]=e+c*l,e=o*l}i[n][n]=e}for(let t=0;t<=e;++t)r[0][t]=i[t][e];for(let t=0;t<=e;++t){let c=0,o=1;const a=[];for(let t=0;t<=e;++t)a[t]=l.slice(0);a[0][0]=1;for(let l=1;l<=n;++l){let n=0;const s=t-l,f=e-l;t>=l&&(a[o][0]=a[c][0]/i[f+1][s],n=a[o][0]*i[s][f]);const u=t-1<=f?l-1:e-t;for(let t=s>=-1?1:-s;t<=u;++t)a[o][t]=(a[c][t]-a[c][t-1])/i[f+1][s+t],n+=a[o][t]*i[s+t][f];t<=f&&(a[o][l]=-a[c][l-1]/i[f+1][t],n+=a[o][l]*i[t][f]),r[l][t]=n;const v=c;c=o,o=v}}let f=e;for(let t=1;t<=n;++t){for(let c=0;c<=e;++c)r[t][c]*=f;f*=e-t}return r}function calcBSplineDerivatives(t,c,e,n,o){const l=o<t?o:t,r=[],i=findSpan(t,n,c),a=calcBasisFunctionDerivatives(i,n,t,l,c),s=[];for(let t=0;t<e.length;++t){const c=e[t].clone(),n=c.w;c.x*=n,c.y*=n,c.z*=n,s[t]=c}for(let c=0;c<=l;++c){const e=s[i-t].clone().multiplyScalar(a[c][0]);for(let n=1;n<=t;++n)e.add(s[i-t+n].clone().multiplyScalar(a[c][n]));r[c]=e}for(let t=l+1;t<=o+1;++t)r[t]=new Vector4(0,0,0);return r}function calcKoverI(t,c){let e=1;for(let c=2;c<=t;++c)e*=c;let n=1;for(let t=2;t<=c;++t)n*=t;for(let e=2;e<=t-c;++e)n*=e;return e/n}function calcRationalCurveDerivatives(t){const c=t.length,e=[],n=[];for(let o=0;o<c;++o){const c=t[o];e[o]=new Vector3(c.x,c.y,c.z),n[o]=c.w}const o=[];for(let t=0;t<c;++t){const c=e[t].clone();for(let e=1;e<=t;++e)c.sub(o[t-e].clone().multiplyScalar(calcKoverI(t,e)*n[e]));o[t]=c.divideScalar(n[0])}return o}function calcNURBSDerivatives(t,c,e,n,o){return calcRationalCurveDerivatives(calcBSplineDerivatives(t,c,e,n,o))}function calcSurfacePoint(t,c,e,n,o,l,r,i){const a=findSpan(t,l,e),s=findSpan(c,r,n),f=calcBasisFunctions(a,l,t,e),u=calcBasisFunctions(s,r,c,n),v=[];for(let e=0;e<=c;++e){v[e]=new Vector4(0,0,0,0);for(let n=0;n<=t;++n){const l=o[a-t+n][s-c+e].clone(),r=l.w;l.x*=r,l.y*=r,l.z*=r,v[e].add(l.multiplyScalar(f[n]))}}const S=new Vector4(0,0,0,0);for(let t=0;t<=c;++t)S.add(v[t].multiplyScalar(u[t]));S.divideScalar(S.w),i.set(S.x,S.y,S.z)}export{findSpan,calcBasisFunctions,calcBSplinePoint,calcBasisFunctionDerivatives,calcBSplineDerivatives,calcKoverI,calcRationalCurveDerivatives,calcNURBSDerivatives,calcSurfacePoint};