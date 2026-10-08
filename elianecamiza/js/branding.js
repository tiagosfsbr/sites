(() => {
  const from = /UpCont|UPCONT/g;
  const to = 'Eliane Camiza';
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
  if (address) address.innerHTML = 'R. Vilaça, 195 — 2º andar, Sala 25<br>Centro — São José dos Campos/SP<br>CEP 12210-000';
  const map = document.querySelector('.locMap iframe');
  if (map) {
    map.title = 'Mapa da localização da Eliane Camiza em São José dos Campos/SP';
    map.src = 'https://maps.google.com/maps?q=R.%20Vila%C3%A7a%2C%20195%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012210-000&z=17&hl=pt-BR&output=embed';
  }
  const destination = 'R.%20Vila%C3%A7a%2C%20195%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012210-000';
  const directions = document.querySelector('.locActions a:first-child');
  const mapsLink = document.querySelector('.locActions a:last-child');
  if (directions) directions.href = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  if (mapsLink) mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${destination}`;
  document.addEventListener('submit', event => {
    if (event.target.id !== 'leadForm') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const value = id => document.getElementById(id)?.value.trim();
    const message = `Olá, Eliane Camiza! Meu nome é ${value('nome')}.\nWhatsApp: ${value('telefone')}\nEmpresa: ${value('empresa') || 'Não informado'}\nFaturamento: ${value('faturamento')}\nNecessidade: ${value('necessidade') || 'Não informado'}`;
    window.open('https://wa.me/5546991212740?text=' + encodeURIComponent(message), '_blank', 'noopener');
  }, true);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) node.nodeValue = replace(node.nodeValue);
    else if (node.nodeType === Node.ELEMENT_NODE) applyBrand(node);
  }))).observe(document.documentElement, { childList: true, subtree: true });
})();
