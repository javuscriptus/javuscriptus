// Simple VHS and scanlines shader
// Adapted from various sources

precision highp float;

uniform sampler2D tDiffuse;
uniform float time;
uniform float nIntensity; // noise intensity
uniform float sIntensity; // scanline intensity
uniform float sCount;     // scanline count

varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    // base texture
    vec4 color = texture2D(tDiffuse, vUv);

    // noise
    float noise = rand(vUv + time) * nIntensity;

    // scanlines
    float scanline = sin(vUv.y * sCount + time * 5.0) * sIntensity;

    // apply effects
    color.rgb -= noise;
    color.rgb += scanline;

    // clamp color
    color.rgb = clamp(color.rgb, 0.0, 1.0);

    gl_FragColor = color;
}
