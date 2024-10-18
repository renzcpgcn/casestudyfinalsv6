import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <Card style={{ 
            backgroundColor: '#f8f9fa',  // Light grey background
            width: '250px',               // Set a fixed width
            height: '250px',              // Set a fixed height to make it square
            display: 'flex',              // Use flexbox to center content
            flexDirection: 'column',      // Stack children vertically
            justifyContent: 'space-between' // Distribute space between items
        }}>
            <Card.Img variant="top" src={product.image || 'placeholder-image-url'} style={{ objectFit: 'cover', height: '60%' }} />
            <Card.Body style={{ flexGrow: 1 }}> {/* Allow the body to grow to fill space */}
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>
                    <strong>Barcode:</strong> {product.barcode}<br />
                    <strong>Description:</strong> {product.description}<br />
                    <strong>Price:</strong> ${product.price}<br />
                    <strong>Available Quantity:</strong> {product.available_quantity}<br />
                    <strong>Category:</strong> {product.category}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="info" onClick={() => onEdit(product)}>Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(product.id)} className="ml-2">Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
