

import React from 'react';
import '../services.css'; 

const services = () => {
  return (
    <div className="services-container">
      <h2 className="services-heading">Our Services</h2>
      <div className="services-row">

        <div className="service-item">
          <img src="service1.jpg" alt="Service 1" className="service-image" />
          <img src="service2.jpg" alt="Service 2" className="service-image" />
          <img src="service3.jpg" alt="Service 3" className="service-image" />
          <p className="service-info">Some information about services 1, 2, and 3.</p>
        </div>

        <div className="service-item">

        </div>

      </div>
    </div>
  );
};

export default services;
