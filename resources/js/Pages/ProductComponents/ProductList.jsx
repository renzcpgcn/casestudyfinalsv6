import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}>Product List</h1>
            <Row>
                {products.length > 0 ? (
                    products.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <ProductItem product={product} />
                        </Col>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </Row>
        </div>
    );
};

export default ProductList;
