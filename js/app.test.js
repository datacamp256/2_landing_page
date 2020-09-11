const emptyNavBar = `<header class="page__header">
    <nav class="navbar__menu">
      <!-- Navigation starts as empty UL that will be populated with JS -->
      <ul id="navbar__list"></ul>
    </nav>
  </header>`;


const someSections =
    `<section id="test-anchor1" data-nav="::data-nav 1::">
      <div class="landing__container">
        <h2>Section 1</h2>
        <p>Content of Section 1.</p>
      </div>
    </section>
    <section id="test-anchor2" data-nav="::data-nav 2::">
      <div class="landing__container">
        <h2>Section 2</h2>
         <p>Content of Section 2.</p>
         </div>
    </section>
    <section id="test-anchor3" data-nav="::data-nav 3::">
      <div class="landing__container">
        <h2>Section 3</h2>
         <p>Content of Section 3.</p>
      </div>
    </section>`;

function createMainSection(content) {
    return `<main>
    <header class="main__hero">
      <h1>Landing Page </h1>
    </header>${content}</main>`;
}

const sectionWithoutDataNav = `
    <section id="invisible-section">
      <div class="landing__container">
        <h2>Invisible section</h2>
         <p>This section should not appear.</p>
         </div>
    </section>
   `;

describe('Navigation Bar', () => {
    beforeEach(() => {
        require('./app');
    });
    test('Fill a navigation bar with List Items', () => {
        document.body.innerHTML = emptyNavBar + createMainSection(someSections);

        document.dispatchEvent(new Event('DOMContentLoaded', {bubbles: true, canceable: true}));

        const navbarList = document.getElementById('navbar__list');
        expect(navbarList.children).toHaveLength(3);
        const expectedListItems = [
            {name: '::data-nav 1::', href: '#test-anchor1'},
            {name: '::data-nav 2::', href: '#test-anchor2'},
            {name: '::data-nav 3::', href: '#test-anchor3'},
        ];
        Array.from(navbarList.children).forEach((value, index) => {
            expect(value).not.toBeNull();
            expect(value.tagName).toEqual('LI');
            expect(value.textContent).toEqual(expectedListItems[index].name);
            expect(value.classList).toContain('menu__link');
            const links = value.querySelectorAll('a');
            expect(links).toHaveLength(1);
            expect(links[0].href).toEqual('http://localhost/' + expectedListItems[index].href);
        });
    });
    test('Ignore section elements without data-nav', () => {
        document.body.innerHTML = emptyNavBar + createMainSection(someSections + sectionWithoutDataNav);

        document.dispatchEvent(new Event('DOMContentLoaded', {bubbles: true, canceable: true}));

        const navbarList = document.getElementById('navbar__list');
        expect(navbarList.children).toHaveLength(3);
    });
});