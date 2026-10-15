(function(){
  var C = window.UPCONT_REVIEWS || {},
      items = (C.items || []).filter(function(r){ return r && r.nome && r.texto; });
  var sec = document.getElementById('avaliacoes');
  if (!sec || !items.length) return;

  var esc = function(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };

  var googleIcon = '<svg class="gIcon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
    '<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>' +
    '<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>' +
    '<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>' +
    '<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>' +
    '</svg>';

  var stars = function(n){
    n = Math.max(1, Math.min(5, Math.round(n || 5)));
    return '<span class="stars" role="img" aria-label="' + n + ' de 5 estrelas">' +
      '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i></span>';
  };

  var avg = items.reduce(function(a, r){ return a + (+r.nota || 5); }, 0) / items.length;

  var totalCount = C.totalReviews || 17;

  var summaryHtml = '<div class="revSummaryBadge">' +
    googleIcon +
    '<div class="revSummaryData">' +
      '<div class="revSummaryTop"><strong>' + avg.toFixed(1).replace('.', ',') + '</strong>' + stars(avg) + '</div>' +
      '<small>Avaliações no Google (' + totalCount + ' avaliações)</small>' +
    '</div>' +
  '</div>';

  var summaryEl = document.getElementById('revSummary');
  if (summaryEl) summaryEl.innerHTML = summaryHtml;

  var gridEl = document.getElementById('revGrid');
  if (gridEl) {
    gridEl.innerHTML = items.map(function(r){
      var ini = esc(r.nome.trim().split(/\s+/).map(function(p){ return p[0]; }).slice(0, 2).join('').toUpperCase());
      var avatar = r.foto
        ? '<img class="revAv" src="' + esc(r.foto) + '" alt="' + esc(r.nome) + '" loading="lazy" width="44" height="44" onerror="this.outerHTML=\'<span class=\\\'revAv\\\'>' + ini + '</span>\'">'
        : '<span class="revAv">' + ini + '</span>';

      return '<figure class="revCard reveal visible">' +
        '<div class="revCardHeader">' +
          stars(r.nota) +
          '<span class="revGoogleBadge" title="Avaliação verificada no Google">' + googleIcon + '<small>Google</small></span>' +
        '</div>' +
        '<blockquote>“' + esc(r.texto) + '”</blockquote>' +
        '<figcaption>' +
          avatar +
          '<div>' +
            '<b>' + esc(r.nome) + '</b>' +
            '<small>' + esc([r.cargo, r.data].filter(Boolean).join(' · ')) + '</small>' +
          '</div>' +
        '</figcaption>' +
      '</figure>';
    }).join('');
  }

  var l = document.getElementById('revGoogle');
  if (l) {
    if (C.googleUrl) {
      l.href = C.googleUrl;
      l.innerHTML = googleIcon + '<span>Ver todas as avaliações no Google Maps →</span>';
    } else {
      l.remove();
    }
  }

  sec.hidden = false;
})();