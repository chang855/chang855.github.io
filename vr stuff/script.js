var scene,
  camera,
  renderer,
  element,
  container,
  effect,
  controls,
  clock,
  snow = [],


  // Particles
  particles = new THREE.Object3D(),
  totalParticles = 200,
  maxParticleSize = 200,
  particleRotationSpeed = 0,
  particleRotationDeg = 0,
  lastColorRange = [0, 0.3],
  currentColorRange = [0, 0.3];

init();

function init() {
  setScene();

  setControls();
  setsnow();
  setLights();
  setFloor();
  setParticles();

  clock = new THREE.Clock();
  animate();
}

function setScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
  camera.position.set(0, 15, 0);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('webglviewer');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);
}

function setLights() {
  // Lighting
  var light = new THREE.PointLight(0x999999, 2, 100);
  light.position.set(50, 50, 50);
  scene.add(light);

  var lightScene = new THREE.PointLight(0x999999, 2, 100);
  lightScene.position.set(0, 5, 0);
  scene.add(lightScene);
}

function setFloor() {
  var floorTexture = THREE.ImageUtils.loadTexture('textures/grass.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat = new THREE.Vector2(50, 50);
  floorTexture.anisotropy = renderer.getMaxAnisotropy();

  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: floorTexture
  });

  var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

  var floor = new THREE.Mesh(geometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
}

// ASCII file
var loader = new THREE.STLLoader();
loader.load('models/3d-model.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0xe8efef,
    specular: 0x111111,
    shininess: 0
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(45, -0.25, 30);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.55, .55, .55);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(65, -0.25, -15);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.40, .40, .40);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(20, -0.25, 45);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.55, .55, .55);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(25, -0.25, -28);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.45, .45, .45);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(45, -0.25, -40);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.35, .35, .35);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(50, -0.25, 0);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.35, .35, .35);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});
var loader = new THREE.STLLoader();
loader.load('models/lamp.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0x1f2625,
    specular: 0x111111,
    shininess: 0
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(7, 0, 23);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.02, .02, .02);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh)
});
loader.load('models/bench.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0xe8efef,
    specular: 0x111111,
    shininess: 0
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-1.5, -0.2, -2.2);
  mesh.rotation.set(1.5, -Math.PI, 0);
  mesh.scale.set(.35, .35, .35);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});
// loader.load( 'models/revolver.stl', function ( geometry ) {
//   var material = new THREE.MeshPhongMaterial( { color: 0xe8efef, specular: 0x111111, shininess: 0 } );
//   var mesh = new THREE.Mesh( geometry, material );
//   mesh.position.set( 1, 8,-6 );
//   mesh.rotation.set( 1.5, - Math.PI, 1);
//   mesh.scale.set( .01, .01, .01);
//   mesh.castShadow = true;
//   mesh.receiveShadow = true;
//   scene.add( mesh );
// } );




function setParticles() {
  var particleTexture = THREE.ImageUtils.loadTexture('textures/particle.png'),
    spriteMaterial = new THREE.SpriteMaterial({
      map: particleTexture,
      color: 0xffffff
    });

  for (var i = 0; i < totalParticles; i++) {
    var sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(8, 8, 1);
    sprite.position.set(Math.random(10) - 0.3, Math.random(1), Math.random(1) - 0.5);
    sprite.position.setLength(maxParticleSize);

    sprite.material.blending = THREE.AdditiveBlending;

    particles.add(sprite);
  }
  particles.position.y = -5;
  scene.add(particles);
}

function setsnow() {

  for (var i = 0; i < 600; i++) {
    var geometry = new THREE.SphereGeometry(.15, .15, .15);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
    snow[i] = new THREE.Mesh(geometry, material);
    snow[i].position.set(Math.random()*50-30, Math.random()*100 , Math.random()*50-30)
    scene.add(snow[i]);
  }
}

function animateparticles() {
  var elapsedSeconds = clock.getElapsedTime(),
    particleRotationDirection = particleRotationDeg <= 180 ? -1 : 1;

  particles.rotation.y = elapsedSeconds * particleRotationSpeed * particleRotationDirection;

  // We check if the color range has changed, if so, we'll change the colours
  if (lastColorRange[0] != currentColorRange[0] && lastColorRange[1] != currentColorRange[1]) {

    for (var i = 0; i < totalParticles; i++) {
      particles.children[i].material.color.setHSL(currentColorRange[0], currentColorRange[1], (Math.random() * (0.7 - 0.2) + 0.2));
    }

    lastColorRange = currentColorRange;
  }
}

function animate() {
  animateparticles();
  update(clock.getDelta());
  render(clock.getDelta());
  animatesnow();
  requestAnimationFrame(animate);

  update();
  render();
}

function animatesnow() {
  for (var i = 0, il = snow.length; i < il; i++) {
    snow[i].position.y -= 1;
    if (snow[i].position.y < -15) snow[i].position.y = 75;
  }
}

function setControls() {
  // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
  controls = new THREE.OrbitControls(camera, element);
  controls.target.set(
    camera.position.x + 0.15,
    camera.position.y,
    camera.position.z
  );
  controls.noPan = true;
  controls.noZoom = true;

  // Our preferred controls via DeviceOrientation
  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);
}

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

function getURL(url, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        callback(JSON.parse(xmlhttp.responseText));
      } else {
        console.log('We had an error, status code: ', xmlhttp.status);
      }
    }
  }

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}