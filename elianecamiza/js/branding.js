(() => {
  const from = /UpCont|UPCONT/g;
  const to = 'ECamiza Contabilidade';
  const replace = value => typeof value === 'string' ? value.replace(from, to) : value;
  const replaceLocation = value => {
    if (typeof value !== 'string') return value;
    return value
      .replaceAll('Rua Olávo Bilac, 191 — Bortot', 'R. Vilaça, 195 — 2º andar, Sala 25')
      .replaceAll('Rua Olávo Bilac, 191', 'R. Vilaça, 195 — 2º andar, Sala 25')
      .replaceAll('Bortot — Pato Branco/PR', 'Centro — São José dos Campos/SP')
      .replaceAll('Pato Branco — PR', 'São José dos Campos — SP')
      .replaceAll('Pato Branco/PR', 'São José dos Campos/SP')
      .replaceAll('Pato Branco', 'São José dos Campos')
      .replaceAll('85504-080', '12210-000');
  };
  const replaceText = root => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (parent && !/^(SCRIPT|STYLE)$/i.test(parent.tagName)) node.nodeValue = replaceLocation(replace(node.nodeValue));
    }
  };
  const replaceAttributes = root => {
    const selector = '[aria-label],[alt],[title],[content],[placeholder]';
    if (root.nodeType === Node.ELEMENT_NODE && root.matches(selector)) {
      for (const attribute of ['aria-label', 'alt', 'title', 'content', 'placeholder']) {
        if (root.hasAttribute(attribute)) root.setAttribute(attribute, replace(root.getAttribute(attribute)));
      }
    }
    root.querySelectorAll?.(selector).forEach(element => {
      for (const attribute of ['aria-label', 'alt', 'title', 'content', 'placeholder']) {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, replace(element.getAttribute(attribute)));
      }
    });
  };
  const applyBrand = root => {
    replaceText(root);
    replaceAttributes(root);
  };
  applyBrand(document.documentElement);
  document.title = replace(document.title);
  const address = document.querySelector('.locCard address');
  if (address) address.innerHTML = 'R. Vilaça, 195 — 2º andar, Sala 25<br>Centro — São José dos Campos/SP<br>CEP 12210-000<br><small style="color:var(--gold);display:block;margin-top:6px">Atendimento 100% digital · Presencial sob agendamento prévio</small>';
  const locPhone = document.querySelector('.locInfo a[href^="tel:"]');
  if (locPhone) {
    locPhone.href = 'tel:+5512988421571';
    locPhone.textContent = '(12) 98842-1571';
  }
  const locWa = document.querySelector('.locInfo a[href*="wa.me"]');
  if (locWa) {
    locWa.href = 'https://wa.me/5512988421571';
    locWa.textContent = '(12) 98842-1571';
  }
  const locHours = document.querySelector('.locInfo li:last-child span');
  if (locHours) locHours.textContent = 'Seg a Qui: 10h às 17h | Sex: 10h às 16h';
  const map = document.querySelector('.locMap iframe');
  if (map) {
    map.title = 'Mapa da localização da ECamiza Contabilidade em São José dos Campos/SP';
    map.src = 'https://maps.google.com/maps?q=R.%20Vila%C3%A7a%2C%20195%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012210-000&z=17&hl=pt-BR&output=embed';
  }
  const destination = 'R.%20Vila%C3%A7a%2C%20195%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012210-000';
  const placeUrl = 'https://www.google.com/maps/place/Escrit%C3%B3rio+Cont%C3%A1bil+e+Prestador+de+Servi%C3%A7os+Diversos+E+Camiza/@-23.1817835,-45.8845105,727m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94cc4b9af742df61:0xa45daf7508b703da!8m2!3d-23.1817835!4d-45.8845105!16s%2Fg%2F11h6v1qp8k';
  const directions = document.querySelector('.locActions a:first-child');
  const mapsLink = document.querySelector('.locActions a:last-child');
  if (directions) directions.href = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  if (mapsLink) mapsLink.href = placeUrl;
  document.addEventListener('submit', event => {
    if (event.target.id !== 'leadForm') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const value = id => document.getElementById(id)?.value.trim();
    const message = `Olá, ECamiza Contabilidade! Meu nome é ${value('nome')}.\nWhatsApp: ${value('telefone')}\nEmpresa: ${value('empresa') || 'Não informado'}\nFaturamento: ${value('faturamento')}\nNecessidade: ${value('necessidade') || 'Não informado'}`;
    window.open('https://wa.me/5512988421571?text=' + encodeURIComponent(message), '_blank', 'noopener');
  }, true);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) node.nodeValue = replace(node.nodeValue);
    else if (node.nodeType === Node.ELEMENT_NODE) applyBrand(node);
  }))).observe(document.documentElement, { childList: true, subtree: true });
})();
