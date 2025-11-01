// src/pages/Newsletter.js

import React from 'react';
// FIX: The faulty CSS import that caused the error is removed.
// import './NewsletterForm.module.css'; // <-- THIS LINE WAS THE PROBLEM

import Header from '../components/common/Header.js'; 
import Footer from '../components/common/Footer.js'; 
import NewsletterForm from '../components/common/NewsletterForm.js'; // The component is imported correctly
import { useDealContext } from '../context/DealContext.js'; 
// Assuming the page's local CSS is correctly named and placed
import styles from './Newsletter.module.css'; 


function NewsletterPage() {
    const { language } = useDealContext();
    
    // Placeholder submission logic that would call the Airtable service
    const handleSubmit = async (email) => {
        console.log("Newsletter submission attempt for:", email);
        // This is where you would call addSubscriber(email) from src/services/data/subscribers.js
    };

    return (
        // Apply local module styles for the page layout
        <div className={styles.newsletterPage}> 
            {/* Header needs props even if empty */}
            <Header onFilterDeals={()=>{}} onSearchSubmit={()=>{}} />
            <main className={styles.mainContent}>
                {/* The NewsletterForm component handles its own CSS module import internally */}
                <NewsletterForm 
                    language={language}
                    onSubmit={handleSubmit}
                />
            </main>
            <Footer />
        </div>
    );
}

export default NewsletterPage;