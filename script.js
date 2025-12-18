"use strict";

//TODO  🟦 Module 7 - DOM Manipulation: Lesson 06. Traversing The DOM - Elements

//? In this lesson you learn how to move around the DOM starting from a known element:
//  • Up to its parent.
//  • Down to its children.
//  • Sideways to its siblings.
//  • Up the tree to find the nearest ancestor matching a selector.
//  You will use this heavily in any non-trivial UI.
//  We will focus on element-based traversal (ignoring text nodes, whitespace, etc.).

//TODO  Step 1. What “Traversing the DOM” Means

//? So far, you mainly:
//  • Selected elements from document (e.g. document.querySelector('.task')).
//  • Applied changes directly to those selected elements.

//? DOM traversal is about moving relative to an element:
//  • “From this button, get its parent <section>”
//  • “From this card, get the grid it belongs to”
//  • “From this list item, get the whole list and then all list items”

//* This allows more flexible and reusable code, because you do not always need to know global selectors. You can start from a specific element (for example, the one that triggered an event) and traverse from there.


//TODO  Step 2. Core Element Traversal Properties

//  We will use your existing HTML structure mentally as an example (nav list, tasks, cards grid, buttons).

//? 2.1 parentElement
//  Move up one level to the parent element.

const featuredCard = document.querySelector('.card.featured');
const grid = featuredCard.parentElement;                            //  <section id="section5" class="grid five">

//  • Returns the parent element, or null if there is none.
//  • Ignores non-element nodes.

//? 2.2 children
//  Move down to all direct child elements.

const grid = document.querySelector('.gird');
const cards = grid.children;                                        //  HTMLCollection of .card elements

//  • children returns an HTMLCollection of the element’s child elements (no text nodes).
//  • You can access them by index: cards[0], cards[1], etc.

//? 2.3 firstElementChild / lastElementChild

//  Quick access to first and last child elements:

const firstCard = grid.firstElementChild;
const lastCard = grid.lastElementChild;

//  Very useful when structure is consistent (e.g. first card = "main" card).

//? 2.4 nextElementSibling / previousElementSibling

//  Move horizontally between elements at the same level.

const firstTask = document.querySelector('.tasks .task');
const secondTask = firstTask.nextElementSibling;
const zeroTask = secondTask.previousElementSibling;

//  You can chain these if needed, but do it carefully:

const thirdTask = firstTask.nextElementSibling?.nextElementSibling;

//* (?. optional chaining guards against null);

//TODO  Step 3. closest(selector) – Traversing Up by Selector

//  "closest" is extremely powerful when you have a deeply nested element and you want to find the nearest ancestor that matches a selector.

const clickedEl = document.querySelector('.card.featured');

const section = clickedEl.closest('section');                           // nearest ancestor <section>
const grid    = clickedEl.closest('.grid');                             // nearest ancestor with class="grid"
const main    = clickedEl.closest('#main');                             // nearest ancestor with id="main"

//  • It starts from the element itself and goes upwards.
//  • Returns the first matching ancestor (or the element itself), or null if none match.

//* You will use "closest" a lot later with event delegation (e.g. “Was the click inside a .card?” “Which .task was clicked?”).


//TODO  Step 4. Working with Collections from Traversal

//  Remember:
//  • children returns an HTMLCollection.
//  • Sibling traversals return single elements.
//  You often combine traversal + selection:

const featuredCard = document.querySelector('.card.featured');

//  Get the grid
const grid = featuredCard.closest('.grid');

//  Get all cards inside the same grid
const cards = grid.children;                                            //  HTMLCollection

//  Convert to array and do something
const cardArray = Array.from(cards);
cardArray.forEach((card, index) => {
    card.dataset.index = index;
});

//* This pattern is at the heart of context-aware scripts: start from one element, then find related elements around it.


//TODO  Step 5. Guided Practice – Using Your Current HTML

//  Assume your current HTML (the one you just showed: nav list, tasks, grid with cards, buttons) and a single app.js.
//  Please implement the following steps in app.js. You can keep your previous Lesson 05 code and add these beneath it, or comment some parts out if the console feels noisy.


//TODO  Step 6. Reflection & Checkpoint

//  You do not need to answer in the chat unless you want feedback, but please ensure you can answer for yourself:

//? 1. In your own words, what is the difference between:
//  • parentElement and children
//  Answer: The parentElement is property of Node interface that returns thw DOM node's parent Element, or null if the node either has no parent, or its parent is not a DOM Element. The read-only children property returns a live HTMLCollection which contains all of the child elements of the element upon which it was called.

//  • firstElementChild and nextElementSibling
//  Answer: The Element.firstElementChild read-only property returns an element's first child Element, or null if there are no child elements. The Element.nextElementSibling read-only property returns the element immediately following the specified one in its parent's children list, or null if the specified element is the last one in the list.

//? 2. When would you prefer to use closest(selector) instead of:
//  • parentElement.parentElement, etc.
//  Answer: The closest() method of the Element interface traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.

//  • Or a global document.querySelector?
//  Answer: The Document method querySelector() returns the first Element within the document that matches the specified CSS selector, or group of CSS selectors. If no matches are found, null is returned. Using .closest() allows us to query up through the DOM tree rather than down, and it starts that query with the element on which it is called. If the node itself matches that selector, we will get a truthy result.

//? 3. How could you use DOM traversal in a real app?
//  For example:
//  • Clicking a button inside a card to update that card only.
//  • Clicking a list item and highlighting only the items in the same list.
//  Answer: Handling delegated events: Attach one click listener to a container, then use event.target, .closest() and parent/child/sibling properties to figure out which button, card, or row was clicked and act on the right data.


//! Feedback

//  Your reflections show a very solid grasp of the concepts. I will polish each answer slightly and highlight the practical intuition behind them.

//? 1)  parentElement vs children

//  and firstElementChild vs nextElementSibling

//  parentElement vs children
//  Your answer (paraphrased)

//      parentElement returns the node’s parent element (or null),
//      children returns a live HTMLCollection of all child elements.

//  This is correct.

//  Conceptually:
//  • parentElement → go one step up in the tree.
//      • “From this element, who is my parent?”
//  • children → go down to all direct children.
//      • “From this element, who are my direct children?”

//  So:
//  elem.parentElement                          // one ancestor (0 or 1)
//  elem.children                               // collection of descendants at depth 1

//  Both ignore text nodes; they are element-focused.
//  firstElementChild vs nextElementSibling
//  Your answer correctly describes both properties.

//  Intuition:
//  • firstElementChild → first child downwards.
//  • nextElementSibling → next element sideways at the same level.

//  So for a given element el:
//  • el.firstElementChild moves down.
//  • el.nextElementSibling moves right within the same parent.
//  This directional intuition (up, down, sideways) is exactly how to think about traversal.

//? 2) When to use closest(selector) instead of parentElement.parentElement… or document.querySelector

//  You wrote:
//  • closest() traverses the element and its parents towards the root until it finds a match.
//  • querySelector() finds the first match in the document from the root going down.
//  • closest() lets us query up the tree starting from the element itself.
//  This is correct. Let’s make the usage criteria very explicit:

//  Instead of parentElement.parentElement...
//  You prefer closest() when:
//  • You know there is an ancestor with a specific role (e.g. .card, .tasks, section.featured)
//  • You do not want to rely on the exact number of levels between the child and that ancestor.

//* Example:

// brittle – depends on exact structure
const card = button.parentElement.parentElement;

// robust – works even if markup changes a bit
const card = button.closest('.card');

//  So: use closest to avoid fragile chains of parentElement.parentElement.

//  Instead of a global document.querySelector
//  You prefer closest() when:
//  • You already have a specific element (often from event.target), and
//  • You want something related to that element (its card, its row, its section), not just the first match in the entire document.

//* Example:

// This will always return the first .card in the document
const card = document.querySelector('.card');

// This will find the nearest .card *around the element that was clicked*
const card = event.target.closest('.card');

//  So:
//  • querySelector → “Find me a matching element anywhere in the page.”
//  • closest → “Starting from this element, go up until you find a matching ancestor.”
//  Your explanation captured this; the distinction in usage is now very clear.

//? 3) Using DOM traversal in a real app

//  Your answer:
//  Handling delegated events: attach one click listener to a container, then use event.target, .closest() and parent/child/sibling properties to figure out which button, card, or row was clicked and act on the right data.
//  This is an excellent, real-world use case.

//* A few more practical patterns you will see and use:
//  • Card actions:
//      • Click “Like” inside a card → event.target.closest('.card') → update only that card’s likes counter.
//  • Lists and menus:
//      • Click an item in a sidebar → find the parent menu/list → remove .active from siblings → add .active to the clicked item.
//  • Tables:
//      • Click a “Delete” or “Edit” button in a row → closest('tr') → work with just that row’s data.
//  • Forms:
//      • Validation per fieldset/section → from an input, closest('form') or .closest('.field-group') to show errors only in the right area.
//  Your “delegated events” description is exactly how modern apps use traversal effectively.
