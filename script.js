let balance = 100;
const balanceEl = document.getElementById('balance');
const betEl = document.getElementById('bet');
const chosenNumberEl = document.getElementById('chosen-number');
const playBtn = document.getElementById('play-btn');
const resultEl = document.getElementById('result');
const historyContent = document.getElementById('history-content');

playBtn.addEventListener('click', () => {
    const bet = parseInt(betEl.value);
    const chosenNumber = parseInt(chosenNumberEl.value);

    if (isNaN(bet) || isNaN(chosenNumber) || bet <= 0 || chosenNumber < 1 || chosenNumber > 10) {
        resultEl.textContent = "Введите корректные ставку и число!";
        resultEl.style.color = "yellow";
        return;
    }

    if (bet > balance) {
        resultEl.textContent = "Недостаточно средств!";
        resultEl.style.color = "orange";
        return;
    }

    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (randomNumber === chosenNumber) {
        balance += bet;
        resultEl.textContent = `Вы выиграли! Выпало ${randomNumber}. Ваш баланс увеличен на ${bet}.`;
        resultEl.style.color = "lime";
        addHistory(`Выигрыш! Ставка: ${bet}, Число: ${chosenNumber}, Выпало: ${randomNumber}`);
    } else {
        const diff = Math.abs(randomNumber - chosenNumber);
        const penalty = Math.min(diff * 10, 100);
        const loss = (bet * penalty) / 100;
        balance -= loss;

        resultEl.textContent = `Вы проиграли. Выпало ${randomNumber}. Потеря: ${Math.round(loss)}.`;
        resultEl.style.color = "red";
        addHistory(`Проигрыш. Ставка: ${bet}, Число: ${chosenNumber}, Выпало: ${randomNumber}`);
    }

    if (balance <= 0) {
        balance = 0;
        resultEl.textContent += " Баланс обнулён. Игра окончена.";
        resultEl.style.color = "red";
    }

    balanceEl.textContent = `Баланс: ${Math.round(balance)}`;
});

function addHistory(message) {
    const p = document.createElement('p');
    p.textContent = message;
    historyContent.prepend(p); // Добавляет запись в начало истории
}
