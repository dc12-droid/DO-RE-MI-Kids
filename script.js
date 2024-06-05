document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});


let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Mostrar la primera imagen al cargar la página
showSlide(currentSlide);

function cambiarImagen() {
    const imagen1 = document.getElementById('imagen1');
    const imagen2 = document.getElementById('imagen2');
    
    imagen1.style.opacity = '0';
    imagen2.style.opacity = '1';
    imagen2.classList.remove('hidden');
    imagen1.classList.add('hidden');
}


const a = document.getElementById('playSound');
const audio = document.getElementById('audio');

a.addEventListener('click', function() {
    audio.play();
});



