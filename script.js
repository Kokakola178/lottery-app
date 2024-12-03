let balance = 1000;

const balanceEl = document.getElementById('balance');
const betEl = document.getElementById('bet');
const chosenNumberEl = document.getElementById('chosen-number');
const playBtn = document.getElementById('play-btn');
const resultEl = document.getElementById('result');
const historyContent = document.getElementById('history-content');

playBtn.addEventListener('click', () => {
    const bet = parseInt(betEl.value);
    const chosenNumber = parseInt(chosenNumberEl.value);

    // Проверка ввода
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

    // Генерация случайного числа
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    // Логика выигрыша/проигрыша
    const diff = Math.abs(randomNumber - chosenNumber);
    if (diff === 0) {
        balance += bet * 2; // +200%
        resultEl.textContent = `Поздравляем! Вы угадали! Выпало ${randomNumber}. Баланс увеличен на ${bet * 2}.`;
        resultEl.style.color = "lime";
    } else if (diff === 1) {
        balance += bet * 0.5; // +50%
        resultEl.textContent = `Почти угадали! Выпало ${randomNumber}. Баланс увеличен на ${bet * 0.5}.`;
        resultEl.style.color = "green";
    } else if (diff === 2) {
        // Ничего не теряет
        resultEl.textContent = `Вы близко! Выпало ${randomNumber}. Баланс остался прежним.`;
        resultEl.style.color = "blue";
    } else if (diff === 3) {
        balance -= bet * 0.1; // -10%
        resultEl.textContent = `Вы немного ошиблись. Выпало ${randomNumber}. Потеря ${Math.round(bet * 0.1)}.`;
        resultEl.style.color = "orange";
    } else {
        balance -= bet * 0.5; // -50%
        resultEl.textContent = `Вы сильно ошиблись. Выпало ${randomNumber}. Потеря ${Math.round(bet * 0.5)}.`;
        resultEl.style.color = "red";
    }

    // Проверка на нулевой баланс
    if (balance <= 0) {
        balance = 0;
        resultEl.textContent += " Ваш баланс обнулён. Игра окончена.";
        resultEl.style.color = "red";
    }

    // Обновление баланса
    balanceEl.textContent = `Баланс: ${Math.round(balance)}`;

    // Добавление записи в историю
    addHistory(`Ставка: ${bet}, Число: ${chosenNumber}, Выпало: ${randomNumber}, Баланс: ${Math.round(balance)}`);
});

function addHistory(message) {
    const p = document.createElement('p');
    p.textContent = message;
    historyContent.prepend(p); // Добавляет запись в начало истории
}
