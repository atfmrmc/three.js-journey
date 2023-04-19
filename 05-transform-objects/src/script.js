import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//-//-//-// Objects

//-//-// Created group
const group = new THREE.Group();
// Group position
group.position.set(1, 0, 1);
// Group scale
group.scale.set(2, 1, 3);
// Group rotation
group.rotation.reorder("YXZ");
group.rotation.y = Math.PI * 1;
// Group add to group
scene.add(group);

//-// Cube 1
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
group.add(cube1);

//Position Cube 1
cube1.position.set(2, 0, 0);

//-// Cube 2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
group.add(cube2);

//Position Cube 2
cube2.position.set(0, 0, 2);

//-// Cube 3
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
group.add(cube3);

//Position Cube 3
cube3.position.set(0, 2, 0);

//// Random Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 0.5;
// scene.add(mesh);

// // Scale
// // mesh.scale.x = 2;
// // mesh.scale.y = 0.5;
// mesh.scale.set(2, 0.5, 1);

// // Rotation
// mesh.rotation.reorder("YXZ");
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 2;
// mesh.rotation.z = Math.PI * 0.25;

//Axes helper
const axesHelper = new THREE.AxesHelper(7);
scene.add(axesHelper);
//The number in AxesHelper(XX) is the length of the axes

// Define position
// mesh.position.set(0.7, 0.6, 0.5);

// Nomalize the position to 1
// mesh.position.normalize();

// Distance from origin
// console.log(mesh.position.length());

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(5, 2, 5);
camera.lookAt(group.position);
scene.add(camera);

// Distance from camera
// console.log(mesh.position.distanceTo(camera.position));

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Rendering the scene
renderer.render(scene, camera);
