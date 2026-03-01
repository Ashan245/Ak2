// Typing Effect
const typingElement = document.querySelector('.typing');
const words = ['Graphic Designer', 'Web Developer', 'UI/UX Designer', 'Creative Thinker'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

// Start typing effect
if (typingElement) {
  setTimeout(typeEffect, 1000);
}

// Smooth scroll function
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Contact functions
function openWhatsApp() {
  // Replace with your WhatsApp number (Sri Lanka format: 94XXXXXXXXX)
  window.open("https://wa.me/94771234567", "_blank");
}

function openLinkedIn() {
  window.open("https://linkedin.com/in/ashan-renuja", "_blank");
}

function openGmail() {
  window.location.href = "mailto:ashan.renuja@example.com";
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active menu highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
  if (animated) return;
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    
    const updateCount = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.ceil(current);
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCount();
  });
  
  animated = true;
}

// Trigger stats animation when about section is visible
const aboutSection = document.getElementById('about');
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
    }
  });
}, observerOptions);

if (aboutSection) {
  observer.observe(aboutSection);
}

// Progress bars animation
const progressBars = document.querySelectorAll('.progress');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
  progressObserver.observe(bar);
});

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter items
    const filter = button.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
