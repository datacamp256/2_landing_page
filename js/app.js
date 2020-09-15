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
const SECTION_PREVIEW_ID = '#section__preview';
const ACTIVE_NAVBAR_ELEMENT_CLASS = 'navbar__listelement-active';
const PAGE_HEADER_CLASS = 'page__header';

let allSections;
let activeSection;
const allNavigationItems = new Map();
let activeNavigationItem;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */


function determineHeightOfHeader() {
    return document.querySelector('.' + PAGE_HEADER_CLASS).offsetHeight;
}

function extractSectionProperties(section) {
    return {
        name: section.getAttribute(NAVIGATION_NAME_ATTRIBUTE),
        target: section.id
    };
}

function filterNavigableSections() {
    const sectionProperties = [];
    allSections.forEach((section) => {
        let sectionProperty = extractSectionProperties(section);
        if (sectionProperty.name != null) {
            sectionProperties.push(sectionProperty);
        }
    })
    return sectionProperties;
}

function determineVisibleSectionHeaders() {
    const windowHeight = window.innerHeight !== 0 ? window.innerHeight : document.documentElement.clientHeight;
    const visibleTopEdgeBelow = determineHeightOfHeader();
    const visibleSectionHeaders = [];

    allSections.forEach((section) => {
        if (headerIsVisible(section, visibleTopEdgeBelow, windowHeight)) {
            visibleSectionHeaders.push(section);
        }
    });
    return visibleSectionHeaders;
}

function createNavigationListElement(sectionProperties) {
    const hyperLink = document.createElement('a');
    hyperLink.textContent = sectionProperties.name;
    hyperLink.setAttribute('href', '#' + sectionProperties.target);
    hyperLink.classList.add(NAVBAR_LINK);

    const listElement = document.createElement('li');
    listElement.appendChild(hyperLink)
    listElement.classList.add(LIST_ITEM_CLASS);

    return listElement;
}

function createNavbarFragment() {
    const fragment = document.createDocumentFragment();
    filterNavigableSections().forEach((sectionProperties) => {
        const navigationListElement = createNavigationListElement(sectionProperties);
        fragment.appendChild(navigationListElement);
        allNavigationItems.set(sectionProperties.target, navigationListElement);
    });
    return fragment;
}

function replaceActiveSection(newActiveSection) {
    activeSection.classList.remove(ACTIVE_SECTION_CLASS);
    newActiveSection.classList.add(ACTIVE_SECTION_CLASS);
    activeSection = newActiveSection;
}

function headerIsVisible(section, upperBorder, lowerBorder) {
    let rect = section
        .querySelector('h2')
        .getBoundingClientRect();
    return (rect.top >= upperBorder &&
        rect.bottom <= lowerBorder);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function queryForSections() {
    allSections = document.querySelectorAll('main section');
    activeSection = document.querySelector('.' + ACTIVE_SECTION_CLASS);
}

function createNavigationMenu() {
    const navbarList = document.getElementById(NAVBAR_LIST_IDENTIFIER);

    const navbarListStyle = navbarList.style.display;
    navbarList.style.display = 'none'; //hide navbarList in browser to reduce number of reflows

    navbarList.appendChild(createNavbarFragment());

    navbarList.style.display = navbarListStyle;
}

// Add class 'active' to section when near top of viewport
function activateSection() {
    const visibleSectionHeaders = determineVisibleSectionHeaders();

    const recentActiveSectionIsStillVisible = visibleSectionHeaders.includes(activeSection);

    //recent active section is out of sight and we see the next header
    if (!recentActiveSectionIsStillVisible && visibleSectionHeaders.length) {
        replaceActiveSection(visibleSectionHeaders[0]);
        return true;
    }
    return false;
}

function updateNavigationBar(switchActiveNavigationItem) {
    if(switchActiveNavigationItem) {
        if (activeNavigationItem) {
            activeNavigationItem.classList.remove(ACTIVE_NAVBAR_ELEMENT_CLASS);
        }
        activeNavigationItem = allNavigationItems.get(activeSection.id);
        activeNavigationItem.classList.add(ACTIVE_NAVBAR_ELEMENT_CLASS);

        document.querySelector(SECTION_PREVIEW_ID).innerHTML = activeSection.getAttribute(NAVIGATION_NAME_ATTRIBUTE);
    }
}

// Scroll to anchor ID using scrollTO event
function findScrollTarget(requestedSectionId) {
    let foundSection = activeSection; //fallback if no section is found (yes, 'should never occur'...)
    allSections.forEach((section) => {
        if (section.id === (requestedSectionId)) {
            foundSection = section;
        }
    })
    return foundSection;
}

function scrollToElement(scrollTarget) {
    const rect = scrollTarget.querySelector('h2').getBoundingClientRect();
    window.scrollBy({top: rect.top - determineHeightOfHeader(), behavior: 'smooth'});
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
    activateSection(); //if the browser is reloaded somewhere in the middle or an anchor is in the URI
    updateNavigationBar(true);
});

function openNavbar() {
    var x = document.getElementById("navbar__list");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

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
        const activeSectionChanged = activateSection();
        updateNavigationBar(activeSectionChanged);

    }
});

