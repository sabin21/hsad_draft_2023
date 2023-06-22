const BrightnessContrastShader={uniforms:{tDiffuse:{value:null},brightness:{value:0},contrast:{value:0}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform float brightness;\n\t\tuniform float contrast;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = texture2D( tDiffuse, vUv );\n\n\t\t\tgl_FragColor.rgb += brightness;\n\n\t\t\tif (contrast > 0.0) {\n\t\t\t\tgl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;\n\t\t\t} else {\n\t\t\t\tgl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;\n\t\t\t}\n\n\t\t}"};export{BrightnessContrastShader};