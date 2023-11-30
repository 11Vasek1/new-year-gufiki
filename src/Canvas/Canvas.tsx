import { useEffect, useRef } from 'react';
import './canvas.scss';

const sizes = [62, 194, 326, 458, 590];
const SIZE = 652;

type canvasProps = {
	h: Array<number>;
	v: Array<number>;
	d: Array<number>;
};

function draw(obj: canvasProps, c: HTMLCanvasElement, size: number) {
	const ctx = c.getContext('2d');
    const microOffset = size/100;

    if(ctx){
        ctx.fillStyle = '#00000000'
        ctx.fillRect(0, 0, size, size);

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#781624a0"

        obj.h.forEach((el, i)=>{
            if(el){
                const offset = (sizes[i]/SIZE) * size;

                ctx.beginPath()
                ctx.moveTo(microOffset,offset);
                ctx.lineTo(size - microOffset,offset)
                ctx.stroke()
            }
        })

        obj.v.forEach((el, i)=>{
            if(el){
                const offset = (sizes[i]/SIZE) * size;

                ctx.beginPath()
                ctx.moveTo(offset,microOffset);
                ctx.lineTo(offset, size - microOffset)
                ctx.stroke()
            }
        })

        if(obj.d[0]){
            ctx.beginPath()
            ctx.moveTo(microOffset,microOffset);
            ctx.lineTo(size - microOffset, size - microOffset)
            ctx.stroke()
        }

        if(obj.d[1]){
            ctx.beginPath()
            ctx.moveTo(size - microOffset,microOffset);
            ctx.lineTo(microOffset, size - microOffset)
            ctx.stroke()
        }
    }
}

function Canvas({ h, v, d}: canvasProps) {
	const canvasRef = useRef(null);

	useEffect(() => {
        if( canvasRef.current !== null ){
            const c:HTMLCanvasElement = canvasRef.current;

            const width = c.clientWidth;
    
            c.width = width;
            c.height = width;
    
            draw({ h, v, d}, c, width);
        }
	});

	return <canvas className='canvas' ref={canvasRef}></canvas>;
}

export default Canvas;
