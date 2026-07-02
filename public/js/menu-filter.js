/**
 * Menu page: vanilla-JS tab filtering between menu categories with a
 * simple fade transition.
 */
(function () {
  const tabs = document.getElementById('menu-tabs');
  const panels = document.getElementById('menu-panels');
  if (!tabs || !panels) return;

  const buttons = Array.from(tabs.querySelectorAll('.menu-tabs__btn'));
  const panelEls = Array.from(panels.querySelectorAll('.menu-panel'));

  function activate(category) {
    buttons.forEach((btn) => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
    panelEls.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.categoryPanel === category);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => activate(btn.dataset.category));
  });
})();
