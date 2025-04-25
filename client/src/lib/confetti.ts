// Simple confetti effect implementation
export function triggerConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Set canvas size to match window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    angle: number;
    rotation: number;
    rotationSpeed: number;
  }
  
  const particles: Particle[] = [];
  const colors = ['#FF4B91', '#FF9B82', '#4CACBC', '#9C2C77'];
  
  // Create particles
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1
    });
  }
  
  // Animation function
  function animate() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let completed = true;
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      
      ctx.restore();
      
      p.y += p.speed;
      p.x += Math.sin(p.angle) * 2;
      p.rotation += p.rotationSpeed;
      
      if (p.y < canvas.height) {
        completed = false;
      }
    }
    
    if (!completed) {
      requestAnimationFrame(animate);
    }
  }
  
  // Start animation
  animate();
  
  // Handle window resize
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}
