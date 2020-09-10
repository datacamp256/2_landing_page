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
const ACTIVE_SECTION_CLASS = 'your-active-class';
const PAGE_HEADER_CLASS = 'page__header';
let sections;
let activeSection;

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
    const sectionProperties = [];
    sections.forEach((entry) => {
        let entryValues = extractEntryValues(entry);
        if (entryValues.name != null) {
            sectionProperties.push(entryValues);
        }
    })
    return sectionProperties;
}

function headerIsVisible(section, windowHeight, visibleTopEdgeBelow) {
    var rect = section
        .querySelector('h2')
        .getBoundingClientRect();
    return (rect.top >= visibleTopEdgeBelow &&
        rect.bottom <= windowHeight);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function queryForSections() {
    sections = document.querySelectorAll('main section');
    activeSection = document.querySelector('.' + ACTIVE_SECTION_CLASS);
}

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

function activateSection() {
    windowHeight = window.innerHeight !== 0 ? window.innerHeight : document.documentElement.clientHeight;
    visibleTopEdgeBelow = document.querySelector('.' + PAGE_HEADER_CLASS).offsetHeight;
    visibleSectionHeaders = [];

    sections.forEach((section) => {
        if (headerIsVisible(section, windowHeight, visibleTopEdgeBelow)) {//TODO not visible but near top of viewport
            visibleSectionHeaders.push(section);
        }
    });

    if (!visibleSectionHeaders.includes(activeSection) && visibleSectionHeaders.length > 0) {
        activeSection.classList.remove(ACTIVE_SECTION_CLASS);
        visibleSectionHeaders[0].classList.add(ACTIVE_SECTION_CLASS);
        activeSection = visibleSectionHeaders[0];
    }
}

function activateNavigationItem() {

}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener('DOMContentLoaded', function () {
    queryForSections();
    createNavigationMenu();
});

// Scroll to section on link click

// Set sections as active

document.addEventListener('scroll', function () {
    if (parseInt(document.querySelector('main').getBoundingClientRect().top) % 10 === 0) {
        activateSection();
        activateNavigationItem();
    }
});

