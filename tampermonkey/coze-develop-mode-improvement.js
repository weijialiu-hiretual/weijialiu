// ==UserScript==
// @name     Coze Style Change
// @version  1
// @description
// @author   Veeja
// @grant    none
// @match https://www.coze.com/space/*
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

    var chatBoxes = document.querySelectorAll('.chat-uikit-message-box-inner.chat-uikit-message-box-inner--whiteness');
    chatBoxes.forEach(function(chatBox) {
        if (chatBox.querySelector('button')) {
            // 如果已经存在按钮，就不再添加
            return;
        }
        var copyButton = document.createElement('button');
        copyButton.innerText = '复制';

        copyButton.onclick = function() {
            navigator.clipboard.writeText(chatBox.innerText).then(function() {
                console.log('复制成功');
            }, function(err) {
                console.error('复制失败: ', err);
            });
        };
        chatBox.appendChild(copyButton);
    });
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