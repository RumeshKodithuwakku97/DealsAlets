// src/lib/translations.js
// This file centralizes all translatable strings and category data.

const translationMap = {
    // --- UI/Global Texts ---
    SEARCH_PLACEHOLDER: {
        en: "Search for deals...",
        si: "ගනුදෙනු සොයන්න...",
        ta: "உடன்படிக்கைகளைத் தேடுங்கள்...",
    },
    LOADING_MESSAGE: {
        en: "Loading exciting deals...",
        si: "උද්යෝගිමත් ගනුදෙනු පූරණය වෙමින් පවතී...",
        ta: "சுவாரஸ்யமான ஒப்பந்தங்கள் ஏற்றப்படுகின்றன...",
    },
    VIEW_ALL: {
        en: "View All",
        si: "සියල්ල බලන්න",
        ta: "அனைத்தையும் காண்க",
    },

    // --- Home Page / Hero ---
    HERO_HEADING: {
        en: "Find the Hottest Deals in Sri Lanka",
        si: "ශ්‍රී ලංකාවේ උණුසුම්ම ගනුදෙනු සොයා ගන්න",
        ta: "இலங்கையில் மிகச்சிறந்த ஒப்பந்தங்களைக் கண்டறியவும்",
    },
    HERO_SUBTEXT: {
        en: "Daily alerts on electronics, fashion, and digital products, hand-picked for you.",
        si: "ඉලෙක්ට්‍රොනික උපකරණ, විලාසිතා සහ ඩිජිටල් නිෂ්පාදන පිළිබඳ දිනපතා ඇඟවීම්.",
        ta: "எலெக்ட்ரானிக்ஸ், ஃபேஷன் மற்றும் டிஜிட்டல் தயாரிப்புகள் குறித்த தினசரி விழிப்பூட்டல்கள்.",
    },
    CTA_EXPLORE_DEALS: {
        en: "Explore Deals",
        si: "ගනුදෙනු ගවේෂණය කරන්න",
        ta: "ஒப்பந்தங்களை ஆராயுங்கள்",
    },
    SECTION_TITLE_HOT_DEALS: {
        en: "🔥 Hot Deals Today",
        si: "🔥 අද උණුසුම් ගනුදෙනු",
        ta: "🔥 இன்றைய சூடான ஒப்பந்தங்கள்",
    },
    SECTION_TITLE_DIGITAL: {
        en: "💻 Digital Products",
        si: "💻 ඩිජිටල් නිෂ්පාදන",
        ta: "💻 டிஜிட்டல் தயாரிப்புகள்",
    },
    NL_HEADING: {
        en: "Get Exclusive Deals to your Inbox",
        si: "විශේෂ ගනුදෙනු ඔබගේ එන ලිපි පෙට්ටියට ලබා ගන්න",
        ta: "பிரத்தியேக ஒப்பந்தங்களை உங்கள் இன்பாக்ஸில் பெறுங்கள்",
    },

    // --- Category Names ---
    CATEGORY_ALL: {
        en: "All",
        si: "සියලු",
        ta: "அனைத்து",
    },
    CATEGORY_ELECTRONICS: {
        en: "Electronics",
        si: "ඉලෙක්ට්‍රොනික",
        ta: "எலெக்ட்ரானிக்ஸ்",
    },
    CATEGORY_FASHION: {
        en: "Fashion",
        si: "විලාසිතා",
        ta: "ஃபேஷன்",
    },
    CATEGORY_DIGITAL: {
        en: "Digital",
        si: "ඩිජිටල්",
        ta: "டிஜிட்டல்",
    },
    CATEGORY_HOME: {
        en: "Home & Garden",
        si: "නිවස සහ උද්‍යානය",
        ta: "வீடு மற்றும் தோட்டம்",
    },
};

// Data used to build the category navigation bar
export const categoryData = [
    { id: 'all', key: 'CATEGORY_ALL', icon: 'fas fa-globe' },
    { id: 'electronics', key: 'CATEGORY_ELECTRONICS', icon: 'fas fa-bolt' },
    { id: 'fashion', key: 'CATEGORY_FASHION', icon: 'fas fa-tshirt' },
    { id: 'digital', key: 'CATEGORY_DIGITAL', icon: 'fas fa-laptop-code' },
    { id: 'home', key: 'CATEGORY_HOME', icon: 'fas fa-home' },
];

// Main function to look up the translation
export const translate = (key, lang = 'en') => {
    // Returns the translated string or a fallback if not found
    return translationMap[key]?.[lang] || translationMap[key]?.['en'] || key;
};