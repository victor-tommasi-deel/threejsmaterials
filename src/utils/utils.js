import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  BoxGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  TorusGeometry,
  MeshNormalMaterial
} from 'three';

const createGeometry = (width, height, depth, color1, color2) => {
  let geometry = new BoxGeometry(width, height, depth);
  let material = new MeshBasicMaterial({ color: color1 });

  const cube1 = new Mesh(geometry, material);
  cube1.position.z = -6;
  cube1.position.y = -5;

  geometry = new BoxGeometry(width, height, depth);
  material = new MeshBasicMaterial({
    color: color2,
    transparent: true,
    opacity: 0.8
  });

  const cube2 = new Mesh(geometry, material);
  cube2.position.z = 6;
  cube2.position.y = -5;

  geometry = new PlaneGeometry(1000, 1000, 50, 50);
  material = new MeshBasicMaterial({ color: 0xa6f995, wireframe: true });
  const plane = new Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -100;

  return {
    cube1,
    cube2,
    plane
  };
};

const createNormalGeometry = () => {
  // const geometry = new BoxGeometry(5, 5, 5);
  // const geometry = new THREE.SphereGeometry(5, 30, 30);
  const geometry = new TorusGeometry(5, 2, 10, 12);

  const material = new MeshNormalMaterial();

  //  cube = new Mesh(geometry, material);
  // sphere = new Mesh(geometry, material);
  const geometricFigure = new Mesh(geometry, material);

  // normals = new FaceNormalsHelper(cube, 5);
  // normals = new FaceNormalsHelper(sphere, 5);
  return { geometricFigure };
};

const init = (objects) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = 20;
  Object.entries(objects).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera };
};

export { init, createGeometry, createNormalGeometry };
