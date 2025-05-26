document.addEventListener("DOMContentLoaded", function() {
    const copyBtn = document.getElementById('copy-email-btn');
    const copiedMsg = document.getElementById('email-copied-msg');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const email = 'vihaanvpyt@outlook.com';
            navigator.clipboard.writeText(email).then(function() {
                if (copiedMsg) {
                    copiedMsg.style.display = 'inline';
                    setTimeout(() => { copiedMsg.style.display = 'none'; }, 1200);
                }
            });
        });
    }
});