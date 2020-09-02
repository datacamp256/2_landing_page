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
const NAVIGATION_NAME_ATTRIBUTE = 'data-nav';
const NAVBAR_LIST_IDENTIFIER = 'navbar__list';
const LIST_ITEM_CLASS = 'menu__link';

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function extractEntryValues(entry) {
    return {
        name: entry.getAttribute(NAVIGATION_NAME_ATTRIBUTE),
        target: entry.id
    };
}

function findSections() {
    const sections = document.querySelectorAll('main section');

    const sectionProperties = [];
    sections.forEach((entry) => {
        let entryValues = extractEntryValues(entry);
        if (entryValues.name != null) {
            sectionProperties.push(entryValues);
        }
    })
    return sectionProperties;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNavigationMenu() {
    const navbarList = document.getElementById(NAVBAR_LIST_IDENTIFIER);
    findSections().forEach((entry) => {
        const hyperLink = document.createElement('a');
        hyperLink.textContent = entry.name;
        hyperLink.setAttribute('href', '#' + entry.target);
        const listElement = document.createElement('li');
        listElement.appendChild(hyperLink)
        listElement.classList.add(LIST_ITEM_CLASS);
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


