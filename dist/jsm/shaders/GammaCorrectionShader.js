const GammaCorrectionShader={uniforms:{tDiffuse:{value:null}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 tex = texture2D( tDiffuse, vUv );\n\n\t\t\tgl_FragColor = LinearTosRGB( tex );\n\n\t\t}"};export{GammaCorrectionShader};