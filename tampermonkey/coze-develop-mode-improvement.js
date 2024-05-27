// ==UserScript==
// @name     Coze Style Change
// @version  1
// @description
// @author   Veeja
// @grant    none
// @match https://www.coze.com/space/*
// @updateURL https://raw.githubusercontent.com/weijialiu-hiretual/weijialiu/main/tampermonkey/coze-develop-mode-improvement.js
// ==/UserScript==

/**
 *
 */
function modifyElements() {
    var box = document.querySelectorAll('.qrPNrOyVEBA326VHThBn');
    // 修改 display 为 flex
    for (var i = 0; i < box.length; i++) {
        box[i].style.display = 'flex';
    }

    var elements = document.querySelectorAll('.GgZHQbhCPZYqXVil_nkc')
    var persona = elements[0];
    var skill = elements[1];
    var chat = elements[2];

    // 将persona和skill的宽度设为10%
    persona.style.width = '10%';
    skill.style.width = '10%';

    // 将chat的宽度设为200%
    chat.style.width = '200%';
}


var observer = new MutationObserver(function (mutations) {
    modifyElements();
});

observer.observe(document.body, {
    childList: true, subtree: true
});

window.onload = function () {
    modifyElements();
}