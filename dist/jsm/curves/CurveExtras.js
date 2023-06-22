import{Curve,Vector3}from"three";class GrannyKnot extends Curve{getPoint(t,s=new Vector3){const e=s;t=2*Math.PI*t;const o=-.22*Math.cos(t)-1.28*Math.sin(t)-.44*Math.cos(3*t)-.78*Math.sin(3*t),a=-.1*Math.cos(2*t)-.27*Math.sin(2*t)+.38*Math.cos(4*t)+.46*Math.sin(4*t),c=.7*Math.cos(3*t)-.4*Math.sin(3*t);return e.set(o,a,c).multiplyScalar(20)}}class HeartCurve extends Curve{constructor(t=5){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s;t*=2*Math.PI;const o=16*Math.pow(Math.sin(t),3),a=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);return e.set(o,a,0).multiplyScalar(this.scale)}}class VivianiCurve extends Curve{constructor(t=70){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s;t=4*t*Math.PI;const o=this.scale/2,a=o*(1+Math.cos(t)),c=o*Math.sin(t),n=2*o*Math.sin(t/2);return e.set(a,c,n)}}class KnotCurve extends Curve{getPoint(t,s=new Vector3){const e=s;t*=2*Math.PI;const o=50*Math.sin(t),a=Math.cos(t)*(10+50*Math.cos(t)),c=Math.sin(t)*(10+50*Math.cos(t));return e.set(o,a,c)}}class HelixCurve extends Curve{getPoint(t,s=new Vector3){const e=s,o=2*Math.PI*t*150/30,a=30*Math.cos(o),c=30*Math.sin(o),n=150*t;return e.set(a,c,n)}}class TrefoilKnot extends Curve{constructor(t=10){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s;t*=2*Math.PI;const o=(2+Math.cos(3*t))*Math.cos(2*t),a=(2+Math.cos(3*t))*Math.sin(2*t),c=Math.sin(3*t);return e.set(o,a,c).multiplyScalar(this.scale)}}class TorusKnot extends Curve{constructor(t=10){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s;t*=2*Math.PI;const o=(2+Math.cos(4*t))*Math.cos(3*t),a=(2+Math.cos(4*t))*Math.sin(3*t),c=Math.sin(4*t);return e.set(o,a,c).multiplyScalar(this.scale)}}class CinquefoilKnot extends Curve{constructor(t=10){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s;t*=2*Math.PI;const o=(2+Math.cos(5*t))*Math.cos(2*t),a=(2+Math.cos(5*t))*Math.sin(2*t),c=Math.sin(5*t);return e.set(o,a,c).multiplyScalar(this.scale)}}class TrefoilPolynomialKnot extends Curve{constructor(t=10){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s;t=4*t-2;const o=Math.pow(t,3)-3*t,a=Math.pow(t,4)-4*t*t,c=.2*Math.pow(t,5)-2*t;return e.set(o,a,c).multiplyScalar(this.scale)}}function scaleTo(t,s,e){return e*(s-t)+t}class FigureEightPolynomialKnot extends Curve{constructor(t=1){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s,o=.4*(t=scaleTo(-4,4,t))*(t*t-7)*(t*t-10),a=Math.pow(t,4)-13*t*t,c=.1*t*(t*t-4)*(t*t-9)*(t*t-12);return e.set(o,a,c).multiplyScalar(this.scale)}}class DecoratedTorusKnot4a extends Curve{constructor(t=40){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s;t*=2*Math.PI;const o=Math.cos(2*t)*(1+.6*(Math.cos(5*t)+.75*Math.cos(10*t))),a=Math.sin(2*t)*(1+.6*(Math.cos(5*t)+.75*Math.cos(10*t))),c=.35*Math.sin(5*t);return e.set(o,a,c).multiplyScalar(this.scale)}}class DecoratedTorusKnot4b extends Curve{constructor(t=40){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s,o=t*Math.PI*2,a=Math.cos(2*o)*(1+.45*Math.cos(3*o)+.4*Math.cos(9*o)),c=Math.sin(2*o)*(1+.45*Math.cos(3*o)+.4*Math.cos(9*o)),n=.2*Math.sin(9*o);return e.set(a,c,n).multiplyScalar(this.scale)}}class DecoratedTorusKnot5a extends Curve{constructor(t=40){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s,o=t*Math.PI*2,a=Math.cos(3*o)*(1+.3*Math.cos(5*o)+.5*Math.cos(10*o)),c=Math.sin(3*o)*(1+.3*Math.cos(5*o)+.5*Math.cos(10*o)),n=.2*Math.sin(20*o);return e.set(a,c,n).multiplyScalar(this.scale)}}class DecoratedTorusKnot5c extends Curve{constructor(t=40){super(),this.scale=t}getPoint(t,s=new Vector3){const e=s,o=t*Math.PI*2,a=Math.cos(4*o)*(1+.5*(Math.cos(5*o)+.4*Math.cos(20*o))),c=Math.sin(4*o)*(1+.5*(Math.cos(5*o)+.4*Math.cos(20*o))),n=.35*Math.sin(15*o);return e.set(a,c,n).multiplyScalar(this.scale)}}export{GrannyKnot,HeartCurve,VivianiCurve,KnotCurve,HelixCurve,TrefoilKnot,TorusKnot,CinquefoilKnot,TrefoilPolynomialKnot,FigureEightPolynomialKnot,DecoratedTorusKnot4a,DecoratedTorusKnot4b,DecoratedTorusKnot5a,DecoratedTorusKnot5c};