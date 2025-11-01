// src/context/DealContext.js

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
// FIX: Change import path to the new, stable Airtable service
import { fetchDeals } from '../services/data/deals'; 

// 1. Create the context object
const DealContext = createContext();

// 2. Custom hook for easy consumption
export const useDealContext = () => useContext(DealContext); 

// 3. Provider component that manages state
export const DealProvider = ({ children }) => { 
    // All state related to admin/login is removed
    const [deals, setDeals] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('en');
    const [activeCategory, setActiveCategory] = useState('all');

    // Centralized function to load/filter deals (READ-ONLY)
    const loadDeals = useCallback(async (category = activeCategory) => {
        setLoading(true);
        setActiveCategory(category);
        try {
            // New call to the stable Airtable service
            const allDeals = await fetchDeals(); 
            
            // Filtering is done in the frontend after fetching all published deals
            const filteredDeals = allDeals.filter(deal => category === 'all' || deal.category === category);
            
            setDeals(filteredDeals);
        } catch (error) {
            console.error('Failed to fetch deals from Airtable:', error);
            // In a live system, you might set an empty array or show a network error message
            setDeals([]);
        } finally {
            setLoading(false);
        }
    }, [activeCategory]);

    // Initial data load
    useEffect(() => {
        loadDeals();
    }, [loadDeals]);

    // Removed all CRUD functions (create, update, delete) from the 'value' object

    const value = {
        deals,
        loading,
        language,
        activeCategory,
        setLanguage, 
        loadDeals     
    };

    return (
        <DealContext.Provider value={value}>
            {children}
        </DealContext.Provider>
    );
};