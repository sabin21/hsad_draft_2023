import{FloatUniform,Vector2Uniform,Vector3Uniform,Vector4Uniform,ColorUniform,Matrix3Uniform,Matrix4Uniform}from"../WebGPUUniform.js";class FloatNodeUniform extends FloatUniform{constructor(o){super(o.name,o.value),this.nodeUniform=o}getValue(){return this.nodeUniform.value}}class Vector2NodeUniform extends Vector2Uniform{constructor(o){super(o.name,o.value),this.nodeUniform=o}getValue(){return this.nodeUniform.value}}class Vector3NodeUniform extends Vector3Uniform{constructor(o){super(o.name,o.value),this.nodeUniform=o}getValue(){return this.nodeUniform.value}}class Vector4NodeUniform extends Vector4Uniform{constructor(o){super(o.name,o.value),this.nodeUniform=o}getValue(){return this.nodeUniform.value}}class ColorNodeUniform extends ColorUniform{constructor(o){super(o.name,o.value),this.nodeUniform=o}getValue(){return this.nodeUniform.value}}class Matrix3NodeUniform extends Matrix3Uniform{constructor(o){super(o.name,o.value),this.nodeUniform=o}getValue(){return this.nodeUniform.value}}class Matrix4NodeUniform extends Matrix4Uniform{constructor(o){super(o.name,o.value),this.nodeUniform=o}getValue(){return this.nodeUniform.value}}export{FloatNodeUniform,Vector2NodeUniform,Vector3NodeUniform,Vector4NodeUniform,ColorNodeUniform,Matrix3NodeUniform,Matrix4NodeUniform};