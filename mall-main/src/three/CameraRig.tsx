import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getInterpolatedCinematicCamera } from '../data/cameraWaypoints';

interface CameraRigProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
}

// Pre-allocated static vectors to eliminate all GC allocations in useFrame
const _desiredPos = new THREE.Vector3();
const _desiredTarget = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export const CameraRig: React.FC<CameraRigProps> = ({ progressRef, reducedMotion = false }) => {
  const { camera, size } = useThree();
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 3.6, 20));
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Only listen to mouse movements on desktop non-reduced motion
  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768) return;

    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [reducedMotion]);

  useFrame((_, delta) => {
    const isMobile = size.width < 768;
    const progress = progressRef.current;

    // Zero-allocation camera interpolation
    const { fov: desiredFov } = getInterpolatedCinematicCamera(
      progress,
      isMobile,
      _desiredPos,
      _desiredTarget
    );

    // Subtle restrained mouse parallax (only desktop)
    const parallaxX = reducedMotion || isMobile ? 0 : 0.22;
    const parallaxY = reducedMotion || isMobile ? 0 : 0.12;

    _targetPos.set(
      _desiredPos.x + mouseRef.current.x * parallaxX,
      _desiredPos.y + mouseRef.current.y * parallaxY,
      _desiredPos.z
    );

    _targetLookAt.set(
      _desiredTarget.x + mouseRef.current.x * (parallaxX * 0.35),
      _desiredTarget.y + mouseRef.current.y * (parallaxY * 0.35),
      _desiredTarget.z
    );

    // 60fps smooth cinematic dampening
    const dampSpeed = 4.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetPos.x, dampSpeed, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetPos.y, dampSpeed, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetPos.z, dampSpeed, delta);

    currentTargetRef.current.x = THREE.MathUtils.damp(
      currentTargetRef.current.x,
      _targetLookAt.x,
      dampSpeed,
      delta
    );
    currentTargetRef.current.y = THREE.MathUtils.damp(
      currentTargetRef.current.y,
      _targetLookAt.y,
      dampSpeed,
      delta
    );
    currentTargetRef.current.z = THREE.MathUtils.damp(
      currentTargetRef.current.z,
      _targetLookAt.z,
      dampSpeed,
      delta
    );

    camera.lookAt(currentTargetRef.current);

    // Update projection matrix only when FOV delta is perceptible
    if (camera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(camera.fov - desiredFov) > 0.08) {
        camera.fov = THREE.MathUtils.damp(camera.fov, desiredFov, 3.5, delta);
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
};
