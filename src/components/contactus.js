import React from 'react';

const ContactUs = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <div className="contact-details">
        <h2>Contact Information</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 123-456-7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
      <div className="contact-form">
        <h2>Contact Form</h2>
        
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

