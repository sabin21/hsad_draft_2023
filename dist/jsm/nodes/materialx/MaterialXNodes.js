import{mx_perlin_noise_float,mx_perlin_noise_vec2,mx_perlin_noise_vec3,mx_worley_noise_float as worley_noise_float,mx_worley_noise_vec2 as worley_noise_vec2,mx_worley_noise_vec3 as worley_noise_vec3,mx_cell_noise_float as cell_noise_float,mx_fractal_noise_float as fractal_noise_float,mx_fractal_noise_vec2 as fractal_noise_vec2,mx_fractal_noise_vec3 as fractal_noise_vec3,mx_fractal_noise_vec4 as fractal_noise_vec4}from"./lib/mx_noise.js";import{mx_hsvtorgb,mx_rgbtohsv}from"./lib/mx_hsv.js";import{mx_srgb_texture_to_lin_rec709}from"./lib/mx_transform_color.js";import{mix,smoothstep}from"../math/MathNode.js";import{uv}from"../accessors/UVNode.js";import{float,vec2,vec4}from"../shadernode/ShaderNode.js";export const mx_aastep=(e,o)=>{e=float(e),o=float(o);const _=vec2(o.dFdx(),o.dFdy()).length().mul(.7071067811865476);return smoothstep(e.sub(_),e.add(_),o)};const _ramp=(e,o,_,t)=>mix(e,o,_[t].clamp());export const mx_ramplr=(e,o,_=uv())=>_ramp(e,o,_,"x");export const mx_ramptb=(e,o,_=uv())=>_ramp(e,o,_,"y");const _split=(e,o,_,t,s)=>mix(e,o,mx_aastep(_,t[s]));export const mx_splitlr=(e,o,_,t=uv())=>_split(e,o,_,t,"x");export const mx_splittb=(e,o,_,t=uv())=>_split(e,o,_,t,"y");export const mx_transform_uv=(e=1,o=0,_=uv())=>_.mul(e).add(o);export const mx_safepower=(e,o=1)=>(e=float(e)).abs().pow(o).mul(e.sign());export const mx_contrast=(e,o=1,_=.5)=>float(e).sub(_).mul(o).add(_);export const mx_noise_float=(e=uv(),o=1,_=0)=>mx_perlin_noise_float(e.convert("vec2|vec3")).mul(o).add(_);export const mx_noise_vec2=(e=uv(),o=1,_=0)=>mx_perlin_noise_vec2(e.convert("vec2|vec3")).mul(o).add(_);export const mx_noise_vec3=(e=uv(),o=1,_=0)=>mx_perlin_noise_vec3(e.convert("vec2|vec3")).mul(o).add(_);export const mx_noise_vec4=(e=uv(),o=1,_=0)=>(e=e.convert("vec2|vec3"),vec4(mx_perlin_noise_vec3(e),mx_perlin_noise_float(e.add(vec2(19,73)))).mul(o).add(_));export const mx_worley_noise_float=(e=uv(),o=1)=>worley_noise_float(e.convert("vec2|vec3"),o,1);export const mx_worley_noise_vec2=(e=uv(),o=1)=>worley_noise_vec2(e.convert("vec2|vec3"),o,1);export const mx_worley_noise_vec3=(e=uv(),o=1)=>worley_noise_vec3(e.convert("vec2|vec3"),o,1);export const mx_cell_noise_float=(e=uv())=>cell_noise_float(e.convert("vec2|vec3"));export const mx_fractal_noise_float=(e=uv(),o=3,_=2,t=.5,s=1)=>fractal_noise_float(e,o,_,t).mul(s);export const mx_fractal_noise_vec2=(e=uv(),o=3,_=2,t=.5,s=1)=>fractal_noise_vec2(e,o,_,t).mul(s);export const mx_fractal_noise_vec3=(e=uv(),o=3,_=2,t=.5,s=1)=>fractal_noise_vec3(e,o,_,t).mul(s);export const mx_fractal_noise_vec4=(e=uv(),o=3,_=2,t=.5,s=1)=>fractal_noise_vec4(e,o,_,t).mul(s);export{mx_hsvtorgb,mx_rgbtohsv,mx_srgb_texture_to_lin_rec709};