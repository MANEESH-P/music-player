import { useRef, useLayoutEffect } from 'react';

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
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    let bufferLength = analyser.frequencyBinCount;

    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

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
      // requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#4e3561';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 25; i < bufferLength; i++) {
        barHeight = dataArray[i];
        // var r = barHeight + (25 * (i/bufferLength));
        // var g = 250 * (i/bufferLength);
        // var b = 50;

        ctx.fillStyle = "#3b1f50";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }
    start();
  };

  useLayoutEffect(() => {
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

  }, [audioPlayer, playing]);

  return (
    <canvas
      className="footer__visualiser"
      ref={canvasRef}
    ></canvas>
  );
};
export default Visualizer;
