// src/context/DealContext.js

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
// FIX: Path must be correct relative to the context folder
import { fetchDealsFromWordPress, getSampleDeals } from '../services/wordpress/deals'; 

// 1. Create the context object
const DealContext = createContext();

// 2. Custom hook for easy consumption
export const useDealContext = () => useContext(DealContext); // <-- Hook definition

// 3. Provider component that manages state
export const DealProvider = ({ children }) => { // <-- Functional Component
    // ALL HOOKS MUST BE CALLED INSIDE THIS FUNCTION
    const [deals, setDeals] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('en');
    const [activeCategory, setActiveCategory] = useState('all');

    // Centralized function to load/filter deals
    const loadDeals = useCallback(async (category = activeCategory) => {
        setLoading(true);
        setActiveCategory(category);
        try {
            // Placeholder/Sample Data Logic
            const sampleData = getSampleDeals();
            const filteredDeals = sampleData.filter(deal => category === 'all' || deal.category === deal.category);
            
            setDeals(filteredDeals);
        } catch (error) {
            console.error('Failed to fetch deals in context, using sample data:', error);
            const sampleData = getSampleDeals();
            const filteredDeals = sampleData.filter(deal => category === 'all' || deal.category === category);
            setDeals(filteredDeals);
        } finally {
            setLoading(false);
        }
    }, [activeCategory]);

    // Initial data load
    useEffect(() => {
        loadDeals();
    }, [loadDeals]);


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