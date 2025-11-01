// src/components/common/Footer.js

import React from 'react';
import { translate } from '../../lib/translations'; 
// FIX 1: Import the CSS file as a module object named 'styles'
import styles from './Footer.module.css'; 


const Footer = () => {
    // Assuming the component uses a default language for simplicity here
    const language = 'en'; 

    return (
        // FIX 2: Apply classes using the styles object (e.g., className={styles.footer})
        <footer className={styles.footer}> 
            <div className={styles.container}>
                <div className={styles.footerLinks}>
                    <a href="/about">{translate('PAGE_ABOUT', language) || "About Us"}</a>
                    <a href="/contact">{translate('PAGE_CONTACT', language) || "Contact"}</a>
                    <a href="/newsletter">{translate('PAGE_NEWSLETTER', language) || "Newsletter"}</a>
                </div>
                <div className={styles.footerBottom}>
                    <p>
                        &copy; {new Date().getFullYear()} LankaDealsAlerts. 
                        {translate('FOOTER_RIGHTS', language) || "All rights reserved."}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;