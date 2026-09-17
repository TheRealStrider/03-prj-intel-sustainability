(function () {
  // 1. Define known RTL language prefixes
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'yi'];

  // 2. Function to update the page direction
  function syncDirection() {
    const html = document.documentElement;
    // Get lang attribute or fall back to inspecting classes (common in translation widgets)
    const langAttr = html.getAttribute('lang') || '';
    const primaryLang = langAttr.split('-')[0].toLowerCase();

    // Check if the current language is RTL, or if a widget added an RTL class name
    const isRTL = rtlLanguages.includes(primaryLang) || html.classList.contains('rtl');

    if (isRTL) {
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('dir', 'ltr');
    }
  }

  // 3. Set up MutationObserver to watch for language changes dynamically
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'lang' || mutation.attributeName === 'class') {
        syncDirection();
      }
    });
  });

  // 4. Start observing the <html> tag and run an initial check
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'class']
  });

  syncDirection();
})();
