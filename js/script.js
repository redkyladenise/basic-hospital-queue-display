const types = document.querySelectorAll('.card1, .card-div-1, .card-div-2');

var sound = new Audio();
sound.src = "assets/audio/announcement-sound.mp3";


types.forEach( room => {
    const typeTitle = room.querySelector('h2, .card-div-title p').innerText.trim();

    const parentCard = room.closest('.card2'); 
    const parentTitle = parentCard ? parentCard.querySelector('h2').innerText.trim() : ""; 

    let keyName;
    if (parentTitle !== typeTitle) {
        keyName = `queue_${parentTitle}_${typeTitle}`;
    } else {
        keyName = `queue_${parentTitle}`;
    }

    keyName = keyName.toLowerCase().replace(/\s+/g, '_');
    
    const display = room.querySelector('h1');
    const plusBtn = room.querySelector('.plus-btn');
    const minusBtn = room.querySelector('.minus-btn');
    const resetBtn = room.querySelector('.reset-btn');

    let savedCount = localStorage.getItem(keyName);
    let count = (savedCount) ? parseInt(savedCount) : 0;
    let visualTimer;

    plusBtn.addEventListener("click", () => {
        count++;
        updateDisplay();
        playSound();
        console.log(count);
        addVisual(room);
    });

    minusBtn.addEventListener("click", () => {
        if (count > 0) {
            count--;
            updateDisplay();
            playSound();
            console.log(count);
            removeVisual(room);
        }
    });

    resetBtn.addEventListener("click", () => {
        count = 0;
        updateDisplay();
        playSound();
        console.log(count);
        removeVisual(room);
    })

    function updateDisplay() {
        display.innerText = count;
        localStorage.setItem(keyName, count);
        if (count === 0) {
            minusBtn.style.cursor = "not-allowed";
            resetBtn.style.cursor = "not-allowed";
        } else {
            minusBtn.style.cursor = "pointer";
            resetBtn.style.cursor = "pointer";
        }
    }

    function playSound() {
        sound.currentTime = 0;
        sound.play();
    }

    function addVisual(element) {
        clearTimeout(visualTimer);

        element.classList.remove("remove-mode");
        element.classList.add("add-mode");

        visualTimer = setTimeout(() => {
            element.classList.remove("add-mode")}, 5000
        )
    }

    function removeVisual(element) {
        clearTimeout(visualTimer);

        element.classList.remove("add-mode");
        element.classList.add("remove-mode");

        visualTimer = setTimeout(() => {
            element.classList.remove("remove-mode")}, 5000
        )
    }

    updateDisplay();

})

const addAllBtn = document.querySelector(".add-all-btn");
const clearAllBtn = document.querySelector(".clear-all-btn");


addAllBtn.addEventListener("click", () => {
    let allPlusButtons = document.querySelectorAll('.plus-btn');
    allPlusButtons.forEach(add => (add.click()));
});

clearAllBtn.addEventListener("click", () => {
    let allResetButtons = document.querySelectorAll('.reset-btn');
    allResetButtons.forEach(reset => (reset.click()));
});


