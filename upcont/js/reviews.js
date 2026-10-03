(function(){
  var C=window.UPCONT_REVIEWS||{},items=(C.items||[]).filter(function(r){return r&&r.nome&&r.texto});
  var sec=document.getElementById('avaliacoes');if(!sec||!items.length)return;
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  var stars=function(n){n=Math.max(1,Math.min(5,Math.round(n||5)));return '<span class="stars" role="img" aria-label="'+n+' de 5 estrelas">'+'★'.repeat(n)+'<i>'+'★'.repeat(5-n)+'</i></span>'};
  var avg=items.reduce(function(a,r){return a+(+r.nota||5)},0)/items.length;
  document.getElementById('revSummary').innerHTML='<strong>'+avg.toFixed(1).replace('.',',')+'</strong>'+stars(avg)+'<small>'+items.length+(items.length>1?' avaliações':' avaliação')+'</small>';
  document.getElementById('revGrid').innerHTML=items.map(function(r){
    var ini=esc(r.nome.trim().split(/\s+/).map(function(p){return p[0]}).slice(0,2).join('').toUpperCase());
    return '<figure class="revCard reveal visible">'+stars(r.nota)+'<blockquote>“'+esc(r.texto)+'”</blockquote><figcaption><span class="revAv">'+ini+'</span><span><b>'+esc(r.nome)+'</b><small>'+esc([r.cargo,r.data].filter(Boolean).join(' · '))+'</small></span></figcaption></figure>';
  }).join('');
  var l=document.getElementById('revGoogle');if(C.googleUrl)l.href=C.googleUrl;else l.remove();
  sec.hidden=false;
})();