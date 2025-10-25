// src/services/wordpress/deals.js

import WordPressAPI from './api';

// ----------------------------------------------------------------------
// 1. PUBLIC SITE FUNCTIONS (Required by DealContext.js)
// NOTE: These are placeholders based on the logic extracted from index.html

export const getSampleDeals = () => [
    // This is where the sample data from index.html (dealsData) goes
    {
        id: 1,
        title: "Samsung Galaxy S24 Ultra 5G",
        store: "Daraz.lk",
        currentPrice: "Rs. 287,500",
        originalPrice: "Rs. 359,999",
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3",
        category: "electronics",
        affiliateUrl: "https://daraz.lk/affiliate-link-1"
    },
    // ... add all other sample deals here ...
];

export const getSampleDigitalDeals = () => [
    // This is where the sample data from index.html (digitalDealsData) goes
    {
        id: 101,
        title: "Hostinger Web Hosting - 75% OFF",
        store: "Hostinger",
        currentPrice: "$2.49/month",
        originalPrice: "$9.99/month",
        discount: "75% OFF",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3",
        category: "digital",
        features: ["Free Domain", "Free SSL", "WordPress Optimized"],
        affiliateUrl: "https://hostinger.com/affiliate-link"
    }
    // ... add all other sample digital deals here ...
];

// Mock function for fetching deals, used by DealContext for initial load/fallback
export const fetchDealsFromWordPress = async (category) => {
    // In a real environment, this would call getDeals() or a filtered version
    console.log(`Fetching mock deals for category: ${category}`);
    return getSampleDeals();
};

// ----------------------------------------------------------------------
// 2. ADMIN SITE FUNCTIONS (Fixes compilation errors)

// FIX: Exported directly to be found by AdminDashboard.js and DealManagement.js
export const createDeal = async (dealData) => {
  return await WordPressAPI.post('/wp-json/wp/v2/deals', {
    title: dealData.title,
    content: dealData.description || '',
    status: 'publish',
    meta: {
      original_price: dealData.originalPrice,
      discount_price: dealData.discountPrice,
      deal_url: dealData.url,
      expiry_date: dealData.expiryDate,
      store_name: dealData.store,
      category: dealData.category,
      featured: dealData.featured || false
    }
  });
};

// FIX: Exported directly
export const getDeals = async () => {
  return await WordPressAPI.get('/wp-json/wp/v2/deals?per_page=100&_embed');
};

// FIX: Exported directly
export const updateDeal = async (id, dealData) => {
  return await WordPressAPI.put(`/wp-json/wp/v2/deals/${id}`, dealData);
};

// FIX: Exported directly
export const deleteDeal = async (id) => {
  return await WordPressAPI.delete(`/wp-json/wp/v2/deals/${id}`);
};