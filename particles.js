const particleColors = ['#ffd700', '#fff8e1', '#ff7f2a', '#fff', '#ffe5b4'];
const particleCount = 50;
const minSize = 8;
const maxSize = 22;
const speedRange = [0.2, 0.7];

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
    drift: randomBetween(-0.3, 0.3),
    phase: Math.random() * Math.PI * 2,
    aspect: randomBetween(0.5, 0.8)
  }));
}

function animateParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  let particles = createParticles(width, height);

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    particles = createParticles(width, height);
  }
  window.addEventListener('resize', resize);

  let lastTimestamp = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r, p.r * p.aspect, p.phase, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function update(dt) {
    for (const p of particles) {
      p.y += p.speed * dt * 0.06;
      p.x += Math.sin(Date.now() / 1200 + p.phase) * p.drift * dt * 0.03;
      
      // Wrap around screen edges
      if (p.x > width + p.r) p.x = -p.r;
      if (p.x < -p.r) p.x = width + p.r;
      if (p.y > height + p.r) p.y = -p.r;
      if (p.y < -p.r) p.y = height + p.r;
    }
  }

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

  // Set canvas to full screen
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  animateParticles(canvas);
}

document.addEventListener('DOMContentLoaded', setupParticleCanvas); 