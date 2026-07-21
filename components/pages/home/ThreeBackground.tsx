"use client";

import React from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const animationIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const nodeGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.4,
    });

    const nodeCount = 60;
    const nodes: THREE.Mesh[] = [];
    const connections: {
      line: THREE.Line;
      nodeA: THREE.Mesh;
      nodeB: THREE.Mesh;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      node.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
      );
      nodes.push(node);
      scene.add(node);
    }

    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.08,
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 4) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position,
          ]);
          const line = new THREE.Line(geometry, connectionMaterial);
          connections.push({ line, nodeA: nodes[i], nodeB: nodes[j] });
          scene.add(line);
        }
      }
    }

    camera.position.z = 8;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      nodes.forEach((node, index) => {
        node.rotation.x += 0.002;
        node.rotation.y += 0.002;
        node.position.y += Math.sin(Date.now() * 0.0004 + index * 0.01) * 0.005;
        node.position.x += Math.cos(Date.now() * 0.0002 + index * 0.01) * 0.003;
        const pulse = Math.sin(Date.now() * 0.0008 + index * 0.1) * 0.15 + 0.4;
        (node.material as THREE.MeshBasicMaterial).opacity = pulse;
      });

      connections.forEach(({ line, nodeA, nodeB }) => {
        const positions = line.geometry.attributes
          .position as THREE.BufferAttribute;
        positions.setXYZ(
          0,
          nodeA.position.x,
          nodeA.position.y,
          nodeA.position.z,
        );
        positions.setXYZ(
          1,
          nodeB.position.x,
          nodeB.position.y,
          nodeB.position.z,
        );
        positions.needsUpdate = true;
      });

      camera.position.x = Math.sin(Date.now() * 0.00008) * 3;
      camera.position.y = Math.cos(Date.now() * 0.00006) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nodes.forEach((node) => {
        scene.remove(node);
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });

      connections.forEach(({ line }) => {
        scene.remove(line);
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(16, 185, 129, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)",
      }}
    />
  );
};

export default ThreeBackground;
