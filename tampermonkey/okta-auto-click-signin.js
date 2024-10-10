// ==UserScript==
// @name     Auto check rememberMe and Sign in
// @version  1.1
// @grant    none
// @include  https://hireez.okta.com/app/*
// ==/UserScript==
window.onload = function() {
    function checkCheckboxAndSignIn() {
        // Find the checkbox and check it
        let checkbox = document.getElementById('input36');
        if (checkbox && checkbox.name === 'rememberMe' && !checkbox.checked) {
            checkbox.click();

            // Click the next button
            // <div class="o-form-button-bar"><input class="button button-primary" type="submit" value="Next" data-type="save"></div>
            let nextButton = document.querySelector(
                'input[type="submit"][value="Next"][data-type="save"]',
            );
            if (nextButton) {
                nextButton.click();
            }
        }
    }

    // Fill in the password
    function fillPassword() {
        // <div data-se="o-form-input-container" class="o-form-input">
        // <span data-se="o-form-input-credentials.passcode" class="o-form-input-name-credentials.passcode o-form-control okta-form-input-field input-fix">
        // <input type="password" placeholder="" name="credentials.passcode" id="input29" value="" aria-label="" autocomplete="off" class="password-with-toggle">
        // <span class="password-toggle">
        // <span class="eyeicon visibility-16 button-show">
        // </span>
        // <span class="eyeicon visibility-off-16 button-hide">
        // </span>
        // </span>
        // </span>
        // </div>
        let passwordInput = document.querySelector(
            'input[type="password"][name="credentials.passcode"]',
        );
        if (passwordInput) {
            passwordInput.value = '-----------------'; // 请将'你的密码'替换为你的实际密码

            // Create a new 'input' event
            let inputEvent = new Event('input', {
                bubbles: true,
            });

            // Dispatch the event
            passwordInput.dispatchEvent(inputEvent);

            // After checking the checkbox and filling in the password, find the sign in button and click it
            // <div class="o-form-button-bar"><input class="button button-primary" type="submit" value="Verify" data-type="save"></div>
            let signInButton = document.querySelector(
                'input[type="submit"][value="Verify"][data-type="save"]',
            );
            if (signInButton) {
                // Wait for 1 second before clicking the sign in button
                setTimeout(function() {
                    signInButton.click();
                }, 200);
            }
        }
    }

    // Execute once at the beginning
    checkCheckboxAndSignIn();
    fillPassword();

    // Observe DOM changes
    const observer = new MutationObserver(() => {
        checkCheckboxAndSignIn();
        fillPassword();
    });
    observer.observe(document, { childList: true, subtree: true });
};
