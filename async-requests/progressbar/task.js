// 1. Находим элементы формы и индикатора прогресса
const form = document.getElementById('form');
const progress = document.getElementById('progress');

// 2. Навешиваем обработчик отправки формы
form.addEventListener('submit', (e) => {
  // Отменяем стандартное поведение формы (перезагрузку страницы)
  e.preventDefault();

  // 3. Создаем объект запроса
  const xhr = new XMLHttpRequest();

  // 4. Настраиваем отслеживание прогресса ОТПРАВКИ (xhr.upload!)
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      // Вычисляем долю загруженного файла (значение от 0.0 до 1.0)
      progress.value = event.loaded / event.total;
    }
  };

  // 5. Регистрируем завершение загрузки
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      alert('Файл успешно загружен!');
    } else {
      alert(`Ошибка загрузки: ${xhr.status}`);
    }
  };

  xhr.onerror = () => {
    alert('Произошла ошибка сети при отправке файла.');
  };

  // 6. Открываем POST-запрос
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

  // 7. Собираем данные формы (включая выбранный файл)
  const formData = new FormData(form);

  // 8. Отправляем данные на сервер
  xhr.send(formData);
});