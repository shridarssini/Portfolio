// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
    const curr = html.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
function updateActive() {
    const y = window.scrollY + 120;
    sections.forEach(s => {
        const top = s.offsetTop;
        const h = s.offsetHeight;
        const id = s.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', y >= top && y < top + h);
        }
    });
}
window.addEventListener('scroll', updateActive);

// Scroll reveal
function reveal() {
    const els = document.querySelectorAll(
        '.stat-item, .about-grid, .about-info-block, ' +
        '.skills-category, .skill-progress-section, .project-card, ' +
        '.resume-block, .contact-row, .contact-form'
    );
    els.forEach(el => {
        if (!el.classList.contains('fade-up')) el.classList.add('fade-up');
        if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('visible');
    });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Skill progress bars
function animateBars() {
    document.querySelectorAll('.progress-fill').forEach(bar => {
        if (bar.getBoundingClientRect().top < window.innerHeight - 40) {
            bar.classList.add('animated');
        }
    });
}
window.addEventListener('scroll', animateBars);
window.addEventListener('load', animateBars);

// Contact form
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = 'Sent! &#10003;';
            form.reset();
            setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2500);
        }, 1200);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
