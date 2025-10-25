// src/components/common/NewsletterForm.js

import React, { useState } from 'react';

const getTranslatedText = (textMap, lang) => textMap[lang] || textMap['en'];

const NewsletterForm = ({ language, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const h3Translations = {
        en: "Get Daily Deal Alerts!",
        si: "දිනපතා ගනුදෙනු ඇඟවීම් ලබා ගන්න!",
        ta: "தினசரி ஒப்பந்த எச்சரிக்கைகளைப் பெறுங்கள்!"
    };

    const pTranslations = {
        en: "Never miss the best deals. We'll send you one email per day with the hottest offers.",
        si: "හොඳම ගනුදෙනු කිසිදා අතපසු නොකරන්න. අපි ඔබට දිනකට ඊමේල් එකක් උණුසුම්ම දීමනා සමඟ එවන්නෙමු.",
        ta: "சிறந்த ஒப்பந்தங்களை ஒருபோதும் தவறவிடாதீர்கள். நாங்கள் உங்களுக்கு ஒரு நாளைக்கு ஒரு மின்னஞ்சலை சூடான சலுகைகளுடன் அனுப்புவோம்."
    };

    const buttonTranslations = {
        en: "Subscribe",
        si: "දායක වන්න",
        ta: "குழுசேரவும்"
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        try {
            await onSubmit(email); // Call the subscription logic passed from Home.js
            setEmail('');
        } catch (error) {
            console.error("Subscription failed:", error);
            alert("Subscription failed. Check console for details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="newsletter-content">
            <h3>
                <i className="fas fa-envelope"></i>
                {getTranslatedText(h3Translations, language)}
            </h3>
            <p>
                {getTranslatedText(pTranslations, language)}
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 
                        <i className="fas fa-spinner fa-spin"></i> : 
                        <i className="fas fa-paper-plane"></i>
                    }
                    {getTranslatedText(buttonTranslations, language)}
                </button>
            </form>
        </div>
    );
};

export default NewsletterForm;