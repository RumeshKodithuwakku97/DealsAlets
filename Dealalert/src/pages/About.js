// src/pages/About.js

import React from 'react';
import { useDealContext } from '../context/DealContext.js';
import { translate } from '../lib/translations.js'; 
// FIX 1: Explicitly adding .js extension to imports
import Header from '../components/common/Header.js';
import Footer from '../components/common/Footer.js';
// FIX 2: Importing the page's local CSS as a module object
import styles from './About.module.css'; 


function AboutPage() {
    // Get language context from the provider
    const { language } = useDealContext();

    return (
        <div className={styles.aboutPage}>
            <Header onFilterDeals={()=>{}} onSearchSubmit={()=>{}} />
            
            <main className={styles.mainContent}>
                <div className="container">
                    {/* Assuming PAGE_ABOUT_TITLE is a translation key */}
                    <h1 className={styles.pageTitle}>{translate('PAGE_ABOUT_TITLE', language) || "About LankaDealsAlerts"}</h1>
                    
                    <section className={styles.aboutSection}>
                        <h2 className={styles.sectionHeading}>{translate('ABOUT_MISSION_TITLE', language) || "Our Mission"}</h2>
                        <p>{translate('ABOUT_MISSION_TEXT', language) || "Our mission is simple: to help you save money. We tirelessly track the web's best deals on electronics, fashion, and everyday essentials across Sri Lanka, so you never have to pay full price again."}</p>
                    </section>

                    <section className={styles.aboutSection}>
                        <h2 className={styles.sectionHeading}>{translate('ABOUT_TEAM_TITLE', language) || "Why Choose Us?"}</h2>
                        <ul className={styles.featureList}>
                            <li>{translate('ABOUT_FEATURE_1', language) || "Hand-picked Deals: Every offer is verified by a human."}</li>
                            <li>{translate('ABOUT_FEATURE_2', language) || "Daily Alerts: We update our feed multiple times a day."}</li>
                            <li>{translate('ABOUT_FEATURE_3', language) || "Community Focused: We prioritize deals relevant to the local market."}</li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AboutPage;