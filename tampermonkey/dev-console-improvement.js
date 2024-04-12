// ==UserScript==
// @name     Dev Console Improvement
// @version  1.0.1
// @description  Improve dev console UI
// @author   Veeja
// @grant    none
// @match https://dev-console.prod2.hireez.info/*
// @match https://dev-console.stage2.hireez.info/*
// @match https://dev-console.test2.hireez.info/*
// @updateURL https://raw.githubusercontent.com/weijialiu-hiretual/weijialiu/main/tampermonkey/dev-console-improvement.js
// ==/UserScript==

class Logger {
    constructor(prefix = '') {
        this.prefix = prefix;
    }

    info(str) {
        console.log(`${this.prefix} INFO: ${str}`);
    }

    error(str) {
        console.error(`${this.prefix} ERROR: ${str}`);
    }
}

const logger = new Logger('[Dev Console Improvement]');


/**
 * 修改字段选择下拉菜单样式
 */
function modifyFiledSelectorStyle() {
    try {
        // logger.info('[modifyFiledSelectorStyle] Start modifying...')
        var labels = document.querySelectorAll('.dmc-label');
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.fontFamily = 'monospace'; //更改字体为等宽字体
        }

        var listItems = document.querySelectorAll('.dropdown-content li');
        for (var j = 0; j < listItems.length; j++) {
            listItems[j].style.margin = '0px'; //减小外边距
            listItems[j].style.padding = '0px'; //减小内边距
        }

        var dropdowns = document.querySelectorAll('.dropdown-content');
        for (var k = 0; k < dropdowns.length; k++) {
            var dropdown = dropdowns[k];
            if (dropdown) {
                dropdown.style.width = 'auto';
                dropdown.style.width = '440px';
                dropdown.style.height = 'auto';
                dropdown.style.maxHeight = '500px';
                dropdown.style.overflowY = 'auto'; // 设置纵向滚动
                dropdown.style.overflowX = 'hidden'; // 禁止横向滚动
                dropdown.style.flexDirection = 'column'; // 确保元素纵向排列
                dropdown.style.display = 'block'; // 确保元素纵向排列
            }
        }
        // logger.info('[modifyFiledSelectorStyle] Finish modifying...')
    } catch (e) {
        logger.error('[modifyFiledSelectorStyle] Error: ' + e);
    }
}


/**
 * 添加一个按钮，用于隐藏侧边栏
 */
function addHideSideButton() {
    try {
        // logger.info('[addHideSideButton] Start adding...')
        var sidebar = document.querySelector('aside');
        if (!sidebar) {
            logger.error('[addHideSideButton] Sidebar not found.');
            return;
        }
        var existingToggleButton = document.querySelector('#toggleButton');
        if (existingToggleButton) {
            // logger.info('[addHideSideButton] Button already exists.');
            return;
        }

        // 创建一个按钮并添加到body
        var toggleButton = document.createElement('button');
        toggleButton.id = 'toggleButton';
        toggleButton.textContent = '<';
        toggleButton.style.position = 'fixed';
        toggleButton.style.zIndex = '9999';
        toggleButton.style.top = '10px';
        var rect = sidebar.getBoundingClientRect();
        toggleButton.style.left = (rect.right) + 'px';

        // 添加一些样式使按钮看起来更漂亮
        toggleButton.style.width = '35px';
        toggleButton.style.height = '30px';
        toggleButton.style.padding = '';
        toggleButton.style.fontSize = '14px';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '0 50% 50% 0'; // 修改这里
        toggleButton.style.backgroundColor = '#007BFF';
        toggleButton.style.color = 'white';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
        toggleButton.style.transition = 'all 0.3s ease 0s';

        document.body.appendChild(toggleButton);

        // 为按钮添加点击事件
        toggleButton.addEventListener('click', function () {
            // 切换侧边栏的显示状态
            if (sidebar.style.width !== '0px') {
                sidebar.style.width = '0px';
                toggleButton.textContent = '>';
                toggleButton.style.left = '0px';
            } else {
                sidebar.style.width = '';
                toggleButton.textContent = '<';
                toggleButton.style.left = (rect.right) + 'px';
            }
        });

        // logger.info('[addHideSideButton] Finish adding...')
    } catch (e) {
        logger.error('[addHideSideButton] Error: ' + e);
    }
}

/**
 * 修改表格列宽度, 限制表格列的最大宽度
 */
function limitTableMaxWidth() {
    try {
        // logger.info('[limitTableMaxWidth] Start limiting...')

        // 选择你需要修改的元素，这里选择的是所有的表格列元素
        var tableCells = document.querySelectorAll('td');
        // 遍历所有的表格列元素
        for (var i = 0; i < tableCells.length; i++) {
            // 设置最大宽度，你可以根据你的需求修改这个值
            tableCells[i].style.maxWidth = '600px';
            // 如果需要，你还可以添加一个横向滚动条
            tableCells[i].style.overflowX = 'hidden';
        }

        // logger.info('[limitTableMaxWidth] Finish limiting...')
    } catch (e) {
        logger.error('[limitTableMaxWidth] Error: ' + e);
    }
}

/**
 * limit sql text height
 */
function limitSqlTextHeight() {
    try {
        // logger.info('[limitSqlTextHeight] Start limiting...')

        var sqlTexts = document.querySelectorAll('.text-xs');
        // 遍历所有的text-xs类的元素
        for (var j = 0; j < sqlTexts.length; j++) {
            // 设置最大高度为3行，你可以根据你的需求修改这个值
            // 这里假设每行的高度为1em，所以3行的高度为3em
            sqlTexts[j].style.maxHeight = '5em';
            // 如果需要，你还可以添加一个纵向滚动条
            sqlTexts[j].style.overflowY = 'auto';
            // 设置等宽字体
            sqlTexts[j].style.fontFamily = '"Courier New", monospace';
        }
        // logger.info('[limitSqlTextHeight] Finish limiting...')
    } catch (e) {
        logger.error('[limitSqlTextHeight] Error: ' + e);
    }
}


/**
 * 添加新的选项，默认选择显示100条
 */
function addNewOption() {
    try {
        // logger.info('[addNewOption] Start adding...')

        var selects = document.querySelectorAll('.dmc-select');
        selects.forEach(function (select) {
            // 检查是否存在你添加的option
            var optionExists = select.querySelector('option[value="100"]');
            // 创建一个新的option元素，设置其值为100
            if (!optionExists) {
                var option = document.createElement('option');
                option.value = '100';
                option.text = 'Show 100';
                select.appendChild(option);
                // 设置select的value为新option的value
                select.value = '100';
                // 触发一个change事件
                var event = new Event('change', {bubbles: true});
                select.dispatchEvent(event);
            }
        });
        // logger.info('[addNewOption] Finish adding...')
    } catch (e) {
        logger.error('[addNewOption] Error: ' + e);
    }
}

var observer = new MutationObserver(function (mutations) {
    logger.info('[MutationObserver] Start observing...')
    modifyFiledSelectorStyle();
    addHideSideButton();
    limitTableMaxWidth();
    limitSqlTextHeight();
    addNewOption();
    logger.info('[MutationObserver] Finish observing...')
});

observer.observe(document.body, {
    childList: true, subtree: true
});

window.onload = function () {
    modifyFiledSelectorStyle();
}