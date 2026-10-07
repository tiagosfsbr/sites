const menu=document.querySelector('.menu'), links=document.querySelector('.navlinks');
const scrollVideo=document.getElementById('scrollVideo');
if(scrollVideo&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const slow=connection&&(connection.saveData||['slow-2g','2g','3g'].includes(connection.effectiveType)||(connection.downlink&&connection.downlink<1.5));
  let ready=false,intro=false,playing=false,until=0,lastY=scrollY;
  const stop=()=>{playing=false;scrollVideo.pause()};
  const endIntro=()=>{if(intro){intro=false;scrollVideo.pause()}};
  const fail=()=>{stop();scrollVideo.remove();document.body.classList.add('video-lite')};
  if(slow)fail();else{
    const timeout=setTimeout(()=>{if(!ready)fail()},8000);
    scrollVideo.addEventListener('loadeddata',()=>{clearTimeout(timeout);ready=true;scrollVideo.parentElement.classList.add('is-ready');if(scrollY<40){intro=true;scrollVideo.currentTime=0;scrollVideo.play().catch(endIntro);const tick=()=>{if(!intro)return;if(scrollVideo.currentTime>=Math.min(4,scrollVideo.duration)){endIntro();return}requestAnimationFrame(tick)};requestAnimationFrame(tick)}});
    scrollVideo.addEventListener('error',fail);
    addEventListener('scroll',()=>{const delta=scrollY-lastY;lastY=scrollY;if(Math.abs(delta)<1)return;endIntro();if(!ready)return;until=performance.now()+1000;if(!playing){playing=true;const loop=now=>{if(!ready||document.hidden||now>=until){stop();return}if(scrollVideo.paused)scrollVideo.play().catch(stop);requestAnimationFrame(loop)};requestAnimationFrame(loop)}},{passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
  }
}
menu?.addEventListener('click',()=>{const open=links.classList.toggle('mobile');menu.setAttribute('aria-expanded',open)});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('mobile')));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('leadForm')?.addEventListener('submit',event=>{event.preventDefault();const value=id=>document.getElementById(id).value.trim();const message=`Olá, Helvcont! Meu nome é ${value('nome')}.\nWhatsApp: ${value('telefone')}\nEmpresa: ${value('empresa')||'Não informado'}\nNecessidade: ${value('necessidade')||'Não informado'}`;window.open(`https://wa.me/5511992246080?text=${encodeURIComponent(message)}`,'_blank','noopener')});
