uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;

uniform float uMoveSpeed;
uniform highp float uTime;




float map(float inVal, float inMin, float inMax, float outMin, float outMax)
{
  return ((inVal - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
}

void main()
{
    vec4 modelPos = vec4(position, 1.0);

    float ballPos = abs(sin(uTime * uMoveSpeed)) * 0.5;

    modelPos += ballPos;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * modelPos;


    vNormal = normal;

    //modelPos.z += bouncePos;
    
}