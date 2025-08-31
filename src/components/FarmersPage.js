import React from 'react';
import '../styles/FarmersPage.css';

const FarmersPage = () => {
  return (
    <div className="container">
      <section className="section">
        <h2>Modern Farming Technologies</h2>
        <div className="image">
          <img src="../Assets/modern.jpeg" alt="Modern Farming Technologies" />
        </div>
        <p>
          Learn about the latest advancements in farming technologies, including precision agriculture,
          IoT sensors, drones, and more. These technologies can help improve crop yields, reduce water usage,
          and optimize resource allocation.
        </p>
      </section>

      <section className="section">
        <h2>Avoiding Pesticides</h2>
        <div className="image">
          <img src="../Assets/avoiding_pesticides.jpg" alt="Avoiding Pesticides" />
        </div>
        <p>
          Discover methods for pesticide-free farming, such as integrated pest management (IPM), crop rotation,
          and biological pest control. Pesticide-free farming promotes environmental sustainability and protects
          human health.
        </p>
      </section>

      <section className="section">
        <h2>Safe Farming Practices</h2>
        <div className="image">
          <img src="../Assets/safe_farming.jpg" alt="Safe Farming Practices" />
        </div>
        <p>
          Explore best practices for safe farming, including proper handling of agricultural chemicals, use of
          personal protective equipment (PPE), and implementation of safety protocols. Safe farming practices
          ensure the well-being of farmers and farm workers.
        </p>
      </section>
    </div>
  );
};

export default FarmersPage;
