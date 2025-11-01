// src/lib/airtable.js (Code is correct, issue is external setup)

import Airtable from 'airtable';

// Environment variables are read automatically by Next.js/Vercel
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  // This error message confirmed the setup failed
  console.error("Airtable environment variables are missing! Check .env.local.");
}

// Initialize the Airtable connection base
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

export default base;

// Export tables for easy access in other service files
export const DealsTable = base('Deals');
export const SubscribersTable = base('Subscribers');