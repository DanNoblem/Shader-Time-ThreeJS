import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";

import GUI from "lil-gui";

const gui = new GUI();

// app
const app = document.querySelector("#app");

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#AEC6CF");

// perspective camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 100);

// light
const ambientLight = new THREE.AmbientLight("white", 0.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
directionalLight.rotateX(1);
// scene.add(helper);
scene.add(directionalLight);

// control
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.screenSpacePanning = false;
orbitControls.enableRotate = true;
orbitControls.rotateSpeed = 0.5;
orbitControls.enableZoom = true;
orbitControls.zoomSpeed = 0.5;
orbitControls.minDistance = 100;
orbitControls.maxDistance = 10000;
orbitControls.target = new THREE.Vector3(0, 0, 0);

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

/* 
DRAWING//////////////////////////////////////////////////////////////////////////////
*/
// Create effect composer.
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(window.innerWidth, window.innerHeight);

// Add render passes.
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

// const dotScreenPass = new DotScreenPass();
// effectComposer.addPass(dotScreenPass);

const afterimagePass = new AfterimagePass();
//effectComposer.addPass(afterimagePass);

import warpVertShader from "./shaders/warp.vert";
import warpFragShader from "./shaders/warp.frag";

const warpShader = {
  vertexShader: warpVertShader,
  fragmentShader: warpFragShader,
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0.0 },
    uNoiseScale: { value: 0.1 },
    uOffsetScale: { value: 0.2 },
  },
};

const warpPass = new ShaderPass(warpShader);
effectComposer.addPass(warpPass);

//Sphere rendering properties
const sphereMaterial = new THREE.MeshToonMaterial({ color: "#6D9BEF" });
// sphereMaterial.emissive.r = 200;
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

let orbs = [];
let i = 0;

for (let x = 0; x < 20; x++) {
  orbs[x] = [];
  for (let y = 0; y < 20; y++) {
    orbs[x][y] = new THREE.Mesh(sphereGeometry, sphereMaterial);
    orbs[x][y].position.set(x * 2.5 - 15, 0, y * 2.5 - 15);
    scene.add(orbs[x][y]);
    i++;
  }
}

gui
  .add(warpShader.uniforms.uNoiseScale, "value")
  .min(0)
  .max(5)
  .step(0.01)
  .name("noise scale");
gui
  .add(warpShader.uniforms.uOffsetScale, "value")
  .min(0)
  .max(1)
  .step(0.01)
  .name("offset scale");

let wave = 0;
const animate = (time) => {
  requestAnimationFrame(animate);

  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      let tempY = y;
      if (y % 2 == 0) {
        tempY = y; //20 - y;
      }
      orbs[x][y].position.y =
        Math.sin(Math.PI * 2 * wave + x / 10 + tempY / 10) * 5;
    }
  }
  wave += 0.01;
  effectComposer.render();
};

animate();

// for (let i = 0; i < 20; i++) {
//   for (let j = 0; j < 20; j++) {
//     let x = map(i, 0, 20, -500, 500);
//     let y = map(j, 0, 20, -500, 500);
//     let d = dist(x, y, particle.x, particle.y);
//     let a = map(d, 0, 1000, 0, TWO_PI);
//   }
// }
