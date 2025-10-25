// src/components/common/Footer.js

import React from 'react';
import { useDealContext } from '../../context/DealContext'; 
// FIX: Import the new translator
import { translate } from '../../utils/translations'; 
import './Footer.css';


const Footer = () => {
    const { language } = useDealContext();
    
    // Note: The logic for displaying only the correct language string is now handled
    // within the translate function's output, simplifying the JSX dramatically.
    
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>LankaDealsAlerts</h4>
                        <p>{translate('FOOTER_TRUSTED_SOURCE', language)}</p>
                        
                        <a href="/admin/login" className="admin-link">
                            <i className="fas fa-cog"></i>
                            {translate('GO_TO_ADMIN', language)}
                        </a>
                    </div>
                    <div className="footer-section">
                        <h4>{translate('FOOTER_STORES_TITLE', language)}</h4>
                        <div className="footer-links">
                            <a href="#"><i className="fas fa-store"></i> Daraz.lk Deals</a>
                            {/* ... other store links ... */}
                        </div>
                    </div>
                    <div className="footer-section">
                        <h4>{translate('FOOTER_CATEGORIES_TITLE', language)}</h4>
                        <div className="footer-links">
                            <a href="#"><i className="fas fa-laptop"></i> {translate('CATEGORY_ELECTRONICS', language)}</a>
                            <a href="#"><i className="fas fa-tshirt"></i> {translate('CATEGORY_FASHION', language)}</a>
                            {/* ... other category links ... */}
                        </div>
                    </div>
                    <div className="footer-section">
                        <h4>{translate('FOOTER_SUPPORT_TITLE', language)}</h4>
                        <div className="footer-links">
                            <a href="#"><i className="fas fa-info-circle"></i> {translate('FOOTER_ABOUT', language)}</a>
                            <a href="#"><i className="fas fa-envelope"></i> {translate('FOOTER_CONTACT', language)}</a>
                            <a href="#"><i className="fas fa-shield-alt"></i> {translate('FOOTER_PRIVACY', language)}</a>
                            <a href="#"><i className="fas fa-file-contract"></i> {translate('FOOTER_TERMS', language)}</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>{translate('FOOTER_COPYRIGHT', language)}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;