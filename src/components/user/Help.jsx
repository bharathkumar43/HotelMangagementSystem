import React from 'react';

const Help = () => {
  return (
    <>
      <div className="help-container">
        <div className="help-header">
          <h1>How Can We Help You?</h1>
          <p>We're here to assist you with any inquiries or issues. Browse through our FAQs or contact us directly for assistance.</p>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How can I book a room?</h3>
            <p>You can book a room by visiting our "Rooms" section and selecting your desired dates and preferences.</p>
          </div>
          <div className="faq-item">
            <h3>What payment methods are accepted?</h3>
            <p>We accept major credit cards (Visa, MasterCard), debit cards, and online payment methods like PayPal.</p>
          </div>
          <div className="faq-item">
            <h3>Can I change or cancel my reservation?</h3>
            <p>Yes, reservations can be modified or canceled within 24 hours of booking. Please refer to our cancellation policy for more details.</p>
          </div>
          <div className="faq-item">
            <h3>Are pets allowed in the hotel?</h3>
            <p>We are a pet-friendly hotel! Please notify us in advance if you're bringing a pet along with your stay.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer room service?</h3>
            <p>Yes, room service is available 24/7 for your convenience. Browse our menu in the room and place an order.</p>
          </div>
        </div>

        <div className="contact-info">
          <h2>Need More Assistance?</h2>
          <p>If you still have questions or need further assistance, don't hesitate to contact us directly:</p>
          <p><i className="fas fa-phone"></i> Call us at: +91 98765 43210</p>
          <p><i className="fas fa-envelope"></i> Email us: <a href="mailto:info@grandhotel.com">info@grandhotel.com</a></p>
          <p><i className="fas fa-map-marker-alt"></i> Visit us: 123 Grand Street, Hyderabad, India</p>
        </div>
      </div>
    </>
  );
}

export default Help;
