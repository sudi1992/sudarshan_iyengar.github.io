// Main initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize water drop effect
  initWaterDrop();
  
  // Hide loading screen when everything is loaded
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 500);
    }
  });
  
  // Set initial styles for fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in, .project-card, .timeline-item, .highlight-card, .certification-item, .education-item');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
  });
  
  // Initialize active navigation
  initActiveNavigation();
});

// Create floating particles
function initParticles() {
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
  
  createParticles();
}
// Initialize water drop effect
function initWaterDrop() {
  const waterDrop = document.getElementById('waterDrop');
  if (!waterDrop) return;
  
  let isActive = false;
  let timeout;
  
  const createRipple = (x, y) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 800);
  };
  
  const activateWaterDrop = (x, y) => {
    waterDrop.style.left = `${x}px`;
    waterDrop.style.top = `${y}px`;
    waterDrop.classList.add('active');
    isActive = true;
    
    // Create ripple effect
    createRipple(x, y);
    
    // Deactivate after animation
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      waterDrop.classList.remove('active');
      isActive = false;
    }, 800);
  };
  
  // Add mouse move listener for water drop effect
  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.3) { // Only trigger 30% of the time for performance
      activateWaterDrop(e.clientX, e.clientY);
    }
  });
  
  // Add touch support for mobile
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0 && Math.random() < 0.2) {
      const touch = e.touches[0];
      activateWaterDrop(touch.clientX, touch.clientY);
    }
  }, { passive: true });
  
  // Add click interaction
  document.addEventListener('click', (e) => {
    activateWaterDrop(e.clientX, e.clientY);
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .project-card, .timeline-item, .highlight-card, .certification-item, .education-item, .skill-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      if (isInViewport(bar)) {
        const width = bar.getAttribute('data-level');
        bar.style.width = width;
      }
    });
  };
  
  // Run once on load and then on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
}

/**
 * Initialize interactive elements with hover and click effects
 */
function initInteractiveElements() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.project-card, .highlight-card, .timeline-item, .certification-item, .education-item');
  cards.forEach(card => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn, .project-links a, .nav-link');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add any additional interactive elements here
  // Example: Tooltips, modals, etc.
}

// Initialize smooth scrolling with offset for fixed header
function initSmoothScrolling() {
  const navMenu = document.querySelector('.nav-menu');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.querySelector(`#${targetId}`);
    
    if (targetElement) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const headerOffset = 80;
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
            mobileMenuBtn.classList.remove('active');
          }
        }
        
        // Update URL without page jump
        history.pushState(null, null, `#${targetId}`);
      });
    }
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .project-card, .timeline-item, .highlight-card, .certification-item, .education-item, .skill-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      if (isInViewport(bar)) {
        const width = bar.getAttribute('data-level');
        bar.style.width = width;
      }
    });
  };
  
  // Run once on load and then on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
}

// Initialize back to top button
function initBackToTop() {
  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-level');
  
  skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    const progress = bar.querySelector('.skill-progress');
    
    if (isInViewport(bar) && !bar.classList.contains('animated')) {
      progress.style.width = level;
      bar.classList.add('animated');
    }
  });
}

// Check if element is in viewport
function isInViewport(element) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
    rect.bottom >= 0 &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Initialize skill bar animations on load and scroll
window.addEventListener('load', () => {
  animateSkillBars();
  window.addEventListener('scroll', animateSkillBars);
});
