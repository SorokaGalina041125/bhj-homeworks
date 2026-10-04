const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.responseType = 'json';

xhr.addEventListener('load', () => {
  if (xhr.status === 200) {
    const pollId = xhr.response.id;
    const pollData = xhr.response.data;

    pollTitle.textContent = pollData.title;
    pollAnswers.innerHTML = '';

    // Создаем кнопки с передачей их индекса
    pollData.answers.forEach((answerText, index) => {
      const button = document.createElement('button');
      button.classList.add('poll__answer');
      button.textContent = answerText;

      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
        // Вызываем функцию отправки голоса
        sendVote(pollId, index);
      });

      pollAnswers.appendChild(button);
    });
  }
});

xhr.send();

// Функция отправки POST-запроса с результатом
function sendVote(pollId, answerIndex) {
  const voteXhr = new XMLHttpRequest();
  voteXhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
  
  // Обязательно задаем заголовок формата данных
  voteXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  voteXhr.responseType = 'json';

  voteXhr.addEventListener('load', () => {
    if (voteXhr.status === 200 || voteXhr.status === 201) {
      const stat = voteXhr.response.stat;
      
      // Считаем общее количество голосов для вычисления процентов
      const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

      // Заменяем кнопки на список результатов
      pollAnswers.innerHTML = '';
      
      stat.forEach((item) => {
        const percent = ((item.votes / totalVotes) * 100).toFixed(2);
        const resultRow = document.createElement('div');
        resultRow.innerHTML = `<strong>${item.answer}:</strong> ${percent}% (${item.votes} голосов)`;
        pollAnswers.appendChild(resultRow);
      });
    }
  });

  // Отправляем тело запроса
  voteXhr.send(`vote=${pollId}&answer=${answerIndex}`);
}