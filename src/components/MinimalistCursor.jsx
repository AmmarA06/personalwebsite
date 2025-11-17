import { useState, useEffect, useRef } from 'react';

const MinimalistCursor = () => {
  const [trail, setTrail] = useState([]);
  const requestRef = useRef();
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentTime = Date.now();

      if (currentTime - lastTimeRef.current > 30) {
        lastTimeRef.current = currentTime;

        setTrail((prev) => {
          const newTrail = [
            { x: e.clientX, y: e.clientY, id: currentTime },
            ...prev.slice(0, 15) 
          ];
          return newTrail;
        });
      }
    };

    const fadeInterval = setInterval(() => {
      setTrail((prev) => {
        const now = Date.now();
        return prev.filter((point) => now - point.id < 800);
      });
    }, 50);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(fadeInterval);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trail.map((point, index) => {
        const age = Date.now() - point.id;
        const opacity = Math.max(0, 1 - age / 800);
        const scale = 1 - index * 0.05;

        return (
          <div
            key={point.id}
            className="absolute rounded-full bg-neutral-400 dark:bg-neutral-500"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: '4px',
              height: '4px',
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity * 0.5,
              transition: 'opacity 0.1s ease-out',
            }}
          />
        );
      })}
    </div>
  );
};

export default MinimalistCursor;
