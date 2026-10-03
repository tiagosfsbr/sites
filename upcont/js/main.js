if('scrollRestoration' in history)history.scrollRestoration='manual';
if(location.hash)history.replaceState(null,'',location.pathname+location.search);
function goTop(){document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0);document.documentElement.style.scrollBehavior=''}
goTop();
window.addEventListener('load',goTop);
window.addEventListener('pageshow',e=>{if(e.persisted)goTop()});
const scrollVideo=document.getElementById('scrollVideo');
if(scrollVideo&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
const CFG=Object.assign({introSeconds:4,introMaxScrollY:40,coastSeconds:1,playbackRate:1,playOnScrollUp:true,minScrollDelta:1,loadTimeoutMs:8000},window.VIDEO_CONFIG);
let videoReady=false,introActive=false,loopOn=false,playUntil=0,lastY=window.scrollY;
function safePlay(){const pr=scrollVideo.play();if(pr&&pr.catch)pr.catch(()=>{})}
function stopVideo(){loopOn=false;scrollVideo.pause()}
function endIntro(){if(!introActive)return;introActive=false;scrollVideo.pause()}
function introTick(){
if(!introActive)return;
if(scrollVideo.currentTime>=Math.min(CFG.introSeconds,scrollVideo.duration))return endIntro();
window.requestAnimationFrame(introTick);
}
function startIntro(){
if(CFG.introSeconds<=0||window.scrollY>CFG.introMaxScrollY)return;
scrollVideo.currentTime=0;
introActive=true;
const pr=scrollVideo.play();
if(pr&&pr.catch)pr.catch(()=>{introActive=false});
window.requestAnimationFrame(introTick);
}
function videoLoop(now){
if(!videoReady||document.hidden||introActive||now>=playUntil){stopVideo();return}
if(scrollVideo.paused)safePlay();
window.requestAnimationFrame(videoLoop);
}
function onScroll(){
const y=window.scrollY,delta=y-lastY;
if(Math.abs(delta)<CFG.minScrollDelta)return;
lastY=y;
endIntro();
if(!videoReady)return;
if(delta<0&&!CFG.playOnScrollUp)return;
playUntil=performance.now()+CFG.coastSeconds*1000;
if(!loopOn){loopOn=true;window.requestAnimationFrame(videoLoop)}
}
scrollVideo.playbackRate=CFG.playbackRate;
const loadTimer=CFG.loadTimeoutMs>0?setTimeout(()=>{if(!videoReady){stopVideo();window.videoLite()}},CFG.loadTimeoutMs):0;
scrollVideo.addEventListener('loadeddata',()=>{
clearTimeout(loadTimer);
videoReady=true;
scrollVideo.parentElement.classList.add('is-ready');
document.body.classList.add('scroll-video-ready');
startIntro();
});
scrollVideo.addEventListener('error',()=>{clearTimeout(loadTimer);window.videoLite()});
scrollVideo.addEventListener('error',()=>console.error('Não foi possível carregar o vídeo de fundo:',scrollVideo.currentSrc,scrollVideo.error));
window.addEventListener('scroll',onScroll,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopVideo()});
}function brl(v){return 'R$ '+Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function calcDas(){const anexo=document.getElementById('anexo').value,rbt=Math.max(0,Number(document.getElementById('rbt').value)||0),mes=Math.max(0,Number(document.getElementById('mes').value)||0);const tables={I:[[180000,.04,0],[360000,.073,5940],[720000,.095,13860],[1800000,.107,22500],[3600000,.143,87300],[4800000,.19,378000]],III:[[180000,.06,0],[360000,.112,9360],[720000,.135,17640],[1800000,.16,35640],[3600000,.21,125640],[4800000,.33,648000]]};let base=rbt||mes*12,row=tables[anexo].find(r=>base<=r[0])||tables[anexo][5];if(base>4800000){document.getElementById('aliq').textContent='—';document.getElementById('das').textContent='—';document.getElementById('calcNote').textContent='Acima de R$ 4,8 milhões, a empresa não permanece no Simples Nacional.';return}let ef=Math.max(0,(base*row[1]-row[2])/base);document.getElementById('aliq').textContent=(ef*100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';document.getElementById('das').textContent=brl(mes*ef);document.getElementById('calcNote').textContent=base>3600000?'Nesta faixa, podem existir tributos recolhidos fora do DAS conforme a atividade.':'Simulação estimativa — confirme o cálculo com um especialista UpCont.'}
document.querySelectorAll('.faqQ').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.classList.toggle('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('leadForm').addEventListener('submit',e=>{e.preventDefault();const nome=document.getElementById('nome').value.trim(),tel=document.getElementById('telefone').value.trim(),empresa=document.getElementById('empresa').value.trim(),fat=document.getElementById('faturamento').value,nec=document.getElementById('necessidade').value.trim()||'Não informado';const msg=`Olá, UpCont! Meu nome é ${nome}.\nWhatsApp: ${tel}\nEmpresa: ${empresa||'Não informado'}\nFaturamento: ${fat}\nNecessidade: ${nec}`;window.open('https://wa.me/5546991403703?text='+encodeURIComponent(msg),'_blank','noopener');});
