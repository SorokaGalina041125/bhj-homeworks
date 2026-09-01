// Находим все ротаторы на странице (чтобы поддерживать несколько ротаторов)
const rotators = Array.from(document.querySelectorAll('.rotator'));

rotators.forEach(rotator => {
  // Получаем все спаны-кейсы внутри конкретного ротатора
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  
  // Ищем текущий активный элемент (или берем первый по умолчанию)
  let currentIndex = cases.findIndex(item => item.classList.contains('rotator__case_active'));
  if (currentIndex === -1) currentIndex = 0;

  function rotate() {
    // 1. Убираем класс активности у текущего элемента
    const currentCase = cases[currentIndex];
    currentCase.classList.remove('rotator__case_active');

    // 2. Вычисляем индекс следующего элемента (бесконечный круг)
    currentIndex = (currentIndex + 1) % cases.length;
    const nextCase = cases[currentIndex];

    // 3. Устанавливаем цвет текста из data-color (если задан)
    if (nextCase.dataset.color) {
      nextCase.style.color = nextCase.dataset.color;
    }

    // 4. Добавляем класс активности следующему элементу
    nextCase.classList.add('rotator__case_active');

    // 5. Получаем скорость из data-speed текущего (нового) элемента или ставим 1000 мс по умолчанию
    const speed = nextCase.dataset.speed ? Number(nextCase.dataset.speed) : 1000;

    // 6. Планируем следующий шаг переключения через setTimeout
    setTimeout(rotate, speed);
  }

  // Задаём цвет для самого первого активного элемента при старте
  if (cases[currentIndex].dataset.color) {
    cases[currentIndex].style.color = cases[currentIndex].dataset.color;
  }

  // Получаем начальную скорость и запускаем ротатор
  const initialSpeed = cases[currentIndex].dataset.speed ? Number(cases[currentIndex].dataset.speed) : 1000;
  setTimeout(rotate, initialSpeed);
});