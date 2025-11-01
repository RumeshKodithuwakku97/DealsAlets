// src/pages/deals/[slug].js

import React from 'react';
// FIX 1: Corrected path resolution to access the data service from src/services/data/
import { fetchDeals } from '../../services/data/deals.js'; 
import { translate } from '../../lib/translations.js'; 
// FIX 2 & 3: Corrected path resolution to access the components from src/components/common/
import Header from '../../components/common/Header.js';
import Footer from '../../components/common/Footer.js';
// Assuming local styles are imported as a module
import styles from './[slug].module.css'; 


// --- Component to display a single deal ---
function DealPage({ deal }) {
    if (!deal) {
        return <div>Deal Not Found.</div>; 
    }

    const openAffiliateLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className={styles.dealPage}>
            <Header onFilterDeals={() => {}} onSearchSubmit={() => {}} /> 

            <div className="container">
                <div className={styles.dealContentSingle}>
                    <h1 className={styles.dealTitle}>{deal.title}</h1>
                    <div className={styles.dealMetaInfo}>
                        <span>Store: {deal.store}</span> | 
                        <span>Discount: {deal.discount}</span> |
                        <span>Expires: {deal.expiry}</span>
                    </div>

                    <div className={styles.dealImageContainer}>
                        <img src={deal.image} alt={deal.title} className={styles.dealMainImage} />
                    </div>

                    <div className={styles.dealDetails}>
                        <h2>Product Description</h2>
                        <p>{deal.description}</p>

                        <h3>Key Features</h3>
                        <ul>
                            {deal.features && deal.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.dealActionBox}>
                        <span className={styles.currentPrice}>{deal.currentPrice}</span>
                        <span className={styles.originalPrice}>{deal.originalPrice}</span>
                        <button 
                            className={styles.ctaButton} 
                            onClick={() => openAffiliateLink(deal.affiliateUrl)}
                        >
                            GET THE DEAL NOW!
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default DealPage;


// --- Next.js Data Fetching Functions (CRITICAL FOR SEO) ---

// 1. getStaticPaths: Tells Next.js which pages to build
export async function getStaticPaths() {
    // Fetches all deals from Airtable
    const deals = await fetchDeals(); 

    // Create a path for every deal using its slug
    const paths = deals.map((deal) => ({
        params: { slug: deal.slug }, 
    }));

    return { paths, fallback: 'blocking' }; 
}

// 2. getStaticProps: Fetches data for the specific deal page
export async function getStaticProps({ params }) {
    const deals = await fetchDeals();
    
    // Find the specific deal that matches the URL slug
    const deal = deals.find((d) => d.slug === params.slug);

    if (!deal) {
        return { notFound: true }; 
    }

    return {
        props: {
            deal,
        },
        revalidate: 60, 
    };
}