// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
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
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Trigger initial animation
  setTimeout(animateOnScroll, 300);
});

window.addEventListener('scroll', animateOnScroll);

// Add hover and click effects for interactive elements
const interactiveElements = document.querySelectorAll('.project-card, .highlight-card, .certification-item, .education-item, .btn');
const waterDrop = document.createElement('div');
waterDrop.className = 'water-drop';
document.body.appendChild(waterDrop);

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
  // Hover effect
  element.addEventListener('mouseenter', (e) => {
    element.style.transform = 'translateY(-5px)';
    element.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.2)';
    
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
      ripple.remove();
    }, 1000);
  });
  
  // Reset on mouse leave
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translateY(0)';
    element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  });
  
  // Click effect
  element.addEventListener('click', (e) => {
    createWaterDrop(e.clientX, e.clientY);
  });
});

// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
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
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

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
