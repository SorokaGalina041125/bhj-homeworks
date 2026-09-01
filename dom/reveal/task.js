const reveals = Array.from(document.querySelectorAll('.reveal'));

function checkReveal() {
  const windowHeight = window.innerHeight;

  reveals.forEach(reveal => {
    const { top, bottom } = reveal.getBoundingClientRect();

    if (top < windowHeight && bottom > 0) {
      reveal.classList.add('reveal_active');
    } else {
      reveal.classList.remove('reveal_active');
    }
  });
}

window.addEventListener('scroll', checkReveal);
checkReveal();