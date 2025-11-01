// src/services/data/deals.js

import { DealsTable } from '../../lib/airtable';

// Function to normalize Airtable data to the format your React components expect
const normalizeDeal = (record) => {
  return {
    id: record.id,
    title: record.fields.Title,                  // Assuming a column named 'Title'
    store: record.fields.Store,                  // Assuming a column named 'Store'
    affiliateUrl: record.fields.Affiliate_Link,  // Assuming a column named 'Affiliate_Link'
    image: record.fields.Image_URL,              // Assuming a column named 'Image_URL'
    currentPrice: record.fields.Current_Price,
    originalPrice: record.fields.Original_Price,
    discount: record.fields.Discount_Percentage,
    category: record.fields.Category,
    expiry: record.fields.Expiry_Date,
    features: record.fields.Features ? record.fields.Features.split('\n') : []
  };
};

// READ-ONLY function to fetch all published deals for the public site
export const fetchDeals = async () => {
  try {
    const records = await DealsTable.select({
      // Only fetch records where the 'Status' is 'Published'
      filterByFormula: "Status = 'Published'",
      sort: [{ field: "Created_Date", direction: "desc" }]
    }).firstPage();

    return records.map(normalizeDeal);

  } catch (error) {
    console.error("Error fetching deals from Airtable:", error.message);
    throw new Error("Failed to connect to deal database.");
  }
};