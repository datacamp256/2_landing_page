/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */


/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function findSections() {
    const sections = document.querySelectorAll('main section');
    const sectionProperties = [];
    sections.forEach((entry) => {
        if (entry.hasAttribute('data-nav')) {
            sectionProperties.push({
                name: entry.getAttribute('data-nav'),
                target: entry.id
            });
        }
    });
    return sectionProperties;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNavigationMenu() {
    const navbarList = document.getElementById('navbar__list');
    findSections().forEach((entry) => {
        const hyperLink = document.createElement('a');
        hyperLink.textContent = entry.name;
        hyperLink.setAttribute('href', '#' + entry.target);
        const listElement = document.createElement('li');
        listElement.appendChild(hyperLink)
        listElement.classList.add('menu__link');
        navbarList.appendChild(listElement);
    });
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener('DOMContentLoaded', function () {
    createNavigationMenu();
});

// Scroll to section on link click

// Set sections as active


