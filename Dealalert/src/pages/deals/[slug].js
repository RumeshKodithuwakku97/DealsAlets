// src/pages/deals/[slug].js

import React from 'react';
import { fetchDeals } from '../services/data/deals'; // Your new Airtable service
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
// If you implement Next.js's Image component, use: 
// import Image from 'next/image'; 

// --- Component to display a single deal ---
function DealPage({ deal }) {
    if (!deal) {
        // Fallback for Next.js when page is not found or still generating
        return <div>Deal Not Found.</div>; 
    }

    const openAffiliateLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="deal-page">
            {/* Header is rendered normally */}
            <Header onFilterDeals={() => {}} onSearchSubmit={() => {}} /> 

            <div className="container">
                <div className="deal-content-single">
                    <h1 className="deal-title">{deal.title}</h1>
                    <div className="deal-meta-info">
                        <span>Store: {deal.store}</span> | 
                        <span>Discount: {deal.discount}</span> |
                        <span>Expires: {deal.expiry}</span>
                    </div>

                    <div className="deal-image-container">
                        {/* If using Next.js Image component, update here */}
                        <img src={deal.image} alt={deal.title} className="deal-main-image" />
                    </div>

                    <div className="deal-details">
                        <h2>Product Description</h2>
                        <p>{deal.description}</p>

                        <h3>Key Features</h3>
                        <ul>
                            {deal.features && deal.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="deal-action-box">
                        <span className="current-price">{deal.currentPrice}</span>
                        <span className="original-price">{deal.originalPrice}</span>
                        <button 
                            className="cta-button" 
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
        params: { slug: deal.slug }, // Assumes you added a 'slug' field in Airtable
    }));

    // fallback: 'blocking' tells Next.js to wait and try to build new pages on-demand
    return { paths, fallback: 'blocking' }; 
}

// 2. getStaticProps: Fetches data for the specific deal page
export async function getStaticProps({ params }) {
    const deals = await fetchDeals();
    
    // Find the specific deal that matches the URL slug
    const deal = deals.find((d) => d.slug === params.slug);

    if (!deal) {
        // If the deal is not found, return a 404 page
        return { notFound: true }; 
    }

    return {
        props: {
            deal,
        },
        // Revalidate the page every 60 seconds (Incremental Static Regeneration)
        // This is how the static site updates prices/deals from Airtable without rebuilding everything.
        revalidate: 60, 
    };
}