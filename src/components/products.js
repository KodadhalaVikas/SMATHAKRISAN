import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {

  const [products, setProducts] = useState([]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.example.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
