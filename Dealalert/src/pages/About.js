import React from 'react';
import './About.module.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <h1>About LankaDealsAlert</h1>
          <p>
            LankaDealsAlert is your ultimate destination for finding the best deals, 
            discounts, and promotions across Sri Lanka. We're dedicated to helping 
            you save money while discovering amazing products and services.
          </p>
          
          <div className="about-features">
            <h2>What We Offer</h2>
            <ul>
              <li>Daily updated deals from trusted stores</li>
              <li>Exclusive discounts and promotions</li>
              <li>Multiple categories including electronics, fashion, food, and more</li>
              <li>Free newsletter with personalized deal recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;