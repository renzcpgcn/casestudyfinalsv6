import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductAddItem = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        barcode: '',
        description: '',
        price: '',
        available_quantity: '',
        category: '',
        image: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/products', formData);
            // Handle success (e.g., reset form or show a message)
        } catch (error) {
            console.error("Error adding product:", error);
            // Handle error (e.g., show an error message)
        }
    };

    const handleCancel = () => {
        // Reset form or perform other actions
        setFormData({
            product_name: '',
            barcode: '',
            description: '',
            price: '',
            available_quantity: '',
            category: '',
            image: '',
        });
    };

    return (
        <Container style={{ width: '700px', borderRadius: '10px', border: '1px solid #ccc', padding: '20px' }}>
            <h2>Add Product</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProductName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBarcode">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAvailableQuantity">
                    <Form.Label>Available Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="available_quantity"
                        value={formData.available_quantity}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="ml-2">
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default ProductAddItem;
