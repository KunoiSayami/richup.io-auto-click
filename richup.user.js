// ==UserScript==
// @name         Rich up auto click
// @version      0.0.3
// @description  Auto roll your dice in richup.io
// @author       KunoiSayami
// @namespace    https://github.com/KunoiSayami/
// @match        https://richup.io/room/*
// @grant        none
// ==/UserScript==

if (window.plugin === undefined) {
    window.plugin = function() {}
}

if (window.plugin.auto === undefined) {
    window.plugin.auto = function() {}
}

window.plugin.auto.status = false;
window.plugin.auto.init = function () {
    //let classname = undefined;
    //console.debug('Calling init');
    let discord_button = document.getElementsByTagName('a')[0];
    //console.log(discord_button);
    if (!discord_button.href.includes('discord')) {
        console.error('Init fail, can\'t find discord button');
        return;
    }
    discord_button.removeAttribute('href');
    discord_button.children[0].children[0].setAttribute('fill', 'red');
    /*for (element of document.getElementsByTagName('button')) {
        if (element.textContent !== undefined && element.textContent === change_color) {
            classname = element.className;
        }
    }*/
    discord_button.addEventListener('click', () => {
        if (window.plugin.auto.status) {
            window.plugin.auto.status = false;
            discord_button.children[0].children[0].setAttribute('fill', 'red');
            console.log('Stop auto clicker');
        } else {
            if (!window.plugin.auto.start_auto_click()) {
                alert('Game not started!');
                return;
            }
            discord_button.children[0].children[0].setAttribute('fill', 'green');
            console.log('Start auto clicker');
        }
    })
}

window.plugin.auto.click_staff = function() {
    console.log('Enter clieck function');
    if (window.plugin.auto.status) {
        window.plugin.auto.auto_click();
        setTimeout(window.plugin.auto.click_staff, 300);
    }
}

window.plugin.auto.start_auto_click = function() {
    if (!window.plugin.auto.check_game_started()) {
        return false;
    }
    window.plugin.auto.status = true;
    window.plugin.auto.click_staff();
    return true;
}

window.plugin.auto.require_roll = ["Roll again", "Roll the dice", "End turn"];
window.plugin.auto.change_color = "Change color";

window.plugin.auto.check_game_started = function() {
    for (let element of document.getElementsByTagName('button')) {
        if (element.textContent !== undefined && element.textContent === window.plugin.auto.change_color) {
            return false;
        }
    }
    return true;
}

window.plugin.auto.auto_click = function() {

    // flag check goes here.

    for (let element of document.getElementsByTagName('button')) {
        //console.log(element.textContent);
        if (element.textContent !== undefined && window.plugin.auto.require_roll.some(text => element.textContent.includes(text))) {
            element.click();
            break;
        }
    }

}

function lazy_load() {
    console.debug('Calling lazy load');
    //if (Array.from(document.getElementsByTagName('button')).some( element => {console.log(element); return element.textContent !== undefined && element.textContent === 'All rooms';})) {
    if (!Array.from(document.getElementsByTagName('input')).some(element => element.readOnly && element.value !== undefined && element.value.startsWith("https://richup.io/room"))) {
        setTimeout(lazy_load, 500);
        return;
    }
    window.plugin.auto.init();
}

setTimeout(lazy_load, 3000);