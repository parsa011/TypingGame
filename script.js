const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const scoreDisplay = document.querySelector('#score span');
const dataDisplay = document.querySelector('#data ul');
let score = 0;

quoteInputElement.addEventListener('input', () => {
    const arrayOfQoute = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;

    arrayOfQoute.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    });

    if (correct) {
        const text = quoteDisplayElement.innerText;
        let time  = timerElement.innerText;
        let WordCount = text.split(' ').length;
        var html = document.createElement('li');
        html.setAttribute('data-text',text);
        html.addEventListener('click',function(){
            alert(html.getAttribute('data-text'));
        });
        html.innerHTML = 'time was : ' + time + ' with ' + WordCount + 'word';
        dataDisplay.append(html);
        renderNewQuote();
        increaseScore();
    }
});

function increaseScore() {
    score++;
    scoreDisplay.innerText = score;
}

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(charachter => {
        const cahrachterSpan = document.createElement('span');
        cahrachterSpan.innerText = charachter;
        quoteDisplayElement.appendChild(cahrachterSpan);
    });
    quoteInputElement.value = null;
    startTimer();
}

let startTime;

function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote();