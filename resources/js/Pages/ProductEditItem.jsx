import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inertia } from '@inertiajs/inertia';

const ProductEditItem = ({ product }) => {
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

    // Load existing product data if it is provided
    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name || '',
                barcode: product.barcode || '',
                description: product.description || '',
                price: product.price || '',
                available_quantity: product.available_quantity || '',
                category: product.category || '',
                image: null, // Image handled by file input
            });
            // Adjust this if product.image only contains the filename
            setPreviewImage(product.image ? `/uploads/${product.image}` : null);
        }
    }, [product]);
    

    // Handle input changes
    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle form submission
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
        // Redirect to the dashboard
        Inertia.visit('/dashboard');
    };

    return (
        <Container style={{ width: '600px', padding: '30px', marginTop: '50px' }}>
            <h2 className="text-center mb-4">Edit Product</h2>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Form fields */}
                <Form.Group as={Row} controlId="formProductName">
                    <Form.Label column sm={4}>Product Name</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                            required
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
                        />
                    </Col>
                </Form.Group>

                {/* Image preview */}
                {previewImage && (
                    <Row className="mb-4">
                        <Col sm={12} className="text-center">
                            <Image src={previewImage} fluid alt="Selected Image" style={{ maxHeight: '200px' }} />
                        </Col>
                    </Row>
                )}

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">Update</Button>
                    <Button variant="secondary" onClick={handleCancel} size="lg">Cancel</Button>
                </div>
            </Form>
        </Container>
    );
};

export default ProductEditItem;
