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
    return ['one', 'two', 'three'];
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNavigationMenu() {
    const navbarList = document.getElementById('navbar__list');
    findSections().forEach((name) => {
        const listElement = document.createElement('li');
        const textContent = document.createTextNode(name);
        listElement.appendChild(textContent)
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


