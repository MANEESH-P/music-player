import { useRef, useEffect, useLayoutEffect } from 'react';

let animationFrameRequestId;
let context;
let src;
const Visualizer = ({
  audioPlayer,
  playing,
}) => {

  const canvasRef = useRef(null);

  const visualize = () => {
    let audio = audioPlayer;
    if (context === undefined) {
      context = new AudioContext();
    }
    if (src === undefined) {
      src = context.createMediaElementSource(audio);
    }
    let analyser = context.createAnalyser();

    let canvas = canvasRef.current;

    let dpi = window.devicePixelRatio;

    let ctx = canvas.getContext('2d');
    let style_height = +getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);

    let style_width = +getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    // scale the canvas
    canvas.setAttribute('height', 400);
    canvas.setAttribute('width', 700);

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 2048;

    let bufferLength = analyser.frequencyBinCount;

    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const color = () => {
      var c = () => Math.random() * 255;

      return `rgb(${c()},${c()},${c()})`;
    };

    const loop = () => {
      animationFrameRequestId = undefined;

      start();
      renderFrame();
    };

    const start = () => {
      if (!animationFrameRequestId) {
        animationFrameRequestId = requestAnimationFrame(loop);
      }
    };

    const renderFrame = () => {
      // // requestAnimationFrame(renderFrame);
      // x = 0;
      // analyser.getByteFrequencyData(dataArray);

      // ctx.fillStyle = '#4e3561';
      // ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // for (let i = 25; i < bufferLength; i++) {
      //   barHeight = dataArray[i];
      //   // var r = barHeight + (25 * (i/bufferLength));
      //   // var g = 250 * (i/bufferLength);
      //   // var b = 50;

      //   ctx.fillStyle = "#3b1f50";
      //   ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      //   x += barWidth + 1;
      // }

      analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

      ctx.fillStyle = "#4e3561"; // draw wave with canvas
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 2;

      ctx.beginPath();

      var sliceWidth = (WIDTH * 1.0) / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * HEIGHT) / 2;

        ctx.strokeStyle = color();

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(WIDTH, HEIGHT / 2);
      ctx.stroke();
    }
    start();
  };

  useEffect(() => {
    const stop = () => {
      if (animationFrameRequestId) {
        cancelAnimationFrame(animationFrameRequestId);
        animationFrameRequestId = undefined;
      }
    };

    if (audioPlayer) {
      if (playing) {
        visualize();
      } else {
        stop();
      }
    }

    return () => stop();

  }, [playing]);

  return (
    <canvas
      className="footer__visualiser"
      ref={canvasRef}
    ></canvas>
  );
};
export default Visualizer;
