import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Card, Button, Container, ListGroup, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const CheckedOutPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        municipality: '',
        postalCode: '',
        phone: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('gcash'); // Default payment method
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    useEffect(() => {
        const storedSelectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        setSelectedItems(storedSelectedItems);

        // Calculate the total price based on selected items
        const calculatedTotalPrice = storedSelectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(calculatedTotalPrice);

        // Store total price in localStorage
        localStorage.setItem('totalPrice', JSON.stringify(calculatedTotalPrice));
    }, []);

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({
            ...shippingInfo,
            [name]: value,
        });
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmitOrder = () => {
        const orderData = {
            user_id: 1,
            name: shippingInfo.name,
            address: shippingInfo.address,
            city: shippingInfo.city,
            municipality: shippingInfo.municipality,
            postal_code: shippingInfo.postalCode,
            phone: shippingInfo.phone,
            total_price: totalPrice,
            payment_method: paymentMethod,
        };

        axios.post('/api/orders', orderData)
            .then(response => {
                console.log('Order successfully created:', response.data);

                // Clear localStorage after the order is successful
                localStorage.clear();

                // Set the total price to 0 after clearing the cart
                setTotalPrice(0);
                setSelectedItems([]);

                setOrderConfirmed(true);
                //setTimeout(() => {
               //     Inertia.visit('/cart');
               // }, 3000); // Redirect after 3 seconds
            })
            .catch(error => {
                console.error('There was an error creating the order:', error);
            });

    };


    const handleClearCart = () => {
        localStorage.clear();
        Inertia.visit('/cart');
    };

    return (
        <Container className="my-5" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <h1 className="text-center mb-4">Checkout</h1>

            <Card className="d-flex flex-column">
                <Card.Body>
                    <div className="mt-4">
                        <h5>Shipping Information</h5>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={shippingInfo.name}
                                    onChange={handleShippingChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formAddress" className="mt-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={shippingInfo.address}
                                    onChange={handleShippingChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formCity" className="mt-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={shippingInfo.city}
                                    onChange={handleShippingChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formMunicipality" className="mt-3">
                                <Form.Label>Municipality</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="municipality"
                                    value={shippingInfo.municipality}
                                    onChange={handleShippingChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPostalCode" className="mt-3">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="postalCode"
                                    value={shippingInfo.postalCode}
                                    onChange={handleShippingChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhone" className="mt-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={shippingInfo.phone}
                                    onChange={handleShippingChange}
                                    required
                                />
                            </Form.Group>

                            {/* Payment Method Selection */}
                            <Form.Group className="mt-3">
                                <Form.Label>Payment Method</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        label="GCASH"
                                        name="paymentMethod"
                                        value="gcash"
                                        checked={paymentMethod === 'gcash'}
                                        onChange={handlePaymentChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Cash on Delivery"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </Card.Body>

                <Card.Footer className="mt-auto">
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant="flush">
                        {selectedItems.length > 0 ? (
                            selectedItems.map((item) => (
                                <ListGroup.Item key={item.product_id}>
                                    {item.product_name} - {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No items selected</ListGroup.Item>
                        )}
                    </ListGroup>

                    <div className="mt-3 text-end">
                        <strong style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            Total: ${totalPrice.toFixed(2)}
                        </strong>
                    </div>

                    <div className="text-center mt-4">
                        <Button
                            variant="primary"
                            onClick={handleSubmitOrder}
                            disabled={!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.municipality || !shippingInfo.postalCode || !shippingInfo.phone}
                        >
                            Confirm Order
                        </Button>
                    </div>

                    <div className="text-center mt-3">
                        <Button variant="danger" onClick={handleClearCart}>
                            Go back to Cart
                        </Button>
                    </div>

                    {/* Display order confirmation message */}
                    {orderConfirmed && (
                        <Alert variant="success" className="mt-4">
                            Thank you for your purchase! Redirecting to Cart...
                        </Alert>
                    )}
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default CheckedOutPage;
