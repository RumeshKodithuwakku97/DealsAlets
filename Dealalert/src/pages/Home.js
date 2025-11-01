// src/pages/Home.js

import React, { useEffect, useCallback } from 'react';
// FIX: CRITICAL ADDITION - Importing the required hook
import { useDealContext } from '../context/DealContext.js'; 
import { translate } from '../lib/translations.js';
import Header from '../components/common/Header.js';
import Footer from '../components/common/Footer.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import NewsletterForm from '../components/common/NewsletterForm.js'; 

import './Home.module.css'; 


// --- Helper Functions (REMAINS THE SAME) ---
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


// --- Deal Card Component (REMAINS THE SAME) ---
const DealCard = ({ deal }) => {
    const openAffiliateLink = (url) => {
        window.open(url, '_blank');
        console.log('Affiliate click tracked:', url);
    };

    return (
        <div className="deal-card" onClick={() => openAffiliateLink(deal.affiliateUrl)}>
            <div style={{ position: 'relative' }}>
                <img src={deal.image} alt={deal.title} className="deal-image" />
                <div className="deal-badge">{deal.discount}</div>
            </div>
            <div className="deal-content">
                <div className="deal-store">
                    <i className="fas fa-store"></i>
                    {deal.store}
                </div>
                <h3 className="deal-title">{deal.title}</h3>
                <div className="deal-price">
                    <span className="current-price">{deal.currentPrice}</span>
                    <span className="original-price">{deal.originalPrice}</span>
                </div>
                {deal.features && (
                    <div style={{ marginBottom: '1rem' }}>
                        {deal.features.map((feature, index) => (
                            <div key={index} style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.2rem' }}>
                                <i className="fas fa-check" style={{ color: '#38a169' }}></i> {feature}
                            </div>
                        ))}
                    </div>
                )}
                <div className="deal-meta">
                    <span><i className="far fa-clock"></i> {deal.expiry || 'Limited Time'}</span>
                    <span><i className="fas fa-fire"></i> Hot Deal</span>
                </div>
            </div>
        </div>
    );
};


// --- Main Home Component ---

function Home() {
    // CRITICAL: Hook call is correctly inside the function body.
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
    
    // REMOVED: showLogin and goToAdmin functions are deleted.
    
    const scrollToDeals = () => {
        document.getElementById('dealsGrid').scrollIntoView({ behavior: 'smooth' });
    };
    
    const subscribeNewsletter = async (email) => {
        // This function will use the new data/subscribers.js service (POST)
        alert(translate('NL_HEADING', language) + ` for ${email}.`);
    };

    // --- Conditional Render ---
    if (loading) {
        return (
            <div className="loading-deals" style={{ marginTop: '100px', textAlign: 'center' }}>
                <LoadingSpinner />
                <p>{translate('LOADING_MESSAGE', language)}</p>
            </div>
        );
    }

    return (
        <div className="home-page">
            <Header
                onFilterDeals={handleFilterDeals}
                onSearchSubmit={handleSearchSubmit}
                // REMOVED: onShowLogin and onGoToAdmin props
            />
            
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        {/* Uses central translation */}
                        <h1>{translate('HERO_HEADING', language)}</h1>
                        <p>{translate('HERO_SUBTEXT', language)}</p>
                        
                        <button className="cta-button" onClick={scrollToDeals}>
                            <i className="fas fa-bolt"></i>
                            {translate('CTA_EXPLORE_DEALS', language)}
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container">
                {/* Hot Deals Section */}
                <section className="deals-section">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-fire"></i>
                            {translate('SECTION_TITLE_HOT_DEALS', language)}
                        </h2>
                        <a href="#" className="view-all">
                            {translate('VIEW_ALL', language)}
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div className="deals-grid" id="dealsGrid">
                        {deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
                    </div>
                </section>

                {/* Digital Products Section */}
                <section className="deals-section">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-desktop"></i>
                            {translate('SECTION_TITLE_DIGITAL', language)}
                        </h2>
                        <a href="#" className="view-all">
                            {translate('VIEW_ALL', language)}
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div className="deals-grid" id="digitalDeals">
                        {/* Filters deals locally from context state */}
                        {deals.filter(d => d.category === 'digital').map((deal) => <DealCard key={deal.id} deal={deal} />)}
                    </div>
                </section>

                {/* Newsletter */}
                <section className="newsletter">
                    <NewsletterForm onSubmit={subscribeNewsletter} /> 
                </section>
            </div>
            
            <Footer />
        </div>
    );
}

export default Home;