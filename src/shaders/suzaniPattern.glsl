// Procedural shader inspired by Suzani patterns
// Creates a kaleidoscopic, floral-like animation
precision highp float;

uniform float time;
varying vec2 vUv;

// Function to create a radial pattern
vec3 suzani(vec2 uv, float branches) {
    uv -= 0.5; // Center the coordinates
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);

    // Create repeating sectors
    angle = mod(angle, 2.0 * 3.14159 / branches);

    // Create a simple pattern within each sector
    float pattern = sin(angle * 5.0 + time) * cos(radius * 10.0);

    // Animate the pattern over time
    pattern *= sin(time + radius * 2.0);

    // Create colors
    vec3 color = vec3(
        sin(pattern * 3.14),
        cos(pattern * 2.0 + time / 2.0),
        fract(pattern * 5.0)
    );

    // Make it glow and fade towards the edges
    color *= smoothstep(0.5, 0.1, radius);

    return color;
}

void main() {
    vec3 color1 = suzani(vUv, 6.0); // 6 branches
    vec3 color2 = suzani(vUv * 1.5 + 0.2, 12.0); // A second, smaller, faster layer

    gl_FragColor = vec4(color1 + color2, 1.0);
}
