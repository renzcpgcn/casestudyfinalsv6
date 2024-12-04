// resources/js/Pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch cart items from the API
        axios
            .get('/api/cart')
            .then((response) => {
                setCartItems(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch cart items.');
                setLoading(false);
            });
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        // Update the quantity of the product in the cart
        axios
            .put(`/api/cart/${productId}`, { quantity: newQuantity })
            .then(() => {
                // Re-fetch the cart items after update
                axios
                    .get('/api/cart')
                    .then((response) => {
                        setCartItems(response.data);
                    })
                    .catch(() => {
                        setError('Failed to fetch cart items.');
                    });
            })
            .catch(() => {
                setError('Failed to update quantity.');
            });
    };

    const handleRemoveFromCart = (productId) => {
        // Remove product from the cart
        axios
            .delete(`/api/cart/${productId}`)
            .then(() => {
                setCartItems(cartItems.filter((item) => item.product_id !== productId));
            })
            .catch(() => {
                setError('Failed to remove product from cart.');
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Shopping Cart</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Row>
                {cartItems.length === 0 ? (
                    <div>Your cart is empty!</div>
                ) : (
                    cartItems.map((item) => (
                        <Col key={item.product_id} md={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.product_name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{item.product_description}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Price:</strong> ${item.price}
                                    </Card.Text>

                                    <div>
                                        <strong>Quantity:</strong>
                                        <Form.Control
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                handleQuantityChange(item.product_id, parseInt(e.target.value))
                                            }
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <Button variant="danger" onClick={() => handleRemoveFromCart(item.product_id)}>
                                            Remove
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

export default CartPage;
