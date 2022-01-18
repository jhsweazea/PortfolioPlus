import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0x0e521b });
const shape = new THREE.Mesh(geometry, material);

scene.add(shape)

//lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);


//stars/dice
function addStars(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  // const geometry = new THREE.IcosahedronGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

//background

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

//avatar

const jamesTexture = new THREE.TextureLoader().load('james.jpeg');
const jamesShape = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map:jamesTexture})
);

scene.add(jamesShape);

//that's no moon - it's a space station

const thatsNoMoonTexture = new THREE.TextureLoader().load('deathstar-texture.png');
const normalTexture = new THREE.TextureLoader().load('dsnormal.png');

const thatsNoMoon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: thatsNoMoonTexture,
    normalMap: normalTexture
  })
)

scene.add(thatsNoMoon);

thatsNoMoon.position.z = 30;
thatsNoMoon.position.setX(-10);

jamesShape.position.z = -5;
jamesShape.position.x = 2;

//scroll animation


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  thatsNoMoon.rotation.x += 0.05;
  thatsNoMoon.rotation.y += 0.075;
  thatsNoMoon.rotation.z += 0.05;

  jamesShape.rotation.y += 0.01;
  jamesShape.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame( animate );

  shape.rotation.x += 0.01;
  shape.rotation.y += 0.005;
  shape.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();