// src/canvas.js
import React, {Component} from "react";

const wasm = import("./fractal.wasm");

// https://mbebenita.github.io/WasmExplorer/
class Canvas extends Component {

  componentDidMount() {
	  wasm.then(wasm => {
	    const mandelIterWASM = wasm.mandelIter; //wasm._Z10mandelIterffi;
	    let canvas = this.refs.canvas_wasm.getContext('2d');
	    let mag = 200;
	    let panX = 2;
	    let panY = 1.25;
	    let maxIter = 100;

    	var t1 = window.performance.now();

	    for (let x = 10; x < this.props.height; x++)  {
	      for (let y = 10; y < this.props.width; y++)  {

			// C++ Function
	        let m = mandelIterWASM(x/mag - panX, y/mag - panY, maxIter);

	        canvas.fillStyle = (m === 0) ? '#000' : 'hsl(0, 80%, ' + m + '%)'; 
	        canvas.fillRect(x, y, 1,1);
	      }
	    }

    	var t2 = window.performance.now();	
		console.log('Time taken (WASM): ', t2 - t1, 'ms');	

		canvas.font = '20px Muli';
		canvas.fillStyle = '#50ff68';
		canvas.fillText("WASM Fn.", this.props.width/2 + 65, this.props.height/2);
	  });
  }

// mandelIter(x, y, maxIter) {
//   let r = x;
//   let i = y;	
//   for (let a = 0; a < maxIter; a++) {
//     let tmpr = r * r - i * i + x;
//     let tmpi = 2 * r * i + y;

//     r = tmpr;
//     i = tmpi;

//     if (r * i > 5) {
//       return a/maxIter * 100;
//     }
//   }

//   return 0;
// }


  render() {
    return (
        <canvas ref="canvas_wasm" width={this.props.width} height={this.props.height}/>
    )
  }
}

export default Canvas;
