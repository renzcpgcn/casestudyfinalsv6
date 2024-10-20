import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/products'); // Correct endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data); // Check output
                setProducts(data); // Set state with the fetched data
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    

    
        return (
            <Row className="mt-4">
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    products.map(product => (
                        <Col md={4} key={product.id} className="mb-4">
                            <ProductItem product={product} />
                        </Col>
                    ))
                )}
            </Row>
        );
    };
    
    


export default ProductList;
