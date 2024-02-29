import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://dummyjson.com/products' 
      );
      const data = await response.json();
      setProducts(data.products);
    };

    fetchData();
  }, []);

  const handleViewDetails = productId => {
    const selected = products.find(product => product.id === productId);
    setSelectedProduct(selected);
  };
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const filteredProducts = products.filter(product => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * (a.price - b.price);
  });

  return (
    <div className="product-list-container">
      <b>Products List</b>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by name or price"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
        </select>
        <button className='low-button' onClick={toggleSortOrder}>
          Price Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Product Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>
                <img
                  src={product.thumbnail}
                  alt={`Thumbnail for ${product.title}`}
                  className="product-image"
                />
              </td>
              <td>
                <div className='product-view' onClick={() => handleViewDetails(product.id)}>
                  View Product Details
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="selected-product-details">
          <h2>Selected Product Details</h2>
          <p>Title: {selectedProduct.title}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>Price: {selectedProduct.price}</p>
          <p>Brand: {selectedProduct.brand}</p>
          <p>Category: {selectedProduct.category}</p>
          Product image:
          <p> <img src={selectedProduct.thumbnail} alt={`Thumbnail for ${selectedProduct.title}`} /></p>
        </div>
      )}
    </div>
  );
};

export default ProductList;


