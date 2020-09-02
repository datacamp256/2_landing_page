const emptyNavBar = `<header class="page__header">
    <nav class="navbar__menu">
      <!-- Navigation starts as empty UL that will be populated with JS -->
      <ul id="navbar__list"></ul>
    </nav>
  </header>`;


const threeSections = `<main>
    <header class="main__hero">
      <h1>Landing Page </h1>
    </header>
    <section id="section1" data-nav="Section 1" class="your-active-class">
      <div class="landing__container">
        <h2>Section 1</h2>
        <p>Content of Section 1.</p>
      </div>
    </section>
    <section id="section2" data-nav="Section 2">
      <div class="landing__container">
        <h2>Section 2</h2>
         <p>Content of Section 2.</p>
         </div>
    </section>
    <section id="section3" data-nav="Section 3">
      <div class="landing__container">
        <h2>Section 3</h2>
         <p>Content of Section 3.</p>
      </div>
    </section>
  </main>`;

describe('Navigation Bar', () => {
    beforeEach(() => {
        require('./app');
    });
    test('Fill a navigation bar with List Items', () => {
        document.body.innerHTML = emptyNavBar + threeSections;

        document.dispatchEvent(new Event('DOMContentLoaded', {bubbles: true, canceable: true}));

        const navbarList = document.getElementById('navbar__list');
        expect(navbarList.children).toHaveLength(3);
        expectedListItems = [
            {name: 'one'},
            {name: 'two'},
            {name: 'three'}
        ];
        Array.from(navbarList.children).forEach((value, index) => {
            expect(value).not.toBeNull();
            expect(value.tagName).toEqual('LI');
            expect(value.textContent).toEqual(expectedListItems[index].name);
        });
    })
});