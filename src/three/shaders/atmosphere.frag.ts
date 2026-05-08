export const atmosphereFrag = `
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vec3 V = normalize(cameraPosition - vWorldPos);
  
  // Create a sharper, more intense rim effect
  float intensity = pow(0.65 - dot(vNormal, V), 3.0);
  
  // Use a hardcoded light vector that matches our scene's main backlight/keylight
  vec3 L = normalize(vec3(5.0, 4.0, 1.5));
  float lightDot = max(dot(vNormal, L), 0.0);
  
  // Vibrant inner blue aura
  vec3 color = vec3(0.0, 0.4, 1.0) * intensity * 1.5;
  
  // Intense cyan/white outer rim where the light hits
  color += vec3(0.2, 0.75, 1.0) * pow(lightDot, 2.0) * intensity * 3.0;
  
  // Extra bright core rim for that hyper-realistic pop seen in the image
  float extremeRim = pow(0.9 - dot(vNormal, V), 6.0);
  color += vec3(0.5, 0.9, 1.0) * extremeRim * 2.0;

  gl_FragColor = vec4(color, 1.0);
}
`;
