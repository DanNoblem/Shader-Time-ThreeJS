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

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const boxMat = new THREE.MeshBasicMaterial({ color: 0xd4605a });
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
boxMesh.position.x = 1;
group.add(boxMesh);

const sphereGeo = new THREE.SphereGeometry(0.5, 8, 8);
const sphereMat = new THREE.RawShaderMaterial({
  vertexShader: vertShader,
  fragmentShader: fragShader,
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
sphereMesh.position.x = -1;
group.add(sphereMesh);

// Animation loop.
const tick = () => {
  group.rotation.y += 0.02;
  group.rotation.x += 0.01;

  orbitControls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
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
