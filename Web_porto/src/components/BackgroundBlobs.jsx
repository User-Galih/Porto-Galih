import React, { useEffect, useRef } from 'react';

export const BackgroundBlobs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 50; // shift up to 50px
      const yPercent = (clientY / window.innerHeight - 0.5) * 50;

      const blobs = containerRef.current.querySelectorAll('.blob');
      blobs.forEach((blob, idx) => {
        const speed = (idx + 1) * 0.3;
        blob.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="background-blobs-container" ref={containerRef}>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
    </div>
  );
};

export default BackgroundBlobs;
