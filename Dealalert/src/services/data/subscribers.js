// src/services/data/subscribers.js

import { SubscribersTable } from '../../lib/airtable';

// WRITE-ONLY function to add a new subscriber from the NewsletterForm
export const addSubscriber = async (email) => {
  try {
    const record = await SubscribersTable.create([
      {
        fields: {
          "Email": email,
          "Date_Added": new Date().toISOString()
        }
      }
    ], { typecast: true });

    return record[0].id; // Return the ID of the new subscriber record

  } catch (error) {
    console.error("Error adding subscriber to Airtable:", error.message);
    throw new Error("Failed to subscribe. Please try again later.");
  }
};