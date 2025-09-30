// Wait for the DOM to be fully loaded
// Create floating particles
document.addEventListener('DOMContentLoaded', () => {
  // Create particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  // Generate particles
  function createParticles() {
    const particleCount = 30;
    const container = document.querySelector('.particles');
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      
      // Random position
      const posX = Math.random() * 100;
      const delay = Math.random() * 15; // Random delay up to 15s
      const duration = 15 + Math.random() * 15; // Duration between 15-30s
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.3;
      
      container.appendChild(particle);
    }
  }
  
  // Initialize particles
  createParticles();
  // Hide loading screen when everything is loaded
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      
      // Remove loading screen from DOM after animation completes
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }
    
    // Trigger initial animations
    setTimeout(animateOnScroll, 300);
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', 
        mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .project-card, .timeline-item');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

  // Set initial styles for fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in, .project-card, .timeline-item, .highlight-card, .certification-item, .education-item');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
  });
  
  // Initialize interactive elements
  initInteractiveElements();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize scroll animations
  window.addEventListener('scroll', animateOnScroll);
  
  // Initialize skill bars
  window.addEventListener('scroll', animateSkillBars);
  window.addEventListener('load', animateSkillBars);
});

window.addEventListener('scroll', animateOnScroll);

/**
 * Initialize interactive elements with hover and click effects
 */
function initInteractiveElements() {
  const interactiveElements = document.querySelectorAll('.project-card, .highlight-card, .certification-item, .education-item, .btn');
  const waterDrop = document.getElementById('waterDrop');
  
  if (!waterDrop) return;

  // Function to create water drop effect
  const createWaterDrop = (x, y) => {
    waterDrop.style.left = `${x}px`;
    waterDrop.style.top = `${y}px`;
    waterDrop.classList.remove('active');
    void waterDrop.offsetWidth; // Trigger reflow
    waterDrop.classList.add('active');
  };

  // Add effects to interactive elements
  interactiveElements.forEach(element => {
    // Only add event listeners if the element is not disabled
    if (element.classList.contains('disabled') || element.getAttribute('disabled') === '') {
      return;
    }

    // Hover effect
    element.addEventListener('mouseenter', (e) => {
      element.style.transform = 'translateY(-5px) scale(1.01)';
      element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.1)';
      
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      element.appendChild(ripple);
      
      // Position ripple at cursor
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode === element) {
          element.removeChild(ripple);
        }
      }, 1000);
    });
    
    // Reset on mouse leave
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0) scale(1)';
      element.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
    
    // Click effect
    element.addEventListener('click', (e) => {
      createWaterDrop(e.clientX, e.clientY);
    });
  });
}

/**
 * Initialize smooth scrolling with offset for fixed header
 */
function initSmoothScrolling() {
  const navMenu = document.querySelector('.nav-menu');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just a # link
      if (targetId === '#' || targetId === '') {
        e.preventDefault();
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
}

// Add animation for skill bars
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-level');
  
  skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    const progress = bar.querySelector('.skill-progress');
    
    if (isInViewport(bar) && !bar.classList.contains('animated')) {
      progress.style.width = level;
      bar.classList.add('animated');
    }
  });
};

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);
