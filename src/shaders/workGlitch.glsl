// Glitch shader for the Work section grid
precision highp float;

uniform float time;
uniform float glitchAmount; // 0 = no glitch, 1 = max glitch
varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    vec3 color = vec3(0.0);

    // When glitch is active, create color channel separation and noise
    if (glitchAmount > 0.0) {
        float r_offset = (rand(uv + time * 0.1) - 0.5) * 0.1 * glitchAmount;
        float g_offset = (rand(uv + time * 0.2) - 0.5) * 0.1 * glitchAmount;
        float b_offset = (rand(uv + time * 0.3) - 0.5) * 0.1 * glitchAmount;

        // For now, we are not using a texture, so we just simulate colors
        // In a real implementation, you would sample a texture like this:
        // color.r = texture2D(tDiffuse, uv + vec2(r_offset, 0.0)).r;
        // color.g = texture2D(tDiffuse, uv + vec2(g_offset, 0.0)).g;
        // color.b = texture2D(tDiffuse, uv + vec2(b_offset, 0.0)).b;

        // Simulating with base color
        vec3 baseColor = vec3(0.75, 0.07, 0.12); // #C1121F
        color.r = baseColor.r * (1.0 - r_offset * 10.0);
        color.g = baseColor.g * (1.0 - g_offset * 10.0);
        color.b = baseColor.b * (1.0 - b_offset * 10.0);

        // Add some noise
        if (rand(uv + time) > 0.9) {
            color = vec3(rand(uv));
        }

    } else {
        color = vec3(0.75, 0.07, 0.12); // Stable color
    }

    gl_FragColor = vec4(color, 1.0);
}
