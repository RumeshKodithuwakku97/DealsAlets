import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="contact-item">
                <h3>Email</h3>
                <p>hello@lankadealsalert.com</p>
              </div>
              <div className="contact-item">
                <h3>Follow Us</h3>
                <p>Stay updated with our latest deals</p>
              </div>
            </div>
            
            <div className="contact-form">
              <h2>Send Message</h2>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;