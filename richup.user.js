// ==UserScript==
// @name         Rich up auto click
// @version      0.0.3
// @description  Auto roll your dice in richup.io
// @author       KunoiSayami
// @namespace    https://github.com/KunoiSayami/
// @match        https://richup.io/room/*
// @grant        none
// ==/UserScript==

// Create a global namespace for this userscript if it doesn't already exist.
// This helps avoid conflicts with other scripts or the page's own JavaScript.
if (window.plugin === undefined) {
    window.plugin = function() {};
}

// Create a specific namespace for the auto-clicker functionality.
if (window.plugin.auto === undefined) {
    window.plugin.auto = function() {};
}

// Tracks the current state of the autoclicker (true for ON, false for OFF).
window.plugin.auto.status = false;

/**
 * Creates the toggle button for the autoclicker, styles it,
 * and attaches its event listener.
 */
window.plugin.auto.createToggleButton = function() {
    const button = document.createElement('button');
    button.id = 'autoClickerToggle'; // ID for easy access if needed
    // Set initial button text and background based on current autoclicker status.
    button.textContent = `Toggle Autoclicker (${window.plugin.auto.status ? 'ON' : 'OFF'})`;
    // Styling for the button to make it clearly visible and accessible.
    button.style.position = 'fixed'; // Keep it in place on screen scroll
    button.style.bottom = '10px';    // Position near the bottom
    button.style.right = '10px';     // Position near the right
    button.style.zIndex = '9999';    // Ensure it's on top of most page elements
    button.style.backgroundColor = window.plugin.auto.status ? 'green' : 'red';
    button.style.color = 'white';
    button.style.padding = '10px';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Event listener for the button click.
    button.addEventListener('click', () => {
        const newDesiredStatus = !window.plugin.auto.status; // Determine the desired new state

        if (newDesiredStatus) { // If the user wants to turn the autoclicker ON
            if (!window.plugin.auto.start_auto_click()) {
                // If starting fails (e.g., game not started), show an alert.
                // The button's appearance and window.plugin.auto.status remain unchanged (OFF).
                alert('Game not started or cannot start autoclicker!');
                return; // Exit without changing button state
            }
            // If start_auto_click was successful, it internally sets window.plugin.auto.status = true.
            button.textContent = 'Toggle Autoclicker (ON)';
            button.style.backgroundColor = 'green';
            console.log('Start auto clicker');
        } else { // If the user wants to turn the autoclicker OFF
            window.plugin.auto.status = false; // Explicitly set status to OFF
            button.textContent = 'Toggle Autoclicker (OFF)';
            button.style.backgroundColor = 'red';
            console.log('Stop auto clicker');
        }
    });

    // Add the newly created button to the page's body.
    document.body.appendChild(button);
    // A reference to the button could be stored if needed for direct manipulation later,
    // e.g., window.plugin.auto.toggleButton = button;
};

/**
 * Initializes the autoclicker plugin by creating its UI elements (the toggle button).
 */
window.plugin.auto.init = function () {
    console.debug('Calling init for AutoClicker Toggle Button');
    window.plugin.auto.createToggleButton();

    // After creation, ensure the button's text and style accurately reflect the
    // current autoclicker status. This is particularly useful if the script
    // is re-injected or if the status could be modified by other means.
    const button = document.getElementById('autoClickerToggle'); // Get the button instance
    if (button) {
        button.textContent = `Toggle Autoclicker (${window.plugin.auto.status ? 'ON' : 'OFF'})`;
        button.style.backgroundColor = window.plugin.auto.status ? 'green' : 'red';
    }
};

/**
 * The main recursive function for the autoclicker.
 * If the autoclicker is active (status is true), it calls auto_click
 * and then schedules itself to run again shortly.
 */
window.plugin.auto.click_staff = function() {
    if (window.plugin.auto.status) {
        window.plugin.auto.auto_click(); // Perform the click action
        // Set a timeout to call click_staff again. This creates the clicking loop.
        // The delay (300ms) can be adjusted; consider making it configurable for users.
        setTimeout(window.plugin.auto.click_staff, 300);
    }
};

/**
 * Attempts to start the autoclicker.
 * It first checks if the game is in a state where autoclicking is possible.
 * If so, it sets the status to ON and starts the clicking loop.
 * @returns {boolean} True if the autoclicker was started, false otherwise.
 */
window.plugin.auto.start_auto_click = function() {
    if (!window.plugin.auto.check_game_started()) {
        // If the game isn't started or isn't in a valid state, log a warning and return false.
        // window.plugin.auto.status remains unchanged (should be false).
        console.warn('Autoclicker start failed: Game not detected or not in a state to start.');
        return false;
    }
    window.plugin.auto.status = true; // Set the global status to ON
    window.plugin.auto.click_staff(); // Start the autoclicking process
    return true; // Indicate success
};

// Array of button texts that trigger a click. These are typically actions like rolling dice.
window.plugin.auto.require_roll = ["Roll again", "Roll the dice", "End turn"];
// Text content of a button that indicates the game might not be in an active playing state (e.g., player is changing color).
window.plugin.auto.change_color = "Change color";

/**
 * Checks if the game appears to be in an active, playable state.
 * It currently does this by looking for a button with the text "Change color",
 * which might indicate a pre-game or setup phase.
 * @returns {boolean} True if the game seems started, false otherwise.
 */
window.plugin.auto.check_game_started = function() {
    // Iterate through all button elements on the page.
    for (let element of document.getElementsByTagName('button')) {
        // If a button with text content matching `window.plugin.auto.change_color` is found,
        // it's assumed the game is not in an active state for autoclicking.
        if (element.textContent !== undefined && element.textContent === window.plugin.auto.change_color) {
            return false; // Game is likely not in a state to auto-roll.
        }
    }
    return true; // No "Change color" button found, assume game is active.
};

/**
 * Performs the actual click action.
 * It searches for a button on the page whose text content matches one of the
 * phrases in `window.plugin.auto.require_roll`. If found, it clicks the button.
 */
window.plugin.auto.auto_click = function() {
    // TODO: A potential future enhancement could be to add a flag check here
    // for more complex conditions before clicking.

    // Iterate through all button elements on the page.
    for (let element of document.getElementsByTagName('button')) {
        // Check if the button's text content includes any of the required phrases.
        if (element.textContent !== undefined && window.plugin.auto.require_roll.some(text => element.textContent.includes(text))) {
            element.click(); // Click the button
            break; // Exit the loop after clicking one button
        }
    }
};

/**
 * Delays the initialization of the plugin until the game page appears to be fully loaded.
 * This is a common pattern in userscripts to ensure that page elements the script
 * interacts with are available.
 */
function lazy_load() {
    console.debug('Calling lazy load');
    // This condition checks for the presence of a read-only input field whose value
    // starts with "https://richup.io/room". This is assumed to be a stable indicator
    // that the main game interface/room is loaded.
    // A more robust check might be needed if the game's UI changes significantly.
    if (!Array.from(document.getElementsByTagName('input')).some(element => element.readOnly && element.value !== undefined && element.value.startsWith("https://richup.io/room"))) {
        // If the game interface doesn't seem loaded, try again after a short delay.
        setTimeout(lazy_load, 500);
        return;
    }
    // Once the game interface seems loaded, initialize the autoclicker plugin.
    window.plugin.auto.init();
}

// Start the lazy loading process after an initial delay (3 seconds).
// This gives the page some time to load initial resources.
setTimeout(lazy_load, 3000);