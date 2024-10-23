import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'; // Import Bootstrap components for layout
import ProductItem from './ProductItem'; // Adjust the import path if necessary
import axiosInstance from '../axiosInstance'; // Adjusted relative path

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products'); // Fetching from the defined route
                setProducts(response.data); // Assuming the response data is an array of products
            } catch (error) {
                setError(error.response ? error.response.data : 'Error fetching products');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div  >
            <h1 style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}>Product List</h1>
            {error && <p>Error fetching products: {error}</p>}
            <Row>
                {products.map(product => (
                    <Col key={product.product_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <ProductItem product={product} /> {/* Use ProductItem for each product */}
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList; // Exporting the component at the end
