// src/components/common/NewsletterForm.js

import React, { useState } from 'react';
import { useDealContext } from '../../context/DealContext'; 
// FIX: Import the new translator
import { translate } from '../../utils/translations'; 

const NewsletterForm = ({ onSubmit }) => {
    const { language } = useDealContext(); 

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        try {
            await onSubmit(email); 
            setEmail('');
        } catch (error) {
            console.error("Subscription failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="newsletter-content">
            <h3>
                <i className="fas fa-envelope"></i>
                {/* FIX: Uses central translation map */}
                {translate('NL_HEADING', language)}
            </h3>
            <p>
                {translate('NL_SUBTEXT', language)}
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
                    {translate('NL_SUBSCRIBE', language)}
                </button>
            </form>
        </div>
    );
};

export default NewsletterForm;