// Функция для проверки предпочтений cookies
function getCookiePreference() {
    return localStorage.getItem('cookie-preference') || 
           document.cookie.replace(/(?:(?:^|.*;\s*)cookie-preference\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

// Функция для установки предпочтений
function setCookiePreference(value) {
    localStorage.setItem('cookie-preference', value);
    document.cookie = `cookie-preference=${value}; max-age=${365*24*60*60}; path=/; SameSite=Lax`;
}

// Инициализация cookie-баннера
function initCookieConsent() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-consent-container">
            <div class="cookie-consent-text">
                <p>Ta strona korzysta z plików cookie, aby zapewnić najlepszą jakość usług. 
                    <a href="privacy-policy.html" target="_blank">Dowiedz się więcej</a>
                </p>
            </div>
            <div class="cookie-consent-buttons">
                <button id="reject-cookies" class="cookie-btn secondary-btn">Odrzuć</button>
                <button id="accept-cookies" class="cookie-btn primary-btn">Akceptuję</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    const acceptBtn = banner.querySelector('#accept-cookies');
    const rejectBtn = banner.querySelector('#reject-cookies');
    
    if (!getCookiePreference()) {
        setTimeout(() => {
            banner.classList.add('active');
        }, 1000);
    }
    
    acceptBtn.addEventListener('click', () => {
        setCookiePreference('accepted');
        banner.classList.remove('active');
        loadAnalytics();
    });
    
    rejectBtn.addEventListener('click', () => {
        setCookiePreference('rejected');
        banner.classList.remove('active');
        window['ga-disable-UA-XXXXXX-X'] = true;
    });
}

// Загрузка аналитики (замените на свой код)
function loadAnalytics() {
    if (getCookiePreference() === 'accepted') {
        console.log('Loading analytics...');
        // Здесь ваш код Google Analytics/Facebook Pixel и т.д.
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initCookieConsent();
    
    // Если согласие уже дано, загружаем аналитику
    if (getCookiePreference() === 'accepted') {
        loadAnalytics();
    }
});