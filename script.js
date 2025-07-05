const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const closeMenu = document.getElementById('closeMenu');
const navOverlay = document.getElementById('navOverlay');
const sections = document.querySelectorAll('section');
const navLinkElements = document.querySelectorAll('.nav-link');

function changeNavbarStyle() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function highlightActiveNavLink() {
    let currentActive = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentActive = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(currentActive)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    changeNavbarStyle();
    highlightActiveNavLink();
});

document.addEventListener('DOMContentLoaded', () => {
    changeNavbarStyle();
    highlightActiveNavLink();
});

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.add('mobile-active', 'open');
    navOverlay.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('open');
    setTimeout(() => {
        navLinks.classList.remove('mobile-active');
        navOverlay.classList.remove('active');
    }, 300);
});

navOverlay.addEventListener('click', () => {
    navLinks.classList.remove('open');
    setTimeout(() => {
        navLinks.classList.remove('mobile-active');
        navOverlay.classList.remove('active');
    }, 300);
});

navLinkElements.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - navbar.offsetHeight + 1;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        if (navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('open');
            setTimeout(() => {
                navLinks.classList.remove('mobile-active');
                navOverlay.classList.remove('active');
            }, 300);
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('mobile-active', 'open');
        navOverlay.classList.remove('active');
    }
    highlightActiveNavLink();
});
