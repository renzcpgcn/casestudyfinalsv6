import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios
            .get('/api/cart')
            .then((response) => {
                setCartItems(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch cart items.');
                setLoading(false);
            });
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        axios
            .put(`/api/cart/${productId}`, { quantity: newQuantity })
            .then(() => {
                axios
                    .get('/api/cart')
                    .then((response) => {
                        setCartItems(response.data);
                    })
                    .catch(() => setError('Failed to fetch cart items.'));
            })
            .catch(() => setError('Failed to update quantity.'));
    };

    const handleRemoveFromCart = (productId) => {
        axios
            .delete(`/api/cart/${productId}`)
            .then(() => {
                setCartItems(cartItems.filter((item) => item.product_id !== productId));
            })
            .catch(() => setError('Failed to remove product from cart.'));
    };

    // Handle selecting an item
    const handleSelectItem = (item, isChecked) => {
        if (isChecked) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.product_id !== item.product_id));
        }
    };

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            if (selectedItems.some((selectedItem) => selectedItem.product_id === item.product_id)) {
                return acc + item.price * item.quantity;
            }
            return acc;
        }, 0);
        setTotalPrice(total);

        // Print the selected items in the console
        console.log('Selected Items:', selectedItems);
    }, [selectedItems, cartItems]);

    const proceedToCheckout = () => {
        // Store selectedItems and totalPrice in localStorage
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

        // Proceed to Checkout page
        Inertia.visit('/checkout', {
            method: 'get',
            preserveScroll: true,
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container className="my-5" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <h1 className="text-center mb-4">Shopping Cart</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-4">
                <Form.Check
                    type="checkbox"
                    label="Select All for Checkout"
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedItems(cartItems);
                        } else {
                            setSelectedItems([]);
                        }
                    }}
                />
            </div>

            <Row className="justify-content-center">
                {cartItems.length === 0 ? (
                    <div>Your cart is empty!</div>
                ) : (
                    cartItems.map((item) => (
                        <Col key={item.product_id} md={12} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <Card.Title>{item.product_name}</Card.Title>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectedItems.some((selectedItem) => selectedItem.product_id === item.product_id)}
                                            onChange={(e) => handleSelectItem(item, e.target.checked)}
                                        />
                                    </div>
                                    <Card.Subtitle className="mb-2 text-muted">{item.product_description}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Price:</strong> ${item.price}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() =>
                                                handleQuantityChange(item.product_id, Math.max(1, item.quantity - 1))
                                            }
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() =>
                                                handleQuantityChange(item.product_id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.product_id)}>
                                        Remove
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            <div className="fixed-bottom bg-light d-flex justify-content-between align-items-center p-3">
                <h4>Total Price: ${totalPrice}</h4>
                {selectedItems.length > 0 && (
                    <Button variant="success" onClick={proceedToCheckout}>
                        Proceed to Checkout
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default CartPage;
