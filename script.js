let balance = 100;

const balanceEl = document.getElementById('balance');
const betEl = document.getElementById('bet');
const chosenNumberEl = document.getElementById('chosen-number');
const playBtn = document.getElementById('play-btn');
const resultEl = document.getElementById('result');

playBtn.addEventListener('click', () => {
    const bet = parseInt(betEl.value);
    const chosenNumber = parseInt(chosenNumberEl.value);

    if (isNaN(bet) || isNaN(chosenNumber) || bet <= 0 || chosenNumber < 1 || chosenNumber > 10) {
        resultEl.textContent = "Введите корректные ставку и число!";
        resultEl.className = "warning";
        return;
    }

    if (bet > balance) {
        resultEl.textContent = "Недостаточно средств!";
        resultEl.className = "warning";
        return;
    }

    // Генерация рандомного числа
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    // Логика выигрыша/проигрыша
    if (randomNumber === chosenNumber) {
        balance += bet; // Выигрыш: +100% от ставки
        resultEl.textContent = `Вы выиграли! Выпало число ${randomNumber}. Ваш баланс увеличен на ${bet}.`;
        resultEl.className = "success";
    } else {
        const diff = Math.abs(randomNumber - chosenNumber);
        const penalty = Math.min(diff * 10, 100); // Штраф максимум 100%
        const loss = (bet * penalty) / 100;

        balance -= loss;
        resultEl.textContent = `Вы проиграли. Выпало число ${randomNumber}. Потеря: ${Math.round(loss)}.`;
        resultEl.className = "failure";
    }

    // Обновление баланса
    if (balance <= 0) {
        balance = 0;
        resultEl.textContent += " Ваш баланс обнулён. Игра окончена.";
        resultEl.className = "failure";
    }

    balanceEl.textContent = `Баланс: ${Math.round(balance)}`;
});
