(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const form = document.querySelector('#enquiry-form');
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const requestedProduct = params.get('product');
    if (requestedProduct) {
      const select = form.querySelector('[name="product"]');
      if (select) {
        const option = [...select.options].find(o => o.text.toLowerCase() === requestedProduct.toLowerCase());
        if (option) select.value = option.value;
      }
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = `Product enquiry — ${data.get('product')}`;
      const body = [
        'Hello Imperial International Trade,', '',
        'I would like to enquire about the following:', '',
        `Name: ${data.get('name')}`,
        `Company: ${data.get('company') || 'Not provided'}`,
        `Email: ${data.get('email')}`,
        `Destination country: ${data.get('country') || 'Not provided'}`,
        `Product: ${data.get('product')}`, '',
        'Requirements:', data.get('message'), '',
        'Please let me know the next steps.', '', 'Regards,', data.get('name')
      ].join('\n');
      const note = document.querySelector('#form-note');
      if (note) note.textContent = 'Opening your email application. If it does not open, email connect@imperialinternationaltrade.com directly.';
      window.location.href = `mailto:connect@imperialinternationaltrade.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
