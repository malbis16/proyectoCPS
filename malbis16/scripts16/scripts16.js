document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".carousel .card");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let index = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % totalCards;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    // Auto-slide cada 4 segundos
    setInterval(() => {
        index = (index + 1) % totalCards;
        updateCarousel();
    }, 4000);

});
