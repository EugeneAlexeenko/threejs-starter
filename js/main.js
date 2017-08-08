 'use strict';

// standard global variables
var container, scene, camera, renderer, controls, stats;

var fieldOfView,
  aspectRatio,
  WIDTH,
  HEIGHT,
  nearPlane,
  farPlane;

// custom global variables
var cube, ground;
var spot;

init();

function init() {
  // set up the scene, the camera and the renderer
  createScene();

  // add controls
  createControls();

  // add stats
  createStats();

  // add the lights
  createLights();

  // add the objects
  createCube();
  createGround();

  // add helpers
  createHelpers();

  // animation loop
  loop();
}

function createStats(){
  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );
}

function createCube() {
  // create cube
  var geometry = new THREE.BoxGeometry(100, 100, 100);
  var material = new THREE.MeshLambertMaterial({
    color: 0x00ff00
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 100;
  // cast and receive shadows
  cube.castShadow    = true;
  cube.receiveShadow = true;

  scene.add(cube);
}

function createGround() {
  var geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  var material = new THREE.MeshLambertMaterial({
    color: 0xcccccc
  });
  ground = new THREE.Mesh(geometry, material);
  ground.rotation.x = -90 * Math.PI / 180;
  ground.receiveShadow = true;
  scene.add(ground);
}

function createLights() {
  var ambient = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambient);

  var spotlight = new THREE.SpotLight(0xffffff);
  spotlight.position.set(-100, 400, -100);
  spotlight.intencity = 2;
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;

  scene.add(spotlight);
}

function createHelpers() {
  var axes = new THREE.AxisHelper(500);
  scene.add(axes);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 0, 0);
  // controls.minDistance = 300;
  // controls.maxDistance = 1000;
}

function createScene(){
  WIDTH = document.documentElement.clientWidth;
  HEIGHT = document.documentElement.clientHeight;

  scene = new THREE.Scene();

  // add fog effect
  scene.fog = new THREE.Fog(0xffffff, 200, 3000);

  // CAMERA
  fieldOfView = 45;
  aspectRatio = WIDTH / HEIGHT;
  nearPlane = 0.1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );

  // set the position of the camera
  camera.position.set(400, 350, 300);

  // RENDERER
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);

  // Enable shadow rendering
  renderer.shadowMap.enabled = true;

  container = document.getElementById('container');
  container.appendChild( renderer.domElement );

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  // Update height and width of the renderer and the camera
  WIDTH = document.documentElement.clientWidth;
  HEIGHT = document.documentElement.clientHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT; 
  camera.updateProjectionMatrix();
}

function loop() {
  requestAnimationFrame(loop);
  stats.update();

  renderer.render(scene, camera);
};

