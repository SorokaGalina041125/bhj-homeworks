// 1. Находим нужные элементы в DOM
const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

// 2. Создаем объект асинхронного запроса
const xhr = new XMLHttpRequest();

// 3. Настраиваем запрос: метод GET и адрес
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

// 4. Указываем формат ожидания ответа (чтобы браузер сам распарсил JSON)
xhr.responseType = 'json';

// 5. Регистрируем обработчик загрузки ответа
xhr.addEventListener('load', () => {
  // Проверяем успешно ли прошёл запрос (статус 200 OK)
  if (xhr.status === 200) {
    // 6. Скрываем анимацию загрузки
    loader.classList.remove('loader_active');

    // 7. Получаем объект валют
    const valutes = xhr.response.response.Valute;

    // 8. Очищаем контейнер перед добавлением данных
    itemsContainer.innerHTML = '';

    // 9. Перебираем все валюты
    for (const key in valutes) {
      if (valutes.hasOwnProperty(key)) {
        const currency = valutes[key];

        // Создаем HTML-элемент для валюты
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        itemElement.innerHTML = `
          <div class="item__code">${currency.CharCode}</div>
          <div class="item__value">${currency.Value}</div>
          <div class="item__currency">руб.</div>
        `;

        // Добавляем созданный элемент в контейнер #items
        itemsContainer.appendChild(itemElement);
      }
    }
  } else {
    console.error('Ошибка загрузки данных:', xhr.statusText);
  }
});

// Обработка возможной ошибки сети
xhr.addEventListener('error', () => {
  console.error('Произошла ошибка сети при попытке загрузить курсы валют.');
});

// 10. Отправляем запрос
xhr.send();