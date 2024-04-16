precision mediump float;

varying vec3 vNormal;

void main()
{
    vec3 normalCol = vNormal * 0.5 + 0.5;
    gl_FragColor = vec4(normalCol, 1.0);
}