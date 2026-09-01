// Находим элемент самой книги
const book = document.getElementById('book');

// 1. Управление размером шрифта
const fontSizeControls = Array.from(document.querySelectorAll('.font-size'));

fontSizeControls.forEach(control => {
  control.addEventListener('click', (event) => {
    event.preventDefault(); // Отменяем переход по ссылке

    // Убираем активный класс у всех кнопок размера
    fontSizeControls.forEach(item => item.classList.remove('font-size_active'));
    
    // Добавляем активный класс текущей кнопке
    control.classList.remove('font-size_active');
    control.classList.add('font-size_active');

    // Очищаем старые классы размера у книги
    book.classList.remove('book_fs-small', 'book_fs-big');

    // Получаем значение из data-size ("small" или "big")
    const size = control.dataset.size;
    if (size) {
      book.classList.add(`book_fs-${size}`);
    }
  });
});

// 2. Повышенный уровень: Управление цветом текста
const textColorControls = Array.from(document.querySelectorAll('.book__control_color .color'));

textColorControls.forEach(control => {
  control.addEventListener('click', (event) => {
    event.preventDefault();

    textColorControls.forEach(item => item.classList.remove('color_active'));
    control.classList.add('color_active');

    // Очищаем старые классы цвета текста у книги
    book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

    // Устанавливаем новый цвет из data-text-color
    const color = control.dataset.textColor;
    if (color) {
      book.classList.add(`book_color-${color}`);
    }
  });
});

// 3. Повышенный уровень: Управление цветом фона
const bgColorControls = Array.from(document.querySelectorAll('.book__control_background .color'));

bgColorControls.forEach(control => {
  control.addEventListener('click', (event) => {
    event.preventDefault();

    bgColorControls.forEach(item => item.classList.remove('color_active'));
    control.classList.add('color_active');

    // Очищаем старые классы фона у книги
    book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');

    // Устанавливаем новый фон из data-bg-color
    const bgColor = control.dataset.bgColor;
    if (bgColor) {
      book.classList.add(`book_bg-${bgColor}`);
    }
  });
});