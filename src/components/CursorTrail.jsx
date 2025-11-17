import { useState, useEffect, useRef } from 'react';

const CursorTrail = () => {
  const [cursorPositions, setCursorPositions] = useState([]);
  const colorIndexRef = useRef(0);

  const colors = [
    'rgba(59, 130, 246, 0.5)',   
    'rgba(139, 92, 246, 0.5)',   
    'rgba(236, 72, 153, 0.5)',   
    'rgba(249, 115, 22, 0.5)',   
    'rgba(234, 179, 8, 0.5)',    
  ];

  useEffect(() => {
    const trailLength = 3;
    let rafId;

    const handleMouseMove = (e) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setCursorPositions((prev) => {
          const newPosition = { x: e.clientX, y: e.clientY };
          return [newPosition, ...prev].slice(0, trailLength);
        });

        colorIndexRef.current = (colorIndexRef.current + 0.01) % colors.length;
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {cursorPositions.map((pos, index) => {
        const colorIdx = Math.floor(colorIndexRef.current) % colors.length;
        const currentColor = colors[colorIdx];
        const opacity = 1 - (index / cursorPositions.length);
        const size = 16 - (index * 3);

        return (
          <div
            key={`${pos.x}-${pos.y}-${index}`}
            className="absolute rounded-full will-change-transform"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${currentColor}, transparent)`,
              opacity: opacity * 0.6,
              backdropFilter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;
