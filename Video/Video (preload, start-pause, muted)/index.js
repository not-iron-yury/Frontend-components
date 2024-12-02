const video = document.querySelector('.videoblock__video');

if (video) {
  const playButton = document.querySelector('.videoblock__play-btn');
  const muteButton = document.querySelector('.videoblock__btn-muted');
  const contentBlock = document.querySelector('.videoblock__content');

  video.addEventListener('click', e => {
    if (video.paused) {
      video.play();
      playButton.style.display = 'none';
    } else {
      video.pause();
      playButton.style.display = 'flex';
    }
  });

  playButton.addEventListener('click', () => {
    video.play();
    playButton.style.display = 'none';
    contentBlock.classList.add('active');
  });

  muteButton.addEventListener('click', () => {
    video.muted = !video.muted;
    muteButton.classList.toggle('active');
  });
}
