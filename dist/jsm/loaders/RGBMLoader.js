import{DataTextureLoader,RGBAFormat,LinearFilter,CubeTexture,HalfFloatType,DataUtils}from"three";class RGBMLoader extends DataTextureLoader{constructor(e){super(e),this.type=HalfFloatType,this.maxRange=7}setDataType(e){return this.type=e,this}setMaxRange(e){return this.maxRange=e,this}loadCubemap(e,r,t,a){const n=new CubeTexture;let i=0;const f=this;function o(t){f.load(e[t],(function(e){n.images[t]=e,i++,6===i&&(n.needsUpdate=!0,r&&r(n))}),void 0,a)}for(let r=0;r<e.length;++r)o(r);return n.type=this.type,n.format=RGBAFormat,n.minFilter=LinearFilter,n.generateMipmaps=!1,n}parse(e){const r=UPNG.decode(e),t=UPNG.toRGBA8(r)[0],a=new Uint8Array(t),n=r.width*r.height*4,i=this.type===HalfFloatType?new Uint16Array(n):new Float32Array(n);for(let e=0;e<a.length;e+=4){const r=a[e+0]/255,t=a[e+1]/255,n=a[e+2]/255,f=a[e+3]/255;this.type===HalfFloatType?(i[e+0]=DataUtils.toHalfFloat(Math.min(r*f*this.maxRange,65504)),i[e+1]=DataUtils.toHalfFloat(Math.min(t*f*this.maxRange,65504)),i[e+2]=DataUtils.toHalfFloat(Math.min(n*f*this.maxRange,65504)),i[e+3]=DataUtils.toHalfFloat(1)):(i[e+0]=r*f*this.maxRange,i[e+1]=t*f*this.maxRange,i[e+2]=n*f*this.maxRange,i[e+3]=1)}return{width:r.width,height:r.height,data:i,format:RGBAFormat,type:this.type,flipY:!0}}}var UPNG={toRGBA8:function(e){var r=e.width,t=e.height;if(null==e.tabs.acTL)return[UPNG.toRGBA8.decodeImage(e.data,r,t,e).buffer];var a=[];null==e.frames[0].data&&(e.frames[0].data=e.data);for(var n=r*t*4,i=new Uint8Array(n),f=new Uint8Array(n),o=new Uint8Array(n),s=0;s<e.frames.length;s++){var l=e.frames[s],d=l.rect.x,c=l.rect.y,u=l.rect.width,h=l.rect.height,v=UPNG.toRGBA8.decodeImage(l.data,u,h,e);if(0!=s)for(var U=0;U<n;U++)o[U]=i[U];if(0==l.blend?UPNG._copyTile(v,u,h,i,r,t,d,c,0):1==l.blend&&UPNG._copyTile(v,u,h,i,r,t,d,c,1),a.push(i.buffer.slice(0)),1==l.dispose)UPNG._copyTile(f,u,h,i,r,t,d,c,0);else if(2==l.dispose)for(U=0;U<n;U++)i[U]=o[U]}return a}};UPNG.toRGBA8.decodeImage=function(e,r,t,a){var n=r*t,i=UPNG.decode._getBPP(a),f=Math.ceil(r*i/8),o=new Uint8Array(4*n),s=new Uint32Array(o.buffer),l=a.ctype,d=a.depth,c=UPNG._bin.readUshort;if(6==l){var u=n<<2;if(8==d)for(var h=0;h<u;h+=4)o[h]=e[h],o[h+1]=e[h+1],o[h+2]=e[h+2],o[h+3]=e[h+3];if(16==d)for(h=0;h<u;h++)o[h]=e[h<<1]}else if(2==l){var v=a.tabs.tRNS;if(null==v){if(8==d)for(h=0;h<n;h++){var U=3*h;s[h]=255<<24|e[U+2]<<16|e[U+1]<<8|e[U]}if(16==d)for(h=0;h<n;h++)U=6*h,s[h]=255<<24|e[U+4]<<16|e[U+2]<<8|e[U]}else{var p=v[0],g=v[1],w=v[2];if(8==d)for(h=0;h<n;h++){var P=h<<2;U=3*h,s[h]=255<<24|e[U+2]<<16|e[U+1]<<8|e[U],e[U]==p&&e[U+1]==g&&e[U+2]==w&&(o[P+3]=0)}if(16==d)for(h=0;h<n;h++)P=h<<2,U=6*h,s[h]=255<<24|e[U+4]<<16|e[U+2]<<8|e[U],c(e,U)==p&&c(e,U+2)==g&&c(e,U+4)==w&&(o[P+3]=0)}}else if(3==l){var y=a.tabs.PLTE,G=a.tabs.tRNS,b=G?G.length:0;if(1==d)for(var m=0;m<t;m++){var N=m*f,H=m*r;for(h=0;h<r;h++){P=H+h<<2;var A=3*(_=e[N+(h>>3)]>>7-((7&h)<<0)&1);o[P]=y[A],o[P+1]=y[A+1],o[P+2]=y[A+2],o[P+3]=_<b?G[_]:255}}if(2==d)for(m=0;m<t;m++)for(N=m*f,H=m*r,h=0;h<r;h++)P=H+h<<2,A=3*(_=e[N+(h>>2)]>>6-((3&h)<<1)&3),o[P]=y[A],o[P+1]=y[A+1],o[P+2]=y[A+2],o[P+3]=_<b?G[_]:255;if(4==d)for(m=0;m<t;m++)for(N=m*f,H=m*r,h=0;h<r;h++)P=H+h<<2,A=3*(_=e[N+(h>>1)]>>4-((1&h)<<2)&15),o[P]=y[A],o[P+1]=y[A+1],o[P+2]=y[A+2],o[P+3]=_<b?G[_]:255;if(8==d)for(h=0;h<n;h++){var _;P=h<<2,A=3*(_=e[h]),o[P]=y[A],o[P+1]=y[A+1],o[P+2]=y[A+2],o[P+3]=_<b?G[_]:255}}else if(4==l){if(8==d)for(h=0;h<n;h++){P=h<<2;var R=e[T=h<<1];o[P]=R,o[P+1]=R,o[P+2]=R,o[P+3]=e[T+1]}if(16==d)for(h=0;h<n;h++){var T;P=h<<2,R=e[T=h<<2],o[P]=R,o[P+1]=R,o[P+2]=R,o[P+3]=e[T+2]}}else if(0==l)for(p=a.tabs.tRNS?a.tabs.tRNS:-1,m=0;m<t;m++){var I=m*f,x=m*r;if(1==d)for(var C=0;C<r;C++){var B=(R=255*(e[I+(C>>>3)]>>>7-(7&C)&1))==255*p?0:255;s[x+C]=B<<24|R<<16|R<<8|R}else if(2==d)for(C=0;C<r;C++)B=(R=85*(e[I+(C>>>2)]>>>6-((3&C)<<1)&3))==85*p?0:255,s[x+C]=B<<24|R<<16|R<<8|R;else if(4==d)for(C=0;C<r;C++)B=(R=17*(e[I+(C>>>1)]>>>4-((1&C)<<2)&15))==17*p?0:255,s[x+C]=B<<24|R<<16|R<<8|R;else if(8==d)for(C=0;C<r;C++)B=(R=e[I+C])==p?0:255,s[x+C]=B<<24|R<<16|R<<8|R;else if(16==d)for(C=0;C<r;C++)R=e[I+(C<<1)],B=c(e,I+(C<<1))==p?0:255,s[x+C]=B<<24|R<<16|R<<8|R}return o},UPNG.decode=function(e){for(var r,t,a,n,i=new Uint8Array(e),f=8,o=UPNG._bin,s=o.readUshort,l=o.readUint,d={tabs:{},frames:[]},c=new Uint8Array(i.length),u=0,h=0,v=[137,80,78,71,13,10,26,10],U=0;U<8;U++)if(i[U]!=v[U])throw new Error("The input is not a PNG file!");for(;f<i.length;){var p=o.readUint(i,f);f+=4;var g=o.readASCII(i,f,4);if(f+=4,"IHDR"==g)UPNG.decode._IHDR(i,f,d);else if("CgBI"==g)d.tabs[g]=i.slice(f,f+4);else if("IDAT"==g){for(U=0;U<p;U++)c[u+U]=i[f+U];u+=p}else if("acTL"==g)d.tabs[g]={num_frames:l(i,f),num_plays:l(i,f+4)},r=new Uint8Array(i.length);else if("fcTL"==g){var w;0!=h&&((w=d.frames[d.frames.length-1]).data=UPNG.decode._decompress(d,r.slice(0,h),w.rect.width,w.rect.height),h=0);var P={x:l(i,f+12),y:l(i,f+16),width:l(i,f+4),height:l(i,f+8)},y=s(i,f+22);y=s(i,f+20)/(0==y?100:y);var G={rect:P,delay:Math.round(1e3*y),dispose:i[f+24],blend:i[f+25]};d.frames.push(G)}else if("fdAT"==g){for(U=0;U<p-4;U++)r[h+U]=i[f+U+4];h+=p-4}else if("pHYs"==g)d.tabs[g]=[o.readUint(i,f),o.readUint(i,f+4),i[f+8]];else if("cHRM"==g)for(d.tabs[g]=[],U=0;U<8;U++)d.tabs[g].push(o.readUint(i,f+4*U));else if("tEXt"==g||"zTXt"==g){null==d.tabs[g]&&(d.tabs[g]={});var b=o.nextZero(i,f);a=o.readASCII(i,f,b-f);var m=f+p-b-1;"tEXt"==g?t=o.readASCII(i,b+1,m):(n=UPNG.decode._inflate(i.slice(b+2,b+2+m)),t=o.readUTF8(n,0,n.length)),d.tabs[g][a]=t}else if("iTXt"==g){null==d.tabs[g]&&(d.tabs[g]={}),b=0;var N=f;b=o.nextZero(i,N),a=o.readASCII(i,N,b-N);var H=i[N=b+1];N+=2,b=o.nextZero(i,N),o.readASCII(i,N,b-N),N=b+1,b=o.nextZero(i,N),o.readUTF8(i,N,b-N),m=p-((N=b+1)-f),0==H?t=o.readUTF8(i,N,m):(n=UPNG.decode._inflate(i.slice(N,N+m)),t=o.readUTF8(n,0,n.length)),d.tabs[g][a]=t}else if("PLTE"==g)d.tabs[g]=o.readBytes(i,f,p);else if("hIST"==g){var A=d.tabs.PLTE.length/3;for(d.tabs[g]=[],U=0;U<A;U++)d.tabs[g].push(s(i,f+2*U))}else if("tRNS"==g)3==d.ctype?d.tabs[g]=o.readBytes(i,f,p):0==d.ctype?d.tabs[g]=s(i,f):2==d.ctype&&(d.tabs[g]=[s(i,f),s(i,f+2),s(i,f+4)]);else if("gAMA"==g)d.tabs[g]=o.readUint(i,f)/1e5;else if("sRGB"==g)d.tabs[g]=i[f];else if("bKGD"==g)0==d.ctype||4==d.ctype?d.tabs[g]=[s(i,f)]:2==d.ctype||6==d.ctype?d.tabs[g]=[s(i,f),s(i,f+2),s(i,f+4)]:3==d.ctype&&(d.tabs[g]=i[f]);else if("IEND"==g)break;f+=p,o.readUint(i,f),f+=4}return 0!=h&&((w=d.frames[d.frames.length-1]).data=UPNG.decode._decompress(d,r.slice(0,h),w.rect.width,w.rect.height)),d.data=UPNG.decode._decompress(d,c,d.width,d.height),delete d.compress,delete d.interlace,delete d.filter,d},UPNG.decode._decompress=function(e,r,t,a){var n=UPNG.decode._getBPP(e),i=Math.ceil(t*n/8),f=new Uint8Array((i+1+e.interlace)*a);return r=e.tabs.CgBI?UPNG.inflateRaw(r,f):UPNG.decode._inflate(r,f),0==e.interlace?r=UPNG.decode._filterZero(r,e,0,t,a):1==e.interlace&&(r=UPNG.decode._readInterlace(r,e)),r},UPNG.decode._inflate=function(e,r){return UPNG.inflateRaw(new Uint8Array(e.buffer,2,e.length-6),r)},UPNG.inflateRaw=function(){var e,r,t={H:{}};return t.H.N=function(e,r){var a,n,i=Uint8Array,f=0,o=0,s=0,l=0,d=0,c=0,u=0,h=0,v=0;if(3==e[0]&&0==e[1])return r||new i(0);var U=t.H,p=U.b,g=U.e,w=U.R,P=U.n,y=U.A,G=U.Z,b=U.m,m=null==r;for(m&&(r=new i(e.length>>>2<<5));0==f;)if(f=p(e,v,1),o=p(e,v+1,2),v+=3,0!=o){if(m&&(r=t.H.W(r,h+(1<<17))),1==o&&(a=b.J,n=b.h,c=511,u=31),2==o){s=g(e,v,5)+257,l=g(e,v+5,5)+1,d=g(e,v+10,4)+4,v+=14;for(var N=1,H=0;H<38;H+=2)b.Q[H]=0,b.Q[H+1]=0;for(H=0;H<d;H++){var A=g(e,v+3*H,3);b.Q[1+(b.X[H]<<1)]=A,A>N&&(N=A)}v+=3*d,P(b.Q,N),y(b.Q,N,b.u),a=b.w,n=b.d,v=w(b.u,(1<<N)-1,s+l,e,v,b.v);var _=U.V(b.v,0,s,b.C);c=(1<<_)-1;var R=U.V(b.v,s,l,b.D);u=(1<<R)-1,P(b.C,_),y(b.C,_,a),P(b.D,R),y(b.D,R,n)}for(;;){var T=a[G(e,v)&c];v+=15&T;var I=T>>>4;if(I>>>8==0)r[h++]=I;else{if(256==I)break;var x=h+I-254;if(I>264){var C=b.q[I-257];x=h+(C>>>3)+g(e,v,7&C),v+=7&C}var B=n[G(e,v)&u];v+=15&B;var F=B>>>4,D=b.c[F],M=(D>>>4)+p(e,v,15&D);for(v+=15&D;h<x;)r[h]=r[h++-M],r[h]=r[h++-M],r[h]=r[h++-M],r[h]=r[h++-M];h=x}}}else{0!=(7&v)&&(v+=8-(7&v));var S=4+(v>>>3),L=e[S-4]|e[S-3]<<8;m&&(r=t.H.W(r,h+L)),r.set(new i(e.buffer,e.byteOffset+S,L),h),v=S+L<<3,h+=L}return r.length==h?r:r.slice(0,h)},t.H.W=function(e,r){var t=e.length;if(r<=t)return e;var a=new Uint8Array(t<<1);return a.set(e,0),a},t.H.R=function(e,r,a,n,i,f){for(var o=t.H.e,s=t.H.Z,l=0;l<a;){var d=e[s(n,i)&r];i+=15&d;var c=d>>>4;if(c<=15)f[l]=c,l++;else{var u=0,h=0;16==c?(h=3+o(n,i,2),i+=2,u=f[l-1]):17==c?(h=3+o(n,i,3),i+=3):18==c&&(h=11+o(n,i,7),i+=7);for(var v=l+h;l<v;)f[l]=u,l++}}return i},t.H.V=function(e,r,t,a){for(var n=0,i=0,f=a.length>>>1;i<t;){var o=e[i+r];a[i<<1]=0,a[1+(i<<1)]=o,o>n&&(n=o),i++}for(;i<f;)a[i<<1]=0,a[1+(i<<1)]=0,i++;return n},t.H.n=function(e,r){for(var a,n,i,f,o=t.H.m,s=e.length,l=o.j,d=0;d<=r;d++)l[d]=0;for(d=1;d<s;d+=2)l[e[d]]++;var c=o.K;for(a=0,l[0]=0,n=1;n<=r;n++)a=a+l[n-1]<<1,c[n]=a;for(i=0;i<s;i+=2)0!=(f=e[i+1])&&(e[i]=c[f],c[f]++)},t.H.A=function(e,r,a){for(var n=e.length,i=t.H.m.r,f=0;f<n;f+=2)if(0!=e[f+1])for(var o=f>>1,s=e[f+1],l=o<<4|s,d=r-s,c=e[f]<<d,u=c+(1<<d);c!=u;)a[i[c]>>>15-r]=l,c++},t.H.l=function(e,r){for(var a=t.H.m.r,n=15-r,i=0;i<e.length;i+=2){var f=e[i]<<r-e[i+1];e[i]=a[f]>>>n}},t.H.M=function(e,r,t){t<<=7&r;var a=r>>>3;e[a]|=t,e[a+1]|=t>>>8},t.H.I=function(e,r,t){t<<=7&r;var a=r>>>3;e[a]|=t,e[a+1]|=t>>>8,e[a+2]|=t>>>16},t.H.e=function(e,r,t){return(e[r>>>3]|e[1+(r>>>3)]<<8)>>>(7&r)&(1<<t)-1},t.H.b=function(e,r,t){return(e[r>>>3]|e[1+(r>>>3)]<<8|e[2+(r>>>3)]<<16)>>>(7&r)&(1<<t)-1},t.H.Z=function(e,r){return(e[r>>>3]|e[1+(r>>>3)]<<8|e[2+(r>>>3)]<<16)>>>(7&r)},t.H.i=function(e,r){return(e[r>>>3]|e[1+(r>>>3)]<<8|e[2+(r>>>3)]<<16|e[3+(r>>>3)]<<24)>>>(7&r)},t.H.m=(e=Uint16Array,r=Uint32Array,{K:new e(16),j:new e(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new e(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new r(32),J:new e(512),_:[],h:new e(32),$:[],w:new e(32768),C:[],v:[],d:new e(32768),D:[],u:new e(512),Q:[],r:new e(32768),s:new r(286),Y:new r(30),a:new r(19),t:new r(15e3),k:new e(65536),g:new e(32768)}),function(){for(var e=t.H.m,r=0;r<32768;r++){var a=r;a=(4278255360&(a=(4042322160&(a=(3435973836&(a=(2863311530&a)>>>1|(1431655765&a)<<1))>>>2|(858993459&a)<<2))>>>4|(252645135&a)<<4))>>>8|(16711935&a)<<8,e.r[r]=(a>>>16|a<<16)>>>17}function n(e,r,t){for(;0!=r--;)e.push(0,t)}for(r=0;r<32;r++)e.q[r]=e.S[r]<<3|e.T[r],e.c[r]=e.p[r]<<4|e.z[r];n(e._,144,8),n(e._,112,9),n(e._,24,7),n(e._,8,8),t.H.n(e._,9),t.H.A(e._,9,e.J),t.H.l(e._,9),n(e.$,32,5),t.H.n(e.$,5),t.H.A(e.$,5,e.h),t.H.l(e.$,5),n(e.Q,19,0),n(e.C,286,0),n(e.D,30,0),n(e.v,320,0)}(),t.H.N}(),UPNG.decode._readInterlace=function(e,r){for(var t=r.width,a=r.height,n=UPNG.decode._getBPP(r),i=n>>3,f=Math.ceil(t*n/8),o=new Uint8Array(a*f),s=0,l=[0,0,4,0,2,0,1],d=[0,4,0,2,0,1,0],c=[8,8,8,4,4,2,2],u=[8,8,4,4,2,2,1],h=0;h<7;){for(var v=c[h],U=u[h],p=0,g=0,w=l[h];w<a;)w+=v,g++;for(var P=d[h];P<t;)P+=U,p++;var y=Math.ceil(p*n/8);UPNG.decode._filterZero(e,r,s,p,g);for(var G,b=0,m=l[h];m<a;){for(var N=d[h],H=s+b*y<<3;N<t;){if(1==n&&(G=(G=e[H>>3])>>7-(7&H)&1,o[m*f+(N>>3)]|=G<<7-((7&N)<<0)),2==n&&(G=(G=e[H>>3])>>6-(7&H)&3,o[m*f+(N>>2)]|=G<<6-((3&N)<<1)),4==n&&(G=(G=e[H>>3])>>4-(7&H)&15,o[m*f+(N>>1)]|=G<<4-((1&N)<<2)),n>=8)for(var A=m*f+N*i,_=0;_<i;_++)o[A+_]=e[(H>>3)+_];H+=n,N+=U}b++,m+=v}p*g!=0&&(s+=g*(1+y)),h+=1}return o},UPNG.decode._getBPP=function(e){return[1,null,3,1,2,null,4][e.ctype]*e.depth},UPNG.decode._filterZero=function(e,r,t,a,n){var i=UPNG.decode._getBPP(r),f=Math.ceil(a*i/8),o=UPNG.decode._paeth;i=Math.ceil(i/8);var s,l,d=e[t],c=0;if(d>1&&(e[t]=[0,0,1][d-2]),3==d)for(c=i;c<f;c++)e[c+1]=e[c+1]+(e[c+1-i]>>>1)&255;for(var u=0;u<n;u++)if(c=0,0==(d=e[(l=(s=t+u*f)+u+1)-1]))for(;c<f;c++)e[s+c]=e[l+c];else if(1==d){for(;c<i;c++)e[s+c]=e[l+c];for(;c<f;c++)e[s+c]=e[l+c]+e[s+c-i]}else if(2==d)for(;c<f;c++)e[s+c]=e[l+c]+e[s+c-f];else if(3==d){for(;c<i;c++)e[s+c]=e[l+c]+(e[s+c-f]>>>1);for(;c<f;c++)e[s+c]=e[l+c]+(e[s+c-f]+e[s+c-i]>>>1)}else{for(;c<i;c++)e[s+c]=e[l+c]+o(0,e[s+c-f],0);for(;c<f;c++)e[s+c]=e[l+c]+o(e[s+c-i],e[s+c-f],e[s+c-i-f])}return e},UPNG.decode._paeth=function(e,r,t){var a=e+r-t,n=a-e,i=a-r,f=a-t;return n*n<=i*i&&n*n<=f*f?e:i*i<=f*f?r:t},UPNG.decode._IHDR=function(e,r,t){var a=UPNG._bin;t.width=a.readUint(e,r),r+=4,t.height=a.readUint(e,r),r+=4,t.depth=e[r],r++,t.ctype=e[r],r++,t.compress=e[r],r++,t.filter=e[r],r++,t.interlace=e[r],r++},UPNG._bin={nextZero:function(e,r){for(;0!=e[r];)r++;return r},readUshort:function(e,r){return e[r]<<8|e[r+1]},writeUshort:function(e,r,t){e[r]=t>>8&255,e[r+1]=255&t},readUint:function(e,r){return 16777216*e[r]+(e[r+1]<<16|e[r+2]<<8|e[r+3])},writeUint:function(e,r,t){e[r]=t>>24&255,e[r+1]=t>>16&255,e[r+2]=t>>8&255,e[r+3]=255&t},readASCII:function(e,r,t){for(var a="",n=0;n<t;n++)a+=String.fromCharCode(e[r+n]);return a},writeASCII:function(e,r,t){for(var a=0;a<t.length;a++)e[r+a]=t.charCodeAt(a)},readBytes:function(e,r,t){for(var a=[],n=0;n<t;n++)a.push(e[r+n]);return a},pad:function(e){return e.length<2?"0"+e:e},readUTF8:function(e,r,t){for(var a,n="",i=0;i<t;i++)n+="%"+UPNG._bin.pad(e[r+i].toString(16));try{a=decodeURIComponent(n)}catch(a){return UPNG._bin.readASCII(e,r,t)}return a}},UPNG._copyTile=function(e,r,t,a,n,i,f,o,s){for(var l=Math.min(r,n),d=Math.min(t,i),c=0,u=0,h=0;h<d;h++)for(var v=0;v<l;v++)if(f>=0&&o>=0?(c=h*r+v<<2,u=(o+h)*n+f+v<<2):(c=(-o+h)*r-f+v<<2,u=h*n+v<<2),0==s)a[u]=e[c],a[u+1]=e[c+1],a[u+2]=e[c+2],a[u+3]=e[c+3];else if(1==s){var U=e[c+3]*(1/255),p=e[c]*U,g=e[c+1]*U,w=e[c+2]*U,P=a[u+3]*(1/255),y=a[u]*P,G=a[u+1]*P,b=a[u+2]*P,m=1-U,N=U+P*m,H=0==N?0:1/N;a[u+3]=255*N,a[u+0]=(p+y*m)*H,a[u+1]=(g+G*m)*H,a[u+2]=(w+b*m)*H}else if(2==s)U=e[c+3],p=e[c],g=e[c+1],w=e[c+2],P=a[u+3],y=a[u],G=a[u+1],b=a[u+2],U==P&&p==y&&g==G&&w==b?(a[u]=0,a[u+1]=0,a[u+2]=0,a[u+3]=0):(a[u]=p,a[u+1]=g,a[u+2]=w,a[u+3]=U);else if(3==s){if(U=e[c+3],p=e[c],g=e[c+1],w=e[c+2],P=a[u+3],y=a[u],G=a[u+1],b=a[u+2],U==P&&p==y&&g==G&&w==b)continue;if(U<220&&P>20)return!1}return!0};export{RGBMLoader};