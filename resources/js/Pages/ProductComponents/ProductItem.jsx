import React from 'react';
import { Card } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';
import axiosInstance from '../../axiosInstance'; // Adjusted relative path
import PrimaryButton from '@/Components/PrimaryButton'; // Ensure the correct import path

const ProductItem = ({ product }) => {
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
        <Card
            style={{
                backgroundColor: '#f8f9fa',
                width: '350px',
                height: '250px', // Set consistent height for all cards
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Card.Body
                style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <Card.Title className="mb-2 text-truncate">{product.product_name}</Card.Title>
                <Card.Text
                    style={{
                        fontSize: '14px',
                        marginBottom: '15px',
                        flexGrow: 1, // Allow the text section to grow and shrink as needed
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <strong>Barcode:</strong> {product.barcode}
                    <br />
                    <strong>Description:</strong> {product.description}
                    <br />
                    <strong>Price:</strong> ${product.price}
                    <br />
                    <strong>Available Quantity:</strong> {product.available_quantity}
                    <br />
                    <strong>Category:</strong> {product.category}
                </Card.Text>
                <div className="d-flex justify-content-between mt-auto">
                    <PrimaryButton className="me-2" onClick={handleEdit}>
                        Edit
                    </PrimaryButton>
                    <PrimaryButton
                        className="ml-2"
                        style={{ backgroundColor: 'red', borderColor: 'red' }}
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
