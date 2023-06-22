import{Color,MathUtils}from"three";class Lut{constructor(t,s=32){this.isLut=!0,this.lut=[],this.map=[],this.n=0,this.minV=0,this.maxV=1,this.setColorMap(t,s)}set(t){return!0===t.isLut&&this.copy(t),this}setMin(t){return this.minV=t,this}setMax(t){return this.maxV=t,this}setColorMap(t,s=32){this.map=ColorMapKeywords[t]||ColorMapKeywords.rainbow,this.n=s;const o=1/this.n,i=new Color,h=new Color;this.lut.length=0,this.lut.push(new Color(this.map[0][1]));for(let t=1;t<s;t++){const s=t*o;for(let t=0;t<this.map.length-1;t++)if(s>this.map[t][0]&&s<=this.map[t+1][0]){const o=this.map[t][0],a=this.map[t+1][0];i.set(this.map[t][1]),h.set(this.map[t+1][1]);const r=(new Color).lerpColors(i,h,(s-o)/(a-o));this.lut.push(r)}}return this.lut.push(new Color(this.map[this.map.length-1][1])),this}copy(t){return this.lut=t.lut,this.map=t.map,this.n=t.n,this.minV=t.minV,this.maxV=t.maxV,this}getColor(t){t=((t=MathUtils.clamp(t,this.minV,this.maxV))-this.minV)/(this.maxV-this.minV);const s=Math.round(t*this.n);return this.lut[s]}addColorMap(t,s){return ColorMapKeywords[t]=s,this}createCanvas(){const t=document.createElement("canvas");return t.width=1,t.height=this.n,this.updateCanvas(t),t}updateCanvas(t){const s=t.getContext("2d",{alpha:!1}),o=s.getImageData(0,0,1,this.n),i=o.data;let h=0;const a=1/this.n,r=new Color,e=new Color,n=new Color;for(let t=1;t>=0;t-=a)for(let s=this.map.length-1;s>=0;s--)if(t<this.map[s][0]&&t>=this.map[s-1][0]){const o=this.map[s-1][0],a=this.map[s][0];r.set(this.map[s-1][1]),e.set(this.map[s][1]),n.lerpColors(r,e,(t-o)/(a-o)),i[4*h]=Math.round(255*n.r),i[4*h+1]=Math.round(255*n.g),i[4*h+2]=Math.round(255*n.b),i[4*h+3]=255,h+=1}return s.putImageData(o,0,0),t}}const ColorMapKeywords={rainbow:[[0,255],[.2,65535],[.5,65280],[.8,16776960],[1,16711680]],cooltowarm:[[0,3952322],[.2,10206463],[.5,14474460],[.8,16163717],[1,11797542]],blackbody:[[0,0],[.2,7864320],[.5,15086080],[.8,16776960],[1,16777215]],grayscale:[[0,0],[.2,4210752],[.5,8355712],[.8,12566463],[1,16777215]]};export{Lut,ColorMapKeywords};