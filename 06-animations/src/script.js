import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// // Gives us the current time in milliseconds
// let time = Date.now();

// Animations
const tick = () => {
  //   console.log("tick");

  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime);

  //   // Gives us the current time in milliseconds
  //   const currentTime = Date.now();
  //   // Gives us the time in milliseconds since the last frame
  //   const deltaTime = currentTime - time;
  //   // Update time
  //   time = currentTime;

  // Update objects
  //   mesh.rotation.y -= 0.001 * deltaTime;
  //   mesh.rotation.y = elapsedTime;
  mesh.rotation.y = Math.cos(elapsedTime);
  mesh.position.y = Math.cos(elapsedTime);
  mesh.position.x = Math.sin(elapsedTime);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// Start the animation
tick();
