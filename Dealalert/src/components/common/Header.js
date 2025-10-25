// src/components/common/Header.js

import React, { useState } from 'react';
import { useDealContext } from '../../context/DealContext'; 
// FIX: Import the new translation data/function
import { translate, categoryData } from '../../utils/translations'; 
import './Header.css';


const Header = ({ onFilterDeals, onSearchSubmit, onShowLogin, onGoToAdmin }) => {
    const { language, setLanguage, loadDeals } = useDealContext(); 
    
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');


    // This function calls the setter from context
    const handleChangeLanguage = (lang) => {
        setLanguage(lang);
    };

    const handleFilterClick = (category) => {
        setActiveCategory(category);
        onFilterDeals(category);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(searchTerm);
    };

    // Note: Auth translations are now in the central map
    const getAuthText = (key) => translate(key, language);


    return (
        <>
            {/* Language Selector */}
            <div className="language-selector">
                <button 
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
                    onClick={() => handleChangeLanguage('en')}>EN</button>
                <button 
                    className={`lang-btn ${language === 'si' ? 'active' : ''}`} 
                    onClick={() => handleChangeLanguage('si')}>සිං</button>
                <button 
                    className={`lang-btn ${language === 'ta' ? 'active' : ''}`} 
                    onClick={() => handleChangeLanguage('ta')}>தமிழ்</button>
            </div>

            {/* Header */}
            <header>
                <div className="container">
                    <div className="header-top">
                        <div className="logo">
                            <i className="fas fa-tags"></i>
                            Lanka<span>Deals</span>Alerts
                        </div>
                        <form className="search-bar" onSubmit={handleSearchSubmit}>
                            <i className="fas fa-search"></i>
                            {/* FIX: Uses central translation map */}
                            <input 
                                type="text" 
                                placeholder={translate('SEARCH_PLACEHOLDER', language)}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                        <div className="auth-buttons">
                            <button onClick={onShowLogin}>
                                <i className="fas fa-user"></i>
                                {getAuthText('LOGIN_BUTTON')}
                            </button>
                            <button onClick={() => alert('Signup functionality would go here!')}>
                                <i className="fas fa-user-plus"></i>
                                {getAuthText('SIGNUP_BUTTON')}
                            </button>
                            <button className="admin-btn" onClick={onGoToAdmin}>
                                <i className="fas fa-cog"></i>
                                {getAuthText('GO_TO_ADMIN')}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation - Categories */}
            <nav>
                <div className="container">
                    <div className="categories">
                        {categoryData.map(cat => (
                            <button 
                                key={cat.id}
                                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`} 
                                onClick={() => handleFilterClick(cat.id)}
                            >
                                <i className={cat.icon}></i>
                                {/* FIX: Uses central translation map */}
                                {translate(cat.key, language)}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;