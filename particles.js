const particleColors = ['#d4af37', '#8b4513'];
const particleCount = 8;
const minSize = 1;
const maxSize = 2;
const speedRange = [0.02, 0.08];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticles(width, height) {
  return Array.from({ length: particleCount }, () => ({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    r: randomBetween(minSize, maxSize),
    color: particleColors[Math.floor(Math.random() * particleColors.length)],
    speed: randomBetween(speedRange[0], speedRange[1]) * (Math.random() > 0.5 ? 1 : -1),
    drift: randomBetween(-0.05, 0.05),
    phase: Math.random() * Math.PI * 2,
    opacity: randomBetween(0.2, 0.6),
    pulse: randomBetween(0.5, 1.5)
  }));
}

function animateParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  let particles = createParticles(width, height);
  let time = 0;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    particles = createParticles(width, height);
  }
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    for (const p of particles) {
      ctx.save();
      
      // Create pulsing effect
      const pulseOpacity = p.opacity * (0.3 + 0.7 * Math.sin(time * 0.005 * p.pulse));
      ctx.globalAlpha = pulseOpacity;
      
      // Create gradient for each particle
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(0.5, p.color + '80');
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 15;
      ctx.fill();
      
      ctx.restore();
    }
  }

  function update(dt) {
    time += dt;
    
    for (const p of particles) {
      p.y += p.speed * dt * 0.03;
      p.x += Math.sin(time * 0.0005 + p.phase) * p.drift * dt * 0.01;
      
      // Wrap around screen edges
      if (p.x > width + p.r) p.x = -p.r;
      if (p.x < -p.r) p.x = width + p.r;
      if (p.y > height + p.r) p.y = -p.r;
      if (p.y < -p.r) p.y = height + p.r;
    }
  }

  let lastTimestamp = 0;

  function loop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

function setupParticleCanvas() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  // Set canvas to full screen with reduced opacity
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.15';

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  animateParticles(canvas);
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', setupParticleCanvas);

// Also initialize if the script is loaded after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupParticleCanvas);
} else {
  setupParticleCanvas();
} 