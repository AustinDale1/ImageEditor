import React, { useEffect, useState } from 'react';

const FPSCounter = () => {
  const [fps, setFps] = useState(0);
  const [frames, setFrames] = useState(0);
  const [lastTime, setLastTime] = useState(performance.now());

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      setFrames(prevFrames => prevFrames + 1);
      animationFrameId = requestAnimationFrame(tick);
    };

    const calculateFPS = () => {
        console.log('fps');
      const now = performance.now();
      const delta = now - lastTime;
      
      if (delta >= 1000) { // Update FPS every second
        setFps(Math.round((frames * 1000) / delta));
        setFrames(0);
        setLastTime(now);
      }
    };

    const intervalId = setInterval(calculateFPS, 1000);
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, [frames, lastTime]);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '5px',
      borderRadius: '3px'
    }}>
      FPS: {fps}
    </div>
  );
};

export default FPSCounter;