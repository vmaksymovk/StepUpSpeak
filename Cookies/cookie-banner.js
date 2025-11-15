// cookie-banner.js
class CookieConsent {
    constructor() {
        this.banner = null;
        this.storageKey = 'cookieConsent';
        this.consentGiven = null;
        this.init();
    }

    init() {
        this.loadConsent();
        if (this.consentGiven === null) {
            this.createBanner();
            this.showBanner();
        }
        this.applyConsent();
    }

    loadConsent() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.consentGiven = stored === 'accepted';
        }
    }

    createBanner() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'cookie-overlay';
        overlay.id = 'cookie-overlay';

        // Create banner
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <h3>🍪 Używamy plików cookies</h3>
                    <p>Ta strona korzysta z plików cookie, aby zapewnić najlepsze doświadczenia użytkownika. 
                    Korzystamy z cookies w celach statystycznych, funkcjonalnych i marketingowych. 
                    <a href="privacy-policy.html" target="_blank">Dowiedz się więcej</a></p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-reject" id="cookie-reject">
                        Odrzucam
                    </button>
                    <button class="cookie-btn cookie-btn-accept" id="cookie-accept">
                        Akceptuję
                    </button>
                </div>
            </div>
        `;

        overlay.appendChild(banner);
        document.body.appendChild(overlay);

        this.banner = overlay;

        // Add event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => this.handleAccept());
        document.getElementById('cookie-reject').addEventListener('click', () => this.handleReject());
    }

    showBanner() {
        setTimeout(() => {
            this.banner.classList.add('active');
            // Prevent body scroll when banner is visible
            document.body.style.overflow = 'hidden';
        }, 1000);
    }

    hideBanner() {
        this.banner.classList.remove('active');
        document.body.style.overflow = '';

        // Remove from DOM after animation
        setTimeout(() => {
            if (this.banner && this.banner.parentNode) {
                this.banner.parentNode.removeChild(this.banner);
            }
        }, 400);
    }

    handleAccept() {
        this.consentGiven = true;
        localStorage.setItem(this.storageKey, 'accepted');
        this.hideBanner();
        this.applyConsent();

        // Trigger GTM or other analytics if needed
        if (window.dataLayer) {
            window.dataLayer.push({ 'event': 'cookies_accepted' });
        }
    }

    handleReject() {
        this.consentGiven = false;
        localStorage.setItem(this.storageKey, 'rejected');
        this.hideBanner();
        this.applyConsent();

        // Remove non-essential cookies
        this.removeNonEssentialCookies();

        if (window.dataLayer) {
            window.dataLayer.push({ 'event': 'cookies_rejected' });
        }
    }

    applyConsent() {
        if (this.consentGiven) {
            // Load analytics scripts, Google Tag Manager, etc.
            this.loadAnalytics();
        } else {
            // Block analytics scripts
            this.blockAnalytics();
        }
    }

    loadAnalytics() {
        // Placeholder for analytics loading
        console.log('Loading analytics scripts...');
    }

    blockAnalytics() {
        // Placeholder for blocking analytics
        console.log('Analytics blocked due to user rejection');
    }

    removeNonEssentialCookies() {
        // Remove non-essential cookies
        const cookies = document.cookie.split(';');
        const essentialCookies = ['cookieConsent']; // Keep consent cookie

        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

            if (!essentialCookies.includes(name)) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            }
        }
    }

    // Method to check if consent was given (for other scripts)
    hasConsent() {
        return this.consentGiven === true;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    window.cookieConsent = new CookieConsent();
});