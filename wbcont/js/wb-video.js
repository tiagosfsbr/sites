const scrollVideo = document.getElementById('scrollVideo');

if (scrollVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const config = Object.assign({
    introSeconds: 4,
    introMaxScrollY: 40,
    coastSeconds: 1,
    playbackRate: 1,
    playOnScrollUp: true,
    minScrollDelta: 1,
    loadTimeoutMs: 8000,
  }, window.VIDEO_CONFIG);
  let videoReady = false;
  let introActive = false;
  let loopOn = false;
  let playUntil = 0;
  let lastY = window.scrollY;

  function stopVideo() {
    loopOn = false;
    scrollVideo.pause();
  }

  function endIntro() {
    if (!introActive) return;
    introActive = false;
    scrollVideo.pause();
  }

  function startIntro() {
    if (config.introSeconds <= 0 || window.scrollY > config.introMaxScrollY) return;
    scrollVideo.currentTime = 0;
    introActive = true;
    const playback = scrollVideo.play();
    if (playback?.catch) playback.catch(() => { introActive = false; });

    function introTick() {
      if (!introActive) return;
      if (scrollVideo.currentTime >= Math.min(config.introSeconds, scrollVideo.duration)) {
        endIntro();
        return;
      }
      window.requestAnimationFrame(introTick);
    }

    window.requestAnimationFrame(introTick);
  }

  function videoLoop(now) {
    if (!videoReady || document.hidden || introActive || now >= playUntil) {
      stopVideo();
      return;
    }
    if (scrollVideo.paused) {
      const playback = scrollVideo.play();
      if (playback?.catch) playback.catch(() => {});
    }
    window.requestAnimationFrame(videoLoop);
  }

  function onScroll() {
    const y = window.scrollY;
    const delta = y - lastY;
    if (Math.abs(delta) < config.minScrollDelta) return;
    lastY = y;
    endIntro();
    if (!videoReady || (delta < 0 && !config.playOnScrollUp)) return;
    playUntil = performance.now() + config.coastSeconds * 1000;
    if (!loopOn) {
      loopOn = true;
      window.requestAnimationFrame(videoLoop);
    }
  }

  scrollVideo.playbackRate = config.playbackRate;
  const loadTimer = config.loadTimeoutMs > 0
    ? window.setTimeout(() => {
      if (!videoReady) {
        stopVideo();
        window.videoLite();
      }
    }, config.loadTimeoutMs)
    : 0;

  scrollVideo.addEventListener('loadeddata', () => {
    window.clearTimeout(loadTimer);
    videoReady = true;
    scrollVideo.parentElement.classList.add('is-ready');
    document.body.classList.add('scroll-video-ready');
    startIntro();
  });
  scrollVideo.addEventListener('error', () => {
    window.clearTimeout(loadTimer);
    window.videoLite();
    console.error('Não foi possível carregar o vídeo de fundo:', scrollVideo.currentSrc, scrollVideo.error);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopVideo();
  });
}
