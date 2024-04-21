import"./modulepreload-polyfill-B5Qt9EMX.js";import{G as d,W as c,S as p,C as v,P as f,O as w,a as M,b as h,R as S,M as b,c as g}from"./lil-gui.esm-CEwVnst_.js";var x=`uniform mat4 projectionMatrix;
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

    float stretchSquash = map(ballPos, 0.0, 1.0, 0.0, 5.0);

    modelPos.z *= stretchSquash;
    modelPos += ballPos;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * modelPos;

    vNormal = normal;

    
    
}`,P=`precision mediump float;

varying vec3 vNormal;

uniform float uBounceSpeed;
uniform highp float uTime;

void main()
{
    
    float bouncePos = abs(sin(uTime * uBounceSpeed)) * 0.5;
    
    vec3 normalCol = vNormal * 0.5 + bouncePos;
    gl_FragColor = vec4(normalCol, 1.0);
}`;const r=new d,C=document.querySelector("#app"),n=new c({antialias:!0});n.setSize(window.innerWidth,window.innerHeight);const a=new p;a.background=new v(2699059);C.appendChild(n.domElement);document.body.appendChild(n.domElement);const e=new f(75,window.innerWidth/window.innerHeight);e.position.z=-3;a.add(e);const s=new w(e,n.domElement);s.enableDamping=!0;const l=new M;a.add(l);const T=new h(.5,8,8),i=new S({vertexShader:x,fragmentShader:P,uniforms:{uBounceSpeed:{value:4},uMoveSpeed:{value:1},uTime:{value:0}}}),m=new b(T,i);m.position.x=-1;l.add(m);r.add(i.uniforms.uBounceSpeed,"value").min(0).max(10).step(.1).name("color warp");r.add(i.uniforms.uMoveSpeed,"value").min(0).max(10).step(.1).name("Move speed");const G=new g,u=()=>{s.update(),n.render(a,e),requestAnimationFrame(u);const o=G.getElapsedTime();i.uniforms.uTime.value=o};u();window.addEventListener("resize",()=>{const o=window.innerWidth,t=window.innerHeight;e.aspect=o/t,e.updateProjectionMatrix(),n.setSize(o,t)});
