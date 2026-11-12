import React, { useRef, useState, useCallback, ReactNode, CSSProperties } from 'react';

interface ThreeDTiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 14)
  perspective?: number; // 3D Perspective in px (default: 1000)
  scale?: number; // Scale on hover (default: 1.03)
  speed?: number; // Transition speed in ms (default: 400)
  glare?: boolean; // Show specular 3D light glare (default: true)
  glareMaxOpacity?: number; // Max glare opacity (default: 0.35)
  depthShadow?: boolean; // Dynamic 3D depth shadow (default: true)
  onClick?: () => void;
}

/**
 * ThreeDTiltCard
 * Ultra-smooth, GPU-accelerated interactive 3D perspective tilt component.
 * Supports multi-layer 3D depth parallax (children can use transform: translateZ(...)
 * to float in 3D space above the image canvas).
 */
export const ThreeDTiltCard: React.FC<ThreeDTiltCardProps> = ({
  children,
  className = '',
  style = {},
  maxTilt = 14,
  perspective = 1100,
  scale = 1.03,
  speed = 400,
  glare = true,
  glareMaxOpacity = 0.32,
  depthShadow = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`
  });

  const [glareStyle, setGlareStyle] = useState<CSSProperties>({
    opacity: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(254, 240, 138, 0.2) 35%, transparent 70%)'
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top; // y position within element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles normalized (-1 to +1)
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const rotateY = normX * maxTilt;
      const rotateX = -normY * maxTilt;

      rafRef.current = requestAnimationFrame(() => {
        // Dynamic 3D depth shadow that projects opposite to cursor tilt
        const shadowX = -rotateY * 2.2;
        const shadowY = rotateX * 2.2 + 20;
        const dynamicBoxShadow = depthShadow
          ? `${shadowX}px ${shadowY}px 45px rgba(244, 63, 94, 0.16), 0 10px 25px rgba(245, 158, 11, 0.1)`
          : undefined;

        setTiltStyle({
          transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
          boxShadow: dynamicBoxShadow,
          transition: 'transform 100ms ease-out, box-shadow 120ms ease-out'
        });

        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          const distance = Math.hypot(normX, normY);
          const currentOpacity = Math.min(distance * glareMaxOpacity, glareMaxOpacity);

          setGlareStyle({
            opacity: currentOpacity,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.75) 0%, rgba(254, 240, 138, 0.25) 30%, transparent 65%)`
          });
        }
      });
    },
    [maxTilt, perspective, scale, glare, glareMaxOpacity, depthShadow]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`
    });
    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0,
      transition: `opacity ${speed}ms ease-out`
    }));
  }, [perspective, speed]);

  return (
    <div
      ref={cardRef}
      className={`three-d-tilt-root ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
        ...tiltStyle
      }}
    >
      {/* Main Content with 3D Depth Support */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>

      {/* 3D Dynamic Specular Light Glare Sheen */}
      {glare && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: 40,
            overflow: 'hidden',
            mixBlendMode: 'overlay',
            ...glareStyle
          }}
        />
      )}

      {/* Subtle 3D Ambient Edge Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 'inherit',
          padding: 1,
          background: isHovered
            ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.5) 0%, rgba(250, 204, 21, 0.6) 100%)'
            : 'transparent',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
          zIndex: 45
        }}
      />
    </div>
  );
};

