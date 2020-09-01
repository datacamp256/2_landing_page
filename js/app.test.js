const navigationMenu = require('./app');

describe('Navigation Bar', () => {
    beforeEach(() => {
        document.body.innerHTML = `<header class="page__header">
            <nav class="navbar__menu">
                <!-- Navigation starts as empty UL that will be populated with JS -->
                <ul id="navbar__list"></ul>
            </nav>
        </header>`
    });
    test('Create a navigation bar', () => {

        navigationMenu();

        const navbarList = document.getElementById('navbar__list');
        expect(navbarList.children).toHaveLength(1);

    })
});