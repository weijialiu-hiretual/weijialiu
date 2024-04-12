// ==UserScript==
// @name     Auto check rememberMe and Sign in
// @version  1
// @grant    none
// @include  https://hireez.okta.com/app/*
// ==/UserScript==
window.onload = function() {
    function checkCheckboxAndSignIn() {
        let checkbox = document.getElementById('input44');
        if (checkbox && checkbox.name === 'rememberMe' && !checkbox.checked) {
            checkbox.click();

            // Fill in the password
            let passwordInput = document.getElementById('input36');
            if (passwordInput && passwordInput.name === 'credentials.passcode') {
                passwordInput.value = '你的密码'; // 请将'你的密码'替换为你的实际密码

                // Create a new 'input' event
                let inputEvent = new Event('input', { bubbles: true });

                // Dispatch the event
                passwordInput.dispatchEvent(inputEvent);

                // After checking the checkbox and filling in the password, find the sign in button and click it
                let signInButton = document.querySelector('input[type="submit"][value="Sign in"]');
                if (signInButton) {
                    // Wait for 1 second before clicking the sign in button
                    setTimeout(function() {
                        signInButton.click();
                    }, 1000);
                }
            }
        }
    }

    // Execute once at the beginning
    checkCheckboxAndSignIn();

    // Then execute on every DOM change
    const observer = new MutationObserver(checkCheckboxAndSignIn);
    observer.observe(document, { childList: true, subtree: true });
}