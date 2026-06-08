// DEVICE LIST & SEARCH LOGIC

// DEVICE LIST & SEARCH LOGIC RESTORED HERE
const compatibleDevices = [
    "iPhone 16", "iPhone 16 Pro", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone XS", "iPhone XR", "iPhone SE (2020)",
    "Samsung Galaxy S25", "Samsung Galaxy S24", "Samsung Galaxy S23", "Samsung Galaxy S22", "Samsung Galaxy S21", "Samsung Galaxy S20", "Samsung Note 20", "Samsung Z Flip", "Samsung Z Fold",
    "Google Pixel 9", "Google Pixel 8", "Google Pixel 7", "Google Pixel 6", "Google Pixel 5", "Google Pixel 4",
    "Xiaomi 15", "Xiaomi 14", "Xiaomi 13", "Xiaomi 12", "Xiaomi Redmi Note",
    "Motorola Razr", "Motorola Edge", "Motorola Moto G",
    "Oppo Find X3", "Oppo Reno 6",
    "iPad Pro", "iPad Air", "iPad Mini", "iPad"
];

const deviceInput = document.getElementById('deviceInput');
const suggestionsBox = document.getElementById('suggestions');
const resultDiv = document.getElementById('checkResult');

function showSuggestions() {
    const input = deviceInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = '';
    if(input.length < 2) { suggestionsBox.classList.add('hidden'); return; }
    
    const terms = input.split(/\s+/);
    const matches = compatibleDevices.filter(dev => terms.every(t => dev.toLowerCase().includes(t)));
    
    if(matches.length > 0) {
        matches.forEach(dev => {
            const div = document.createElement('div');
            div.textContent = dev;
            div.className = "px-6 py-4 cursor-pointer hover:bg-red-50 text-gray-700 border-b border-gray-100 last:border-0 transition-colors";
            div.onclick = () => selectDevice(dev);
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.classList.remove('hidden');
    } else {
        suggestionsBox.classList.add('hidden');
    }
}

function selectDevice(name) {
    deviceInput.value = name;
    suggestionsBox.classList.add('hidden');
    resultDiv.innerHTML = `<span class="text-green-600 font-bold">Great! Your ${name} is compatible with eSIM.</span>`;
}

function checkCompatibility() {
    const input = deviceInput.value.trim();
    if(!input) return;
    selectDevice(input); // Simplified check for now
}

if(deviceInput) {
    deviceInput.addEventListener('input', showSuggestions);
    deviceInput.addEventListener('keypress', (e) => { if(e.key==='Enter') checkCompatibility(); });
}
document.addEventListener('DOMContentLoaded', () => {
    // Cookie Banner Logic
    const consentKey = 'sn_cookie_consent';
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    function hideBanner() { if (banner) banner.style.display = 'none'; }
    function showBanner() { if (banner) banner.style.display = 'block'; }
    function setConsent(value) {
        localStorage.setItem(consentKey, JSON.stringify({ value, ts: Date.now() }));
        hideBanner();
    }

    if (banner && acceptBtn && declineBtn) {
        if (!localStorage.getItem(consentKey)) showBanner();
        acceptBtn.onclick = () => setConsent('accepted');
        declineBtn.onclick = () => setConsent('declined');
    }

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                // Allow layout engine to register hidden removal before animating height
                requestAnimationFrame(() => {
                    mobileMenu.style.maxHeight = '400px';
                });
            } else {
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            });
        });
    }
});