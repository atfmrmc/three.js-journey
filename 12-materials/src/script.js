import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

// Debug
const gui = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// Door
const doorColorTexture = textureLoader.load("textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("textures/door/roughness.jpg");

// Matcap
const matcapTexture = textureLoader.load("textures/matcaps/5.jpg");

// Gradient
const gradientTexture = textureLoader.load("textures/gradients/3.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

// Cube
const environmentMapTexture = cubeTextureLoader.load([
  "textures/environmentMaps/3/px.jpg",
  "textures/environmentMaps/3/nx.jpg",
  "textures/environmentMaps/3/py.jpg",
  "textures/environmentMaps/3/ny.jpg",
  "textures/environmentMaps/3/pz.jpg",
  "textures/environmentMaps/3/nz.jpg",
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const material = new THREE.MeshNormalMaterial();

//const material = new THREE.MeshMatcapMaterial();
//material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x000fff);

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;

// material.map = doorColorTexture;
// // Ambient Occlusion
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// // Height Map
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// // ---
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// // Normal Map
// material.normalMap = doorNormalTexture;
// // material.normalScale.set(0.5, 0.5);
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;

// Debug
gui.add(material, "metalness").min(0).max(1).step(0.01);
gui.add(material, "roughness").min(0).max(1).step(0.01);
// gui.add(material, "aoMapIntensity").min(0).max(10).step(0.1);
// gui.add(material, "displacementScale").min(0).max(1).step(0.001);
gui.add(material, "wireframe");

//material.wireframe = true;
//material.flatShading = true;

material.side = THREE.DoubleSide;

//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);

scene.add(ambientLight, pointLight);

// // Objects
// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 128, 128),
  material
);
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
sphere.position.x = -1.33;

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 128, 128), material);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

// Torus
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 128, 128),
  material
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);
torus.position.x = 1.33;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
