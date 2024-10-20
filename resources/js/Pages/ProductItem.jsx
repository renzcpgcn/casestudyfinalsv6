import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia'; 
import axios from 'axios'; // Import axios

const ProductItem = ({ product }) => {
    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                // Send a DELETE request to the backend
                await axios.delete(`/products/${productId}`);
                
                // Refresh the product list page using Inertia
                Inertia.visit('/dashboard');  
            } catch (error) {
                console.error('Error deleting product:', error.response ? error.response.data : error);
            }
        }
    };

    const handleEdit = () => {
        // Navigate to the edit route with the product ID
        Inertia.visit(`/edit-product/${product.id}`); // Make sure this route is defined in web.php
    };

    return (
        
        <Card style={{ 
            backgroundColor: '#f8f9fa',  
            width: '250px',             
            height: '250px',            
            display: 'flex',            
            flexDirection: 'column',   
            justifyContent: 'space-between' 
        }}>
            <Card.Img variant="top" src={product.image || 'placeholder-image-url'} style={{ objectFit: 'cover', height: '60%' }} />
            <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>
                    <strong>Barcode:</strong> {product.barcode}<br />
                    <strong>Description:</strong> {product.description}<br />
                    <strong>Price:</strong> ${product.price}<br />
                    <strong>Available Quantity:</strong> {product.available_quantity}<br />
                    <strong>Category:</strong> {product.category}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="info" onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(product.id)} className="ml-2">Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
