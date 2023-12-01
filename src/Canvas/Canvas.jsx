import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import './canvasStyle.scss';

const sizes = [62, 194, 326, 458, 590];
const SIZE = 652;

function getLines(statuses){
  const h = [];
  const v = [];
  const d = [];

  for (let i = 0; i < 25; i += 5) {
    const sum = statuses[i] + statuses[i + 1] + statuses[i + 2] + statuses[i + 3] + statuses[i + 4];
    if (sum === 5) { h.push(1) } else { h.push(0) }
  }

  for (let i = 0; i < 5; i++) {
    const sum = statuses[i] + statuses[i + 5] + statuses[i + 10] + statuses[i + 15] + statuses[i + 20];
    if (sum === 5) { v.push(1) } else { v.push(0) }
  }

  {
    const sum = statuses[0] + statuses[6] + statuses[12] + statuses[18] + statuses[24];
    if (sum === 5) { d.push(1) } else { d.push(0) }
  }

  {
    const sum = statuses[4] + statuses[8] + statuses[12] + statuses[16] + statuses[20];
    if (sum === 5) { d.push(1) } else { d.push(0) }
  }

  return {h, v, d}
}

function draw(obj, c) {
  const size = c.width
  const ctx = c.getContext('2d');
  const microOffset = size / 100;

  if (ctx) {
    ctx.fillStyle = '#00000000'
    ctx.fillRect(0, 0, size, size);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#781624a0"

    obj.h.forEach((el, i) => {
      if (el) {
        const offset = (sizes[i] / SIZE) * size;

        ctx.beginPath()
        ctx.moveTo(microOffset, offset);
        ctx.lineTo(size - microOffset, offset)
        ctx.stroke()
      }
    })

    obj.v.forEach((el, i) => {
      if (el) {
        const offset = (sizes[i] / SIZE) * size;

        ctx.beginPath()
        ctx.moveTo(offset, microOffset);
        ctx.lineTo(offset, size - microOffset)
        ctx.stroke()
      }
    })

    if (obj.d[0]) {
      ctx.beginPath()
      ctx.moveTo(microOffset, microOffset);
      ctx.lineTo(size - microOffset, size - microOffset)
      ctx.stroke()
    }

    if (obj.d[1]) {
      ctx.beginPath()
      ctx.moveTo(size - microOffset, microOffset);
      ctx.lineTo(microOffset, size - microOffset)
      ctx.stroke()
    }
  }
}

function Canvas({statuses}) {
  const canvasRef = useRef(null);

  const [size, setSize] = useState( 0 )

  const resize = ()=>{
    let canvasElement = canvasRef.current;

    canvasElement.width = size;
    canvasElement.height = size;
  }

  const setCorrectSize = ()=> {
    const canvasElement = canvasRef.current;
    const size = canvasElement.clientWidth;
     
    if (size > 0) {
      setSize( size )
    }else{
      requestAnimationFrame( setCorrectSize )
    }
  }

  useEffect( setCorrectSize, []);

  useEffect(()=>{
    if( size > 0 ){
      let canvasElement = canvasRef.current;
      resize()
      draw( getLines(statuses) , canvasElement);
    }

  }, [size, statuses])

  return <canvas className='canvas-element' ref={canvasRef}></canvas>;
}

export default Canvas;
