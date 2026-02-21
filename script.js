const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryTabContents = document.querySelectorAll('.gallery-tab-content');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        galleryTabs.forEach(t => t.classList.remove('active'));
        galleryTabContents.forEach(content => content.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

document.querySelector('.contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
});

const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = Array.from(carouselTrack.children);
const carouselPrevBtn = document.querySelector('.carousel-prev');
const carouselNextBtn = document.querySelector('.carousel-next');
const indicators = document.querySelectorAll('.indicator');

let currentSlideIndex = 0;
let slidesPerView = 1;

function updateSlidesPerView() {
    if (window.innerWidth >= 968) {
        slidesPerView = 3;
    } else if (window.innerWidth >= 640) {
        slidesPerView = 2;
    } else {
        slidesPerView = 1;
    }
}

function moveToSlide(targetIndex) {
    const maxIndex = Math.ceil(carouselSlides.length / slidesPerView) - 1;
    
    if (targetIndex < 0) {
        currentSlideIndex = maxIndex;
    } else if (targetIndex > maxIndex) {
        currentSlideIndex = 0;
    } else {
        currentSlideIndex = targetIndex;
    }
    
    const slideWidth = carouselSlides[0].getBoundingClientRect().width;
    const moveAmount = currentSlideIndex * slideWidth * slidesPerView;
    carouselTrack.style.transform = `translateX(-${moveAmount}px)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        }
    });
}

carouselPrevBtn.addEventListener('click', () => {
    moveToSlide(currentSlideIndex - 1);
});

carouselNextBtn.addEventListener('click', () => {
    moveToSlide(currentSlideIndex + 1);
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        moveToSlide(index);
    });
});

updateSlidesPerView();
window.addEventListener('resize', () => {
    updateSlidesPerView();
    moveToSlide(currentSlideIndex);
});

let autoSlideInterval = setInterval(() => {
    moveToSlide(currentSlideIndex + 1);
}, 5000);

document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        moveToSlide(currentSlideIndex + 1);
    }, 5000);
});
