const emptyNavBar = `<header class="page__header">
    <nav class="navbar__menu">
      <!-- Navigation starts as empty UL that will be populated with JS -->
      <ul id="navbar__list"></ul>
    </nav>
  </header>`


describe('Navigation Bar', () => {
    beforeEach(() => {
        require('./app');
    });
    test('Fill a navigation bar with List Items', () => {
        document.body.innerHTML = emptyNavBar;

        document.dispatchEvent(new Event('DOMContentLoaded', {bubbles: true, canceable: true}));

        const navbarList = document.getElementById('navbar__list');
        expect(navbarList.children).toHaveLength(1);
    })
});