precision mediump float;

varying vec3 vNormal;

uniform float uBounceSpeed;
uniform highp float uTime;

void main()
{
    
    float bouncePos = abs(sin(uTime * uBounceSpeed)) * 0.5;
    //vNormal+=bouncePos;
    vec3 normalCol = vNormal * 0.5 + bouncePos;
    gl_FragColor = vec4(normalCol, 1.0);
}