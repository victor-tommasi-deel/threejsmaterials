import React from 'react';
import { init, createGeometry, createNormalGeometry } from './utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.1,
      renderer: null,
      scene: null,
      camera: null,
      torus: null,
      cube1: null,
      cube2: null,
      plane: null
    };
  }

  componentDidMount = () => {
    // const objects = createGeometry(5, 5, 5, 0xc9b92b, 0xff0040);
    const objects = createNormalGeometry();
    const start = init(objects);
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    const { geometricFigure } = objects;
    this.setState({
      renderer,
      scene,
      camera,
      torus: geometricFigure
      // cube1,
      // cube2,
      // plane
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, scene, camera, renderer, torus } = this.state;
    if (scene !== null && camera !== null && renderer !== null) {
      torus.rotation.x += ADD;
      torus.rotation.y += ADD;
      /* cube1.position.x += ADD;
      cube2.position.x -= ADD;
      if (cube1.position.x > 6 || cube1.position.x < -6) {
        this.setState({
          ADD: ADD * -1
        });
      } */
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
