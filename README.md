# RichUp Autoclicker

## Description

This is a user script designed to automate dice rolls in the online game [richup.io](https://richup.io/). It adds a convenient toggle button directly onto the game page, allowing you to easily enable or disable the autoclicking functionality.

## Features

*   Automatically clicks buttons such as "Roll the dice", "Roll again", and "End turn".
*   Provides an on-screen toggle button to manage the autoclicker's state.
*   The toggle button gives clear visual feedback, changing color and text to indicate "ON" or "OFF" status.
*   Includes a safety check to prevent activation before the game has properly started.

## Installation

It's recommended to use a user script manager to install and manage this script. Tampermonkey is a popular choice:

*   [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
*   [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
*   [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
*   (For other browsers, please search for "Tampermonkey" or an equivalent user script manager.)

**Steps:**

1.  Install Tampermonkey (or your preferred user script manager) for your browser.
2.  Navigate to the raw script file: [richup.user.js](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPONAME/main/richup.user.js)
    *(Note: This URL is a placeholder. Replace `YOUR_USERNAME/YOUR_REPONAME` with the actual GitHub repository path once available.)*
3.  Your user script manager (e.g., Tampermonkey) should automatically detect the `.user.js` file and open a new tab or prompt for installation.
4.  Review the script details and click "Install" in the Tampermonkey interface.

## How to Use

1.  After installation, navigate to any game room on `richup.io` (e.g., any URL matching `https://richup.io/room/*`).
2.  A toggle button labeled **"Toggle Autoclicker (OFF)"** will appear at the bottom-right corner of the screen.
3.  Click this button to activate the autoclicker.
    *   The button's text will change to **"Toggle Autoclicker (ON)"**.
    *   The button's background color will change (typically to green).
4.  The script will now automatically click relevant game buttons when it's your turn.
5.  To deactivate, click the toggle button again. It will revert to its "OFF" state (red background).
6.  **Important**: If you try to turn the autoclicker "ON" before the game has fully started or is in a state where rolling is not possible (e.g., during initial setup), you will see an alert: `"Game not started or cannot start autoclicker!"`. The autoclicker will not activate in this case.

## Known Limitations

*   The script is active only on URLs matching `https://richup.io/room/*`. It will not run on the main page or other sections of the site.
*   The script identifies clickable buttons based on their text content (e.g., "Roll the dice"). Significant changes to the game's user interface or button labels by the game developers could potentially break this functionality.

## Contributing

Contributions, bug reports, and feature suggestions are welcome! Please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/YOUR_USERNAME/YOUR_REPONAME) (placeholder URL).

## License

This user script is released under the MIT License. Please see the `LICENSE` file in the repository for full details.
