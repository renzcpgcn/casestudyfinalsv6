import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductItem from '@/Components/products/ProductItem'; // Adjust the import path as necessary

const ProductList = ({ products }) => {
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
