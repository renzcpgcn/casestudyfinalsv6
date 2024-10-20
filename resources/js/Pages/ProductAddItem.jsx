import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia for navigation

const ProductAddItem = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        barcode: '',
        description: '',
        price: '',
        available_quantity: '',
        category: '',
        image: null, // Set the initial state for the image to null for a file
    });
    const [previewImage, setPreviewImage] = useState(null); // State for image preview

    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file }); // Handle file input
            setPreviewImage(URL.createObjectURL(file)); // Set preview image
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData(); // FormData is required for file uploads

        // Append the other form data
        productData.append('product_name', formData.product_name);
        productData.append('barcode', formData.barcode);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('available_quantity', formData.available_quantity);
        productData.append('category', formData.category);
        productData.append('image', formData.image); // Append the image file

        try {
            await axios.post('/products', productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Product added successfully");
            Inertia.visit('/dashboard'); // Use Inertia to navigate to dashboard
        } catch (error) {
            console.error("Error adding product:", error.response ? error.response.data : error);
        }
    };

    const handleCancel = () => {
        setFormData({
            product_name: '',
            barcode: '',
            description: '',
            price: '',
            available_quantity: '',
            category: '',
            image: null,
        });
        setPreviewImage(null); // Clear the image preview

        // Redirect to the dashboard using Inertia when the user cancels
        Inertia.visit('/dashboard');
    };

    return (
        <Container style={{ width: '600px', borderRadius: '10px', border: '1px solid #ccc', padding: '30px', marginTop: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="text-center mb-4">Add Product</h2>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group as={Row} controlId="formProductName">
                    <Form.Label column sm={4}>Product Name</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter product name"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBarcode">
                    <Form.Label column sm={4}>Barcode</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter barcode"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDescription">
                    <Form.Label column sm={4}>Description</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            placeholder="Enter product description"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPrice">
                    <Form.Label column sm={4}>Price</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter price"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAvailableQuantity">
                    <Form.Label column sm={4}>Available Quantity</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="number"
                            name="available_quantity"
                            value={formData.available_quantity}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter available quantity"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCategory">
                    <Form.Label column sm={4}>Category</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter category"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formImage">
                    <Form.Label column sm={4}>Image</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                            required
                        />
                    </Col>
                </Form.Group>

                {/* Image Preview Section */}
                {previewImage && (
                    <Row className="mb-4">
                        <Col sm={12} className="text-center">
                            <Image src={previewImage} fluid alt="Selected Image" style={{ maxHeight: '200px', marginTop: '10px' }} />
                        </Col>
                    </Row>
                )}

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleCancel} size="lg">
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default ProductAddItem;
