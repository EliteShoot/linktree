(function () {
  var PHONE = '248-800-8100', TEL = 'tel:2488008100';
  var path = location.pathname.replace(/\/+$/, '') || '/';
  var nav = [['/properties/', 'Properties'], ['/#approach', 'What We Do'], ['/about/', 'About'], ['/sell-your-property/', 'Sell Your Property'], ['/contact/', 'Contact']];
  var navLinks = nav.map(function (n) {
    var active = path !== '/' && n[0].indexOf(path) === 0;
    return '<a href="' + n[0] + '"' + (active ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
  }).join('');
  var logo = '<b>STONEBRIDGE</b><small>DEVELOPMENT GROUP</small>';
  var solid = document.body.hasAttribute('data-solid-header');

  var header = document.createElement('header');
  if (solid) header.className = 'solid';
  header.innerHTML = '<div class="wrap"><a href="/" class="logo" aria-label="StoneBridge Development Group home">' + logo + '</a>' +
    '<nav class="top">' + navLinks + '</nav>' +
    '<button class="menu-btn" aria-label="Open menu" aria-expanded="false"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button></div>' +
    '<nav class="mobile-nav">' + navLinks + '<a href="' + TEL + '">Call ' + PHONE + '</a></nav>';
  document.body.prepend(header);
  var btn = header.querySelector('.menu-btn');
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  var cta = document.querySelector('[data-sell-cta]');
  if (cta) cta.outerHTML =
    '<section class="sell" id="sell"><div class="wrap"><div><p class="eyebrow">Residential Acquisitions</p>' +
    '<h2 class="serif sec-h">Have a Property You’d<br>Consider Selling?</h2>' +
    '<p class="t">We\'re always evaluating residential acquisition opportunities. Tell us about your property and our team will review the opportunity.</p></div>' +
    '<div class="actions"><a class="btn dark" href="/sell-your-property/?review=1">Tell Us About Your Property <span>↗</span></a>' +
    '<a class="phone" href="' + TEL + '">' + PHONE + '</a></div></div></section>';

  var footer = document.createElement('footer');
  footer.innerHTML = '<div class="wrap"><div class="grid">' +
    '<div><a href="/" class="logo">' + logo + '</a><p class="tag">Real Estate. Thoughtfully Developed.</p></div>' +
    '<nav aria-label="Footer navigation">' + navLinks + '</nav>' +
    '<div><p class="eyebrow">Let\'s Talk Real Estate</p><a class="phone" href="' + TEL + '">' + PHONE + ' <span style="font-size:20px">↗</span></a></div></div>' +
    '<div class="legal"><p>© 2026 StoneBridge Development Group. All rights reserved.</p><div><a href="/privacy-policy/">Privacy Policy</a><a href="/terms-of-use/">Terms of Use</a></div></div></div>';
  document.body.appendChild(footer);

  var bar = document.createElement('div');
  bar.className = 'mobile-bar';
  bar.innerHTML = '<a href="' + TEL + '">Call ' + PHONE + '</a><a href="/sell-your-property/?review=1">Sell Your Property ↗</a>';
  document.body.appendChild(bar);

  // Property review modal (sell page)
  var modal = document.getElementById('review-modal');
  if (modal) {
    var steps = modal.querySelectorAll('.step'), idx = 0;
    var form = modal.querySelector('form');
    var show = function (i) {
      idx = i;
      steps.forEach(function (s, n) { s.hidden = n !== i; });
      modal.querySelectorAll('.stepper li').forEach(function (li, n) { li.classList.toggle('on', n <= i); });
      modal.querySelector('.count').textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
      modal.querySelector('.back').style.visibility = i ? 'visible' : 'hidden';
      modal.querySelector('.next').textContent = i === steps.length - 1 ? 'Submit Request' : 'Continue';
    };
    var openM = function () { form.hidden = false; modal.querySelector('.done').hidden = true; show(0); modal.showModal(); };
    document.querySelectorAll('[data-open-review]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); openM(); });
    });
    modal.querySelector('.close').addEventListener('click', function () { modal.close(); });
    modal.querySelector('.back').addEventListener('click', function () { show(idx - 1); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = steps[idx].querySelectorAll('input,select,textarea');
      for (var i = 0; i < fields.length; i++) if (!fields[i].reportValidity()) return;
      if (idx < steps.length - 1) return show(idx + 1);
      form.hidden = true; modal.querySelector('.done').hidden = false; form.reset();
    });
    if (/[?&]review=1/.test(location.search)) openM();
  }

  // Contact form
  var cf = document.getElementById('contact-form');
  if (cf) cf.addEventListener('submit', function (e) {
    e.preventDefault();
    cf.hidden = true;
    document.getElementById('contact-done').hidden = false;
  });
})();
