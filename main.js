import * as THREE from 'three';
import './style.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Scene
const scene = new THREE.Scene();

//Sizes
const sizes = {
    width: window.innerWidth,
    heigth: window.innerHeight,
}

//Randomness
const random1 = Math.floor(Math.random() * 21);
if (random1 < 1) {
    random1 = 1
}
const random2 = Math.floor(Math.random() * 21);
if (random2 < 1) {
    random2 = 1
}

//Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 20;

//Light
const amblight = new THREE.AmbientLight(0xffffff, 0.05, 100)
scene.add(amblight)
const light = new THREE.PointLight(0xffffff, 100, 100)
light.position.set(0, 10, 10 )
scene.add(light)

//Object
const geometry = new THREE.TorusKnotGeometry( 4, 1, 16, 64, random1, random2 );
console.log(random1)
console.log(random2)
const material = new THREE.MeshStandardMaterial( { color: 0x00ff83 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );




//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1.2)
renderer.render(scene, camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5


//Resize
window.addEventListener('resize', () => {
    //Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Update Camera
    
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    
})

const loop = () => {
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()