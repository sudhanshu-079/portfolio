/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT — Sudhanshu Kumar Suman
 * File: script.js
 *
 * HOW THIS FILE IS ORGANIZED:
 * 1. Theme Toggle    — Switch between dark and light mode
 * 2. Scroll Reveal   — Fade sections in as you scroll down
 * 3. Active Nav      — Highlight the correct nav link while scrolling
 *
 * ALL functions run after the page fully loads (no DOMContentLoaded needed
 * because this script is placed at the BOTTOM of index.html, before </body>).
 * ==========================================================================
 */


/* ==========================================================================
   1. THEME TOGGLE
   Switches the website between dark mode and light mode.

   HOW IT WORKS:
   - The <html> tag has data-theme="light" by default (set in index.html)
   - CSS reads this attribute and applies the correct color variables
   - Clicking the button flips the attribute and changes the emoji icon
   ========================================================================== */

// Get the <html> root element — we set the data-theme attribute on it
const htmlElement = document.documentElement;

// Get the toggle button by its ID (id="themeToggle" in index.html)
const themeBtn = document.getElementById('themeToggle');

// Track current theme state — starts as false (light mode is default)
let isDark = false;

// Set the initial icon to moon 🌙 (since we start in light mode)
themeBtn.textContent = '🌙';

/**
 * When the toggle button is clicked:
 * - Flip the isDark boolean
 * - Update the data-theme attribute on <html>
 * - Change the button emoji to match current mode
 */
themeBtn.addEventListener('click', () => {

  // Flip: if it was false (light), it becomes true (dark), and vice versa
  isDark = !isDark;

  // Apply the correct theme to the <html> element
  // CSS variables in style.css will automatically update
  htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

  // Update emoji: show sun ☀️ when in dark mode (to switch to light),
  //               show moon 🌙 when in light mode (to switch to dark)
  themeBtn.textContent = isDark ? '☀️' : '🌙';
});


/* ==========================================================================
   2. SCROLL REVEAL
   Makes sections fade in smoothly when they enter the viewport.

   HOW IT WORKS:
   - All sections with class="reveal" start invisible (in style.css)
   - IntersectionObserver watches when they enter the visible area
   - When visible, we add the class "visible" which triggers the CSS animation
   ========================================================================== */

/**
 * IntersectionObserver: a browser API that fires a callback when
 * an element enters or leaves the viewport (visible area of screen).
 *
 * threshold: 0.08 means the callback fires when 8% of the element is visible.
 * Lower = triggers earlier (element barely in view),
 * Higher = triggers later (element more in view before animating).
 */
const scrollObserver = new IntersectionObserver((entries) => {

  // entries = array of all watched elements that changed visibility
  entries.forEach(entry => {

    // If this element is now visible on screen
    if (entry.isIntersecting) {

      // Add "visible" class → triggers the CSS fade-in transition
      // (see .reveal.visible in style.css)
      entry.target.classList.add('visible');

      // Note: we don't unobserve here, so the animation
      // won't replay if you scroll back up. If you want it to
      // replay, add: scrollObserver.unobserve(entry.target);
    }
  });

}, { threshold: 0.08 }); // Fire when 8% of element is visible


// Select every element that has class="reveal" in the HTML
const revealElements = document.querySelectorAll('.reveal');

// Tell the observer to watch each of those elements
revealElements.forEach(el => scrollObserver.observe(el));


/* ==========================================================================
   3. ACTIVE NAV HIGHLIGHT
   Highlights the correct navigation link as you scroll through sections.
   
   HOW IT WORKS:
   - We listen to the scroll event
   - For each scroll position, we check which section is currently in view
   - We add the "active" CSS class to the matching nav link
   ========================================================================== */

// Get all sections that have an id attribute (hero, skills, projects, etc.)
const allSections = document.querySelectorAll('section[id]');

// Get all navigation links inside the .nav-links list
const allNavLinks = document.querySelectorAll('.nav-links a');

/**
 * On every scroll event, figure out which section is currently
 * in the top portion of the viewport and highlight its nav link.
 */
window.addEventListener('scroll', () => {

  // We'll store the id of the current section here
  let currentSectionId = '';

  // Loop through every section and check if we've scrolled to it
  allSections.forEach(section => {

    // offsetTop = distance from top of page to this section
    // We subtract 100px so the nav updates slightly before reaching the section
    if (window.scrollY >= section.offsetTop - 100) {
      currentSectionId = section.id; // e.g. "skills", "projects", "education"
    }
  });

  // Update each nav link — add "active" to matching one, remove from others
  allNavLinks.forEach(link => {

    // toggle(class, condition):
    // if condition is true → add the class
    // if condition is false → remove the class
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + currentSectionId
      // e.g. if currentSectionId = "skills", 
      // then link href "#skills" gets active class
    );
  });
});
