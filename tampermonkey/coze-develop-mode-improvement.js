// ==UserScript==
// @name     Coze Style Change
// @version  1.0.1
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
    var box = document.querySelectorAll('.UMf9npeM8cVkDi0CDqZ0');
    // 修改 display 为 flex
    for (var i = 0; i < box.length; i++) {
        box[i].style.display = 'flex';
    }

    // 修改左侧设置栏宽度
    var elements = document.querySelectorAll('.IoQhh3vVUhwDTJi9EIDK')
    var persona = elements[0];
    persona.style.width = '20%';
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