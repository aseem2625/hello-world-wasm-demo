// src/canvas.js
import React, {Component} from "react";


class Canvas extends Component {

  componentDidMount() {
	let canvas = this.refs.canvas.getContext('2d');
	let mag = 200;
	let panX = 2;
	let panY = 1.25;
	let maxIter = 100;

	var t1 = window.performance.now();

	for (let x = 10; x < this.props.height; x++)  {
		for (let y = 10; y < this.props.width; y++)  {

			// JS Function
			let m = this.mandelIter(x/mag - panX, y/mag - panY, maxIter);

			canvas.fillStyle = (m === 0) ? '#000' : 'hsl(0, 100%, ' + m + '%)'; 
			canvas.fillRect(x, y, 1,1);
		}
	}

	var t2 = window.performance.now();	
	console.log('Time taken: ', t2 - t1, 'ms');	

	canvas.font = '20px Muli';
	canvas.fillStyle = '#f8ff1a';
	canvas.fillText("JS Fn.", this.props.width/2 + 65, this.props.height/2);
  }

mandelIter(x, y, maxIter) {
  let r = x;
  let i = y;
  for (let a = 0; a < maxIter; a++) {
    let tmpr = r * r - i * i + x;
    let tmpi = 2 * r * i + y;

    r = tmpr;
    i = tmpi;

    if (r * i > 5) {
      return a/maxIter * 100;
    }
  }

  return 0;
}


  render() {
    return (
        <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
    )
  }
}

export default Canvas;
