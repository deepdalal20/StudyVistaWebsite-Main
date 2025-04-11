import { useEffect, MutableRefObject } from 'react';

export function useGlobe(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  containerRef: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || typeof THREE === 'undefined') return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      canvas 
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e3a8a,
      emissive: 0x112244,
      specular: 0x333333,
      shininess: 25
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Create Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(5.3, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Add some lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    camera.position.z = 10;
    
    // Add Countries as dots
    const countries = [
      { lat: 37.0902, lng: -95.7129, name: 'USA' },
      { lat: 51.5074, lng: -0.1278, name: 'UK' },
      { lat: -25.2744, lng: 133.7751, name: 'Australia' },
      { lat: 56.1304, lng: -106.3468, name: 'Canada' },
      { lat: -40.9006, lng: 174.8860, name: 'New Zealand' },
      { lat: 1.3521, lng: 103.8198, name: 'Singapore' }
    ];
    
    countries.forEach(country => {
      // Convert lat/lng to 3D coordinates
      const phi = (90 - country.lat) * (Math.PI / 180);
      const theta = (country.lng + 180) * (Math.PI / 180);
      
      const x = -5 * Math.sin(phi) * Math.cos(theta);
      const y = 5 * Math.cos(phi);
      const z = 5 * Math.sin(phi) * Math.sin(theta);
      
      // Create dot
      const dotGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      
      dot.position.set(x, y, z);
      scene.add(dot);
    });
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      earth.rotation.y += 0.003;
      atmosphere.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      // Clean up scene resources
      scene.clear();
      earthMaterial.dispose();
      earthGeometry.dispose();
      atmosphereMaterial.dispose();
      atmosphereGeometry.dispose();
      renderer.dispose();
    };
  }, [canvasRef, containerRef]);
}
