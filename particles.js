// Enhanced Cinematic Particle System
// Golden embers floating upward with subtle connections

const config = {
  particleCount: 60,
  colors: ['#d4af37', '#e5c45a', '#b8941f', '#f0d878', '#8b6914'],
  minSize: 1,
  maxSize: 4,
  minSpeed: 0.3,
  maxSpeed: 1.2,
  connectionDistance: 120,
  connectionOpacity: 0.15,
  mouseRadius: 150,
  mouseForce: 0.02
};

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvas.width;
    this.y = initial
      ? Math.random() * this.canvas.height
      : this.canvas.height + 20;
    this.size = config.minSize + Math.random() * (config.maxSize - config.minSize);
    this.speedY = -(config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed));
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    this.opacity = 0.1 + Math.random() * 0.6;
    this.targetOpacity = this.opacity;
    this.wobbleSpeed = 0.02 + Math.random() * 0.03;
    this.wobbleAmount = 30 + Math.random() * 40;
    this.wobbleOffset = Math.random() * Math.PI * 2;
    this.time = 0;
    this.glowSize = this.size * (2 + Math.random() * 2);
    this.twinkleSpeed = 0.5 + Math.random() * 2;
    this.twinklePhase = Math.random() * Math.PI * 2;
  }

  update(deltaTime, mouseX, mouseY) {
    this.time += deltaTime * 0.001;

    // Wobble movement
    const wobble = Math.sin(this.time * this.wobbleSpeed * 60 + this.wobbleOffset) * this.wobbleAmount * 0.01;
    this.x += this.speedX + wobble;
    this.y += this.speedY;

    // Mouse interaction
    if (mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.mouseRadius) {
        const force = (config.mouseRadius - distance) / config.mouseRadius;
        this.x += (dx / distance) * force * config.mouseForce * deltaTime;
        this.y += (dy / distance) * force * config.mouseForce * deltaTime;
        this.targetOpacity = Math.min(1, this.opacity + 0.3);
      } else {
        this.targetOpacity = this.opacity;
      }
    }

    // Twinkle effect
    const twinkle = 0.7 + 0.3 * Math.sin(this.time * this.twinkleSpeed + this.twinklePhase);
    this.currentOpacity = this.targetOpacity * twinkle;

    // Reset if off screen
    if (this.y < -20 || this.x < -20 || this.x > this.canvas.width + 20) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.currentOpacity;

    // Outer glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.glowSize
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.4, this.color + '60');
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();

    ctx.restore();
  }
}

class ParticleSystem {
  constructor(canvas, container) {
    this.canvas = canvas;
    this.container = container;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouseX = null;
    this.mouseY = null;
    this.lastTime = 0;

    this.init();
    this.setupEventListeners();
    this.animate(0);
  }

  init() {
    this.resize();
    for (let i = 0; i < config.particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    // Reinitialize particles on resize
    this.particles.forEach(p => p.reset(true));
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resize());

    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.container.addEventListener('mouseleave', () => {
      this.mouseX = null;
      this.mouseY = null;
    });
  }

  drawConnections() {
    this.ctx.strokeStyle = config.colors[0];
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity;
          this.ctx.save();
          this.ctx.globalAlpha = opacity * Math.min(this.particles[i].currentOpacity, this.particles[j].currentOpacity);
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections first (behind particles)
    this.drawConnections();

    // Update and draw particles
    for (const particle of this.particles) {
      particle.update(deltaTime, this.mouseX, this.mouseY);
      particle.draw(this.ctx);
    }

    requestAnimationFrame((t) => this.animate(t));
  }
}

// Initialize
function setupParticleCanvas() {
  const canvas = document.getElementById('particles');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero) return;

  // Style the canvas - positioned within hero section
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';
  canvas.style.pointerEvents = 'none';

  new ParticleSystem(canvas, hero);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupParticleCanvas);
} else {
  setupParticleCanvas();
}
