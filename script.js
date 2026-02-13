const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainImage = document.getElementById("mainImage");
const heartsContainer = document.getElementById("hearts");
const responseText = document.getElementById("responseText");
const titleText = document.getElementById("titleText");

const noTexts = [
    "Are u sure? 🥺",
    "Really sure? 😢",
    "Think again... 💔",
    "Please? 🥹",
    "Don't break my heart 💕",
    "Last chance... 😭",
    "Are you absolutely sure? 😭💔"
];

const noImages = [
    "images/cat1.jpg",
    "images/cat2.jpg",
    "images/cat3.jpg",
    "images/cat4.jpeg",
    "images/cat5.jpg",
    "images/cat6.jpg",
    "images/cat7.jpg"
];

let noClickCount = 0;

function changeImageSmooth(newSrc) {
    // Jeśli klikamy szybko, anuluj poprzednie animacje
    mainImage.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    // FADE OUT (zanikanie starego obrazu)
    mainImage.style.opacity = "0";
    mainImage.style.transform = "scale(0.98)";

    setTimeout(() => {
        // Zmiana obrazka DOPIERO po zaniknięciu
        mainImage.src = newSrc;

        // Małe opóźnienie, żeby przeglądarka zarejestrowała nowy obraz
        setTimeout(() => {
            // FADE IN (płynne pojawienie się nowego obrazu)
            mainImage.style.opacity = "1";
            mainImage.style.transform = "scale(1)";
        }, 50);

    }, 300); // musi być równe czasowi fade-out
}




// Function to move NO button randomly
function moveNoButton() {
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const padding = 20;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}



// NO button click logic

let hasEscaped = false;

noBtn.addEventListener("click", () => {
    noClickCount++;

    // Zmiana tekstu (w pętli)
    const textIndex = noClickCount % noTexts.length;
    noBtn.textContent = noTexts[textIndex];

    // Zmiana obrazka
    const imageIndex = noClickCount % noImages.length;
    changeImageSmooth(noImages[imageIndex]);

    // Tylko przy pierwszym kliknięciu:
    // zamieniamy na fixed, ALE zachowujemy obecną pozycję (bez skoku)
    if (!hasEscaped) {
        const rect = noBtn.getBoundingClientRect();

        noBtn.style.position = "fixed";
        noBtn.style.left = rect.left + "px";
        noBtn.style.top = rect.top + "px";

        hasEscaped = true;
    }

    moveNoButton();
});



// YES button click logic
yesBtn.addEventListener("click", () => {
    // Płynne zniknięcie napisu
    titleText.style.opacity = "0";
    titleText.style.transform = "translateY(-10px)";

    // Po chwili całkowicie usuń z układu (żeby nie zajmował miejsca)
    setTimeout(() => {
        titleText.style.display = "none";
    }, 400);

    // Zmiana obrazka (smooth)
    changeImageSmooth("images/yes.png");

    // Ukrycie przycisków
    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    // Tekst odpowiedzi
    responseText.textContent = "YAY!!! 💖💖💖";

    // Serduszka
    createHearts();
});


// Create flying hearts animation
function createHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");

        // Różne rodzaje serc (ładniejszy efekt)
        const heartTypes = ["💖", "💘", "💕", "💗", "💓"];
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];

        // Losowa pozycja pozioma
        heart.style.left = Math.random() * 100 + "vw";

        // DUŻO większe serca (40px–80px)
        const size = Math.random() * 40 + 40;
        heart.style.fontSize = size + "px";

        // Wolniejsza i bardziej romantyczna animacja
        const duration = Math.random() * 2 + 4; // 4–6 sekund
        heart.style.animationDuration = duration + "s";

        heartsContainer.appendChild(heart);

        // Usuwanie po animacji (ważne dla wydajności)
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 180); // częstotliwość serc
}


// Ustawienie początkowej pozycji NO obok YES (bez teleportu)
function setInitialNoPosition() {
    const yesRect = yesBtn.getBoundingClientRect();

    // ustawiamy "No" obok "Yes"
    noBtn.style.left = `${yesRect.right + 20}px`;
    noBtn.style.top = `${yesRect.top}px`;
}

// Uruchom po załadowaniu strony
window.addEventListener("load", setInitialNoPosition);
window.addEventListener("resize", setInitialNoPosition);

