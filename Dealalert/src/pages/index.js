// src/pages/index.js (Your Home Page Component)

import React, { useEffect } from 'react';
import { useDealContext } from '../context/DealContext.js'; 
import { translate } from '../lib/translations.js'; 
import Header from '../components/common/Header.js';
import Footer from '../components/common/Footer.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import NewsletterForm from '../components/common/NewsletterForm.js'; 
// FIX: Import the component's local styles
import styles from './Home.module.css'; 


// --- Helper Functions (Pure functions - Keep outside of component or in a utility file) ---
function calculateDiscount(original, discount) {
    if (!original || !discount) return '0% OFF';
    const numOriginal = parseFloat(original);
    const numDiscount = parseFloat(discount);
    if (isNaN(numOriginal) || isNaN(numDiscount) || numOriginal <= 0) return '0% OFF';
    const discountPercent = Math.round((1 - numDiscount / original) * 100);
    return `${discountPercent}% OFF`;
}

function getExpiryText(expiryDate) {
    if (!expiryDate) return 'Limited Time';
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays === 1) return '1 day left';
    if (diffDays <= 7) return `${diffDays} days left`;
    return 'Limited Time';
}


// --- Deal Card Component (Defined locally for simplicity) ---
const DealCard = ({ deal }) => {
    const openAffiliateLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className={styles.dealCard} onClick={() => openAffiliateLink(deal.affiliateUrl)}>
            <div style={{ position: 'relative' }}>
                <img src={deal.image} alt={deal.title} className={styles.dealImage} />
                <div className={styles.dealBadge}>{deal.discount}</div>
            </div>
            <div className={styles.dealContent}>
                <div className={styles.dealStore}>
                    <i className="fas fa-store"></i>
                    {deal.store}
                </div>
                <h3 className={styles.dealTitle}>{deal.title}</h3>
                <div className={styles.dealPrice}>
                    <span className={styles.currentPrice}>{deal.currentPrice}</span>
                    <span className={styles.originalPrice}>{deal.originalPrice}</span>
                </div>
                {deal.features && (
                    <div style={{ marginBottom: '1rem' }}>
                        {deal.features.map((feature, index) => (
                            <div key={index} className={styles.dealFeature}>
                                <i className="fas fa-check" style={{ color: '#38a169' }}></i> {feature}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.dealMeta}>
                    <span><i className="far fa-clock"></i> {deal.expiry || 'Limited Time'}</span>
                    <span><i className="fas fa-fire"></i> Hot Deal</span>
                </div>
            </div>
        </div>
    );
};


// --- Main Home Component ---

function Home() {
    const { 
        deals, loading, language, loadDeals 
    } = useDealContext(); 

    // Initial data load effect
    useEffect(() => {
        loadDeals('all'); 
    }, [loadDeals]);

    // --- Event Handlers ---
    const handleFilterDeals = (category) => {
        loadDeals(category);
    };

    const handleSearchSubmit = (term) => {
        alert(`${translate('SEARCH_PLACEHOLDER', language)}: "${term}"`);
    };

    const scrollToDeals = () => {
        document.getElementById('dealsGrid').scrollIntoView({ behavior: 'smooth' });
    };
    
    const subscribeNewsletter = async (email) => { 
        // This function would call the addSubscriber service in a real deployment
        alert(translate('NL_HEADING', language) + ` subscription for ${email} simulated.`);
    };

    // --- Conditional Render ---
    if (loading) {
        return (
            <div className={styles.loadingDeals} style={{ marginTop: '100px', textAlign: 'center' }}>
                <LoadingSpinner />
                <p>{translate('LOADING_MESSAGE', language)}</p>
            </div>
        );
    }

    return (
        <div className={styles.homePage}>
            <Header
                onFilterDeals={handleFilterDeals}
                onSearchSubmit={handleSearchSubmit}
            />
            
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>{translate('HERO_HEADING', language)}</h1>
                        <p>{translate('HERO_SUBTEXT', language)}</p>
                        
                        <button className={styles.ctaButton} onClick={scrollToDeals}>
                            <i className="fas fa-bolt"></i>
                            {translate('CTA_EXPLORE_DEALS', language)}
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container">
                {/* Hot Deals Section */}
                <section className={styles.dealsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>
                            <i className="fas fa-fire"></i>
                            {translate('SECTION_TITLE_HOT_DEALS', language)}
                        </h2>
                        <a href="#" className={styles.viewAll}>
                            {translate('VIEW_ALL', language)}
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div className={styles.dealsGrid} id="dealsGrid">
                        {deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
                    </div>
                </section>

                {/* Digital Products Section */}
                <section className={styles.dealsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>
                            <i className="fas fa-desktop"></i>
                            {translate('SECTION_TITLE_DIGITAL', language)}
                        </h2>
                        <a href="#" className={styles.viewAll}>
                            {translate('VIEW_ALL', language)}
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div className={styles.dealsGrid} id="digitalDeals">
                        {/* Filters deals locally from context state */}
                        {deals.filter(d => d.category === 'digital').map((deal) => <DealCard key={deal.id} deal={deal} />)}
                    </div>
                </section>

                {/* Newsletter */}
                <section className={styles.newsletter}>
                    <NewsletterForm onSubmit={subscribeNewsletter} language={language} /> 
                </section>
            </div>
            
            <Footer />
        </div>
    );
}

// CRITICAL: Export the component as the default export for the page
export default Home;