const lapButton = document.getElementById('lap');
const playButton = document.getElementById('play');
const resetButton = document.getElementById('reset');
const clearButton = document.getElementById('clear-btn');
const minute = document.getElementById('minute');
const second = document.getElementById('sec');
const milisecond = document.getElementById('msec');
const laps = document.getElementById('laps');
const timingText = document.getElementById('timing-text');
const animationColor = document.getElementById('outer-circle')

let isPlay = false;
let isReset = false;
let sec;
let secCounter = 0;
let msec;
let msecCounter = 0;
let min;
let minCounter = 0;
let lapItem = 0;

const toggleButton = () => {
    lapButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        animationColor.classList.add('animate-bg');
        msec = setInterval(() => {
            if (msecCounter == 100) {
                msecCounter = 0;
            }
            milisecond.innerHTML = `&nbsp;${++msecCounter} `;
        }, 10);
        sec = setInterval(() => {
            if (secCounter == 60) {
                secCounter = 0;
            }
            second.innerHTML = `&nbsp;${++secCounter} : `;
        }, 1000);

        min = setInterval(() => {
            minute.innerHTML = `${++minCounter} : `;
        }, 60000);
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
        clearInterval(min);
        clearInterval(sec);
        clearInterval(msec);

        isPlay = false;
        isReset = false;
        animationColor.classList.remove('animate-bg');
    }
    toggleButton();
    timingText.classList.remove('hidden');
}

const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    second.innerHTML = "&nbsp;0 :";
    milisecond.innerHTML = "&nbsp;0";
    minute.innerHTML = "0 :"
    clearAll();

    timingText.classList.add('hidden');
}

const lap = () => {
    const li = document.createElement('li');
    const number = document.createElement('span');
    const timeStamp = document.createElement('span');

    li.setAttribute('class', 'lap-item');
    number.setAttribute('class', 'lap-number');
    timeStamp.setAttribute('class', 'lap-timestamp');

    number.innerHTML = `<i class="fa fa-flag" aria-hidden="true"></i> ${++lapItem}`;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${msecCounter}`;
    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove('hidden');
   
}

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.add('hidden');
    lapItem = 0;
    msecCounter = 0;
    secCounter = 0;
    minCounter = 0
}

playButton.addEventListener('click', () => {
    play();
});

resetButton.addEventListener('click', () => {
    reset();
});

lapButton.addEventListener('click', () => {
    lap();
});

clearButton.addEventListener('click', () => {
    clearAll();
});