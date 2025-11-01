// src/pages/Newsletter.js

import React from 'react';
// FIX: Explicitly adding .js extension to all component imports for Vercel stability
import Header from '../components/common/Header.js'; 
import Footer from '../components/common/Footer.js'; 
import NewsletterFormComponent from '../components/common/NewsletterForm.js'; 
import { useDealContext } from '../context/DealContext.js'; 
import { translate } from '../lib/translations.js'; 
// Assuming the page's local CSS is correctly named and placed
import styles from './Newsletter.module.css'; 


function NewsletterPage() {
    const { language } = useDealContext();
    
    // This function acts as the bridge to the Airtable service
    const handleSubmit = async (email) => {
        console.log("Newsletter submission attempt for:", email);
        // NOTE: This is where you would call addSubscriber(email) from src/services/data/subscribers.js
        
        // Throw an error here if the submission logic fails:
        // throw new Error("Airtable submission failed.");
    };

    return (
        // Apply local module styles for the page layout
        <div className={styles.newsletterPage}> 
            <Header onFilterDeals={()=>{}} onSearchSubmit={()=>{}} />
            
            <main className={styles.mainContent}>
                {/* Assuming NL_PAGE_TITLE is a translation key */}
                <h1 className={styles.pageTitle}>{translate('NL_PAGE_TITLE', language) || "Newsletter Signup"}</h1>
                
                {/* The form component handles its own styling and logic internally */}
                <NewsletterFormComponent 
                    language={language}
                    onSubmit={handleSubmit}
                />
            </main>
            
            <Footer />
        </div>
    );
}

export default NewsletterPage;