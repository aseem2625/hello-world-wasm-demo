import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from './canvas';
import CanvasWasm from './canvas_wasm';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div><Canvas height={500} width={500} /> <CanvasWasm height={500} width={500} /></div>,
  document.getElementById('app')
);

module.hot.accept();
