// src/components/common/NewsletterForm.js

import React, { useState } from 'react';
// FIX 1: Import the central translation utility from lib/, explicitly adding .js
import { translate } from '../../lib/translations.js'; 
// FIX 2: Import CSS as a module object (requires NewsletterForm.module.css file)
import styles from './NewsletterForm.module.css'; 

const NewsletterForm = ({ language, onSubmit }) => {
    // Use language prop or default to 'en'
    const lang = language || 'en'; 

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Clear previous message

        if (!email) {
            // Assuming NL_EMAIL_REQUIRED is defined in translations.js
            setMessage(translate('NL_EMAIL_REQUIRED', lang) || "Email is required.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            // This calls the subscription logic in src/pages/Home.js, which uses the Airtable service
            await onSubmit(email); 
            
            // Assuming NL_SUCCESS is defined in translations.js
            setMessage(translate('NL_SUCCESS', lang) || "Successfully subscribed!");
            setEmail('');
        } catch (error) {
            console.error("Subscription failed:", error);
            // Assuming NL_FAILURE is defined in translations.js
            setMessage(translate('NL_FAILURE', lang) || "Subscription failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Apply CSS classes using the styles object (from NewsletterForm.module.css)
        <div className={styles.newsletterContent}> 
            <h3 className={styles.newsletterH3}>
                <i className="fas fa-envelope"></i>
                {translate('NL_HEADING', lang)}
            </h3>
            <p className={styles.newsletterP}>
                {translate('NL_SUBTEXT', lang) || "Subscribe for daily deal alerts."}
            </p>
            <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder={translate('NL_PLACEHOLDER', lang) || "Enter your email address"} 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.newsletterInput}
                    disabled={isSubmitting}
                />
                <button type="submit" className={styles.newsletterButton} disabled={isSubmitting}>
                    {isSubmitting ? 
                        <i className="fas fa-spinner fa-spin"></i> : 
                        <i className="fas fa-paper-plane"></i>
                    }
                    {translate('NL_BUTTON', lang) || "Subscribe"}
                </button>
            </form>
            {message && <p className={styles.formMessage}>{message}</p>}
        </div>
    );
};

export default NewsletterForm;