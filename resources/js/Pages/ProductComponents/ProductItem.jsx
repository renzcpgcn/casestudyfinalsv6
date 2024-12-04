import React from 'react';
import { Card } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';
import axiosInstance from '../../axiosInstance'; // Adjusted relative path
import PrimaryButton from '@/Components/PrimaryButton'; // Ensure the correct import path

const ProductItem = ({ product }) => {
    console.log(product); // Debug to see if product_id exists

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                // Updated to use the correct API route
                await axiosInstance.delete(`/api/products/${productId}`);
                Inertia.visit('/dashboard');
            } catch (error) {
                console.error('Error deleting product:', error.response ? error.response.data : error);
            }
        }
    };

    const handleEdit = () => {
        const productId = product.product_id; // Ensure correct field is used
        if (productId) {
            Inertia.visit(`/edit-product/${productId}`);
        } else {
            console.error('Product ID is undefined');
        }
    };

    return (
        <Card style={{
            backgroundColor: '#f8f9fa',
            width: '350px',
            height: '230px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Card.Img variant="top" style={{ objectFit: 'cover', height: '60%' }} />
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
                    {/* Use PrimaryButton for Edit with the same design as Add */}
                    <PrimaryButton className="me-2" onClick={handleEdit}>
                        Edit
                    </PrimaryButton>
                    {/* Use a styled button for Delete with grey color */}
                    <PrimaryButton
                        className="ml-2"
                        style={{ backgroundColor: 'red', borderColor: 'grey' }}
                        onClick={() => handleDelete(product.product_id)}
                    >
                        Delete
                    </PrimaryButton>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
