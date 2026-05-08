export const earthFrag = `
uniform sampler2D dayMap;
uniform sampler2D nightMap;
uniform sampler2D bumpMap;
uniform vec3 sunDirection;
uniform vec3 atmosphereColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vec3 N = normalize(vNormal);
  vec3 L = normalize(sunDirection);
  float lambert = dot(N, L);
  // Smooth terminator
  float dayMix = smoothstep(-0.15, 0.25, lambert);

  vec3 day = texture2D(dayMap, vUv).rgb;
  vec3 night = texture2D(nightMap, vUv).rgb;
  // Boost city lights
  night = pow(night, vec3(0.85)) * 1.6;

  vec3 color = mix(night, day, dayMix);

  // Subtle bump shading
  float bump = texture2D(bumpMap, vUv).r;
  color *= (0.9 + bump * 0.2);

  // Fresnel atmosphere rim
  vec3 V = normalize(cameraPosition - vWorldPos);
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.5);
  color += atmosphereColor * fresnel * 0.6;

  gl_FragColor = vec4(color, 1.0);
}
`;