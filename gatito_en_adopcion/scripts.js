document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const carouselContainer = document.getElementById("carousel-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let counter = 0;
    //const totalImages = carouselContainer.children.length;

    // Menu hamburguesa
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Carrusel de imágenes

    let currentIndex = 0;
    const totalItems = document.querySelectorAll(".carousel-item").length;

    // Carousel navigation
    nextButton.addEventListener("click", () => {
        if (currentIndex >= totalItems - 1) {
            currentIndex = 0; // Vuelve al inicio
        } else {
            currentIndex++;
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex <= 0) {
            currentIndex = totalItems - 1; // Vuelve al final
        } else {
            currentIndex--;
        }
        updateCarousel();
    });

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Sticky Header
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });
});
