void 0===window.GPUShaderStage&&(window.GPUShaderStage={VERTEX:1,FRAGMENT:2,COMPUTE:4});class WebGPU{static isAvailable(){return void 0!==navigator.gpu}static getErrorMessage(){const e=document.createElement("div");return e.id="webgpumessage",e.style.fontFamily="monospace",e.style.fontSize="13px",e.style.fontWeight="normal",e.style.textAlign="center",e.style.background="#fff",e.style.color="#000",e.style.padding="1.5em",e.style.maxWidth="400px",e.style.margin="5em auto 0",e.innerHTML='Your browser does not support <a href="https://gpuweb.github.io/gpuweb/" style="color:blue">WebGPU</a> yet',e}}export default WebGPU;