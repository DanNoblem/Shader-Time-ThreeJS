/* eslint-disable no-undef, no-unused-vars */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import "./style.css";

import vertShader from "./shaders/bounceVert.glsl";
import fragShader from "./shaders/bounceFrag.glsl";

// Create debug GUI.
const gui = new GUI();

// app
const app = document.querySelector("#app");

// Create renderer.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x292f33);
app.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

// Create camera.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = -3;
scene.add(camera);

// Add mouse controls for camera.
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

//--
// Your code here!
//--
const group = new THREE.Group();
scene.add(group);

const sphereGeo = new THREE.SphereGeometry(0.5, 8, 8);
const sphereMat = new THREE.RawShaderMaterial({
  vertexShader: vertShader,
  fragmentShader: fragShader,
  uniforms: {
    uBounceSpeed: { value: 4.0 },
    uMoveSpeed: { value: 1.0 },
    uTime: { value: 0.0 },
  },
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
sphereMesh.position.x = -1;
group.add(sphereMesh);

gui
  .add(sphereMat.uniforms.uBounceSpeed, "value")
  .min(0)
  .max(10)
  .step(0.1)
  .name("color warp");

gui
  .add(sphereMat.uniforms.uMoveSpeed, "value")
  .min(0)
  .max(10)
  .step(0.1)
  .name("Move speed");

// Animation loop.

const clock = new THREE.Clock();

const tick = () => {
  // group.rotation.y += 0.02;
  // group.rotation.x += 0.01;

  orbitControls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);

  const elapsedTime = clock.getElapsedTime();

  sphereMat.uniforms.uTime.value = elapsedTime;
};
tick();

// Window resize listener.
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
