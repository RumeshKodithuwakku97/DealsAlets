// src/pages/Contact.js

import React, { useState } from 'react';
import { useDealContext } from '../context/DealContext.js';
import { translate } from '../lib/translations.js';
// FIX 1: Explicitly adding .js extension to imports
import Header from '../components/common/Header.js';
import Footer from '../components/common/Footer.js';
// FIX 2: Importing the page's local CSS as a module object
import styles from './Contact.module.css'; 


function ContactPage() {
    const { language } = useDealContext();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, this would post to a serverless function or an email service (e.g., Formspree, Vercel Functions).
        console.log("Contact Form Submitted:", formData);
        alert(translate('CONTACT_SUCCESS', language) || "Thank you for your message! We will be in touch shortly.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className={styles.contactPage}>
            <Header onFilterDeals={()=>{}} onSearchSubmit={()=>{}} />
            
            <main className={styles.mainContent}>
                <div className="container">
                    {/* Assuming PAGE_CONTACT_TITLE is a translation key */}
                    <h1 className={styles.pageTitle}>{translate('PAGE_CONTACT_TITLE', language) || "Get in Touch"}</h1>
                    
                    <section className={styles.contactSection}>
                        <h2 className={styles.sectionHeading}>{translate('CONTACT_FORM_TITLE', language) || "Send Us a Message"}</h2>
                        
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">{translate('CONTACT_NAME', language) || "Name"}</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="email">{translate('CONTACT_EMAIL', language) || "Email"}</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="message">{translate('CONTACT_MESSAGE', language) || "Message"}</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
                            </div>
                            
                            <button type="submit" className={styles.submitButton}>
                                {translate('CONTACT_SUBMIT', language) || "Submit Inquiry"}
                            </button>
                        </form>
                    </section>

                    <section className={styles.contactInfo}>
                         <h2 className={styles.sectionHeading}>{translate('CONTACT_INFO_TITLE', language) || "Our Details"}</h2>
                         <p>{translate('CONTACT_ADDRESS', language) || "Address: Colombo, Sri Lanka"}</p>
                         <p>{translate('CONTACT_EMAIL_DIRECT', language) || "Email: support@lankadealsalert.com"}</p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ContactPage;