// Находим элементы кнопки и результата
const btn = document.getElementById('lottery-btn');
const result = document.getElementById('result');

// Добавляем обработчик события "клик" на кнопку
btn.addEventListener('click', () => {
    // Генерация случайного числа от 1 до 100
    const luckyNumber = Math.floor(Math.random() * 100) + 1;

    // Проверяем, выиграл ли пользователь
    if (luckyNumber > 90) {
        result.textContent = `Поздравляем! Вы выиграли с номером ${luckyNumber}! 🎉`;
    } else {
        result.textContent = `Ваш номер: ${luckyNumber}. Удача в следующий раз!`;
    }

    // Отправляем данные обратно в Telegram
    Telegram.WebApp.sendData(JSON.stringify({ number: luckyNumber }));
});

// Сообщаем Telegram, что приложение готово
Telegram.WebApp.ready();
