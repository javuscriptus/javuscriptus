// Procedural abstract stencil/silhouette shader
precision highp float;

uniform float time;
uniform float glitchAmount;
uniform int avatarStyle; // 0: Hacker, 1: Traveler, 2: Designer

varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// Simple shape functions
float circle(vec2 uv, float radius) {
    return 1.0 - smoothstep(radius - 0.01, radius + 0.01, length(uv - vec2(0.5)));
}

float box(vec2 uv, vec2 size) {
    vec2 halfSize = size * 0.5;
    vec2 s = step(halfSize, abs(uv - vec2(0.5)));
    return 1.0 - max(s.x, s.y);
}

void main() {
    vec2 uv = vUv;

    // Glitch effect
    if (glitchAmount > 0.0) {
        float glitch = rand(uv + time) * glitchAmount;
        if (glitch > 0.95) {
            uv.x += (rand(uv) - 0.5) * 0.2;
        }
    }

    // Base silhouette (head and shoulders)
    float head = circle(uv, 0.25);
    float shoulders = box(uv + vec2(0.0, 0.4), vec2(0.8, 0.4));
    float body = max(head, shoulders);

    // Style variations
    if (avatarStyle == 0) { // Hacker: add some scanlines
        body *= smoothstep(0.1, 0.11, abs(sin(uv.y * 200.0)));
    } else if (avatarStyle == 1) { // Traveler: add a "cloak" shape
        body = max(body, box(uv + vec2(0.0, 0.5), vec2(1.0, 0.6)));
    } else if (avatarStyle == 2) { // Designer: add some patterns
        body *= (sin(uv.x * 50.0) + sin(uv.y * 50.0)) * 0.5 + 0.5;
    }

    // Final color: Neon-turquoise on transparent
    gl_FragColor = vec4(vec3(0.0, 1.0, 1.0) * body, body);
}
