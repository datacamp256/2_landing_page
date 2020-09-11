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
const NAVBAR_LINK = 'menu__link-anchor'
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
    let rect = section
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
        hyperLink.classList.add(NAVBAR_LINK);
        const listElement = document.createElement('li');
        listElement.appendChild(hyperLink)
        listElement.classList.add(LIST_ITEM_CLASS);
        navbarList.appendChild(listElement);
    });
}

// Add class 'active' to section when near top of viewport

function activateSection() {
    const windowHeight = window.innerHeight !== 0 ? window.innerHeight : document.documentElement.clientHeight;
    const visibleTopEdgeBelow = document.querySelector('.' + PAGE_HEADER_CLASS).offsetHeight;
    const visibleSectionHeaders = [];

    sections.forEach((section) => {
        if (headerIsVisible(section, windowHeight, visibleTopEdgeBelow)) {
            visibleSectionHeaders.push(section);
        }
    });

    const recentActiveSectionStillVisible = visibleSectionHeaders.includes(activeSection);
    if (!recentActiveSectionStillVisible && visibleSectionHeaders.length > 0) {
        let firstVisibleSection = visibleSectionHeaders[0];
        activeSection.classList.remove(ACTIVE_SECTION_CLASS);
        firstVisibleSection.classList.add(ACTIVE_SECTION_CLASS);
        activeSection = firstVisibleSection;
    }
}

function activateNavigationItem() {

}

// Scroll to anchor ID using scrollTO event

function findScrollTarget(target) {
    let foundSection = activeSection;
    sections.forEach((section) => {
        if (section.id === (target)) {
            foundSection = section;
        }
    })
    return foundSection;
}

function scrollToElement(scrollTarget) {
    const rect = scrollTarget.querySelector('h2').getBoundingClientRect();
    const visibleTopEdgeBelow = document.querySelector('.' + PAGE_HEADER_CLASS).offsetHeight
    window.scrollBy({top: rect.top - visibleTopEdgeBelow, behavior: 'smooth'});
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

//as soon as page is complete in DOM
document.addEventListener('DOMContentLoaded', function () {
    queryForSections();
    createNavigationMenu();
});

// Scroll to section on link click
document.addEventListener('click', function (event) {
    let element = event.target;
    if (element.classList.contains(NAVBAR_LINK)) {
        event.preventDefault();
        let scrollTarget = findScrollTarget(element.getAttribute('href').slice(1));
        scrollToElement(scrollTarget);
    }
});

// Set sections as active

document.addEventListener('scroll', function () {
    //performance: get active only sometimes
    if (parseInt(document.querySelector('main').getBoundingClientRect().top) % 10 === 0) {
        activateSection();
        activateNavigationItem();
    }
});

