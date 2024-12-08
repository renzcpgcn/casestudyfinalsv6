import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import SecondaryButton from '@/Components/SecondaryButton';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch cart items and set each item as selected by default
    useEffect(() => {
        axios
            .get('/api/cart')
            .then((response) => {
                const itemsWithSelected = response.data.map((item) => ({
                    ...item,
                    selected: item.selected === 1, // Ensure that the `selected` field is properly interpreted as a boolean
                }));
                setCartItems(itemsWithSelected);
                setSelectedItems(itemsWithSelected); // Initialize selectedItems with all items

                // Store the cart items in localStorage
                localStorage.setItem('selectedItems', JSON.stringify(itemsWithSelected));
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

    const handleSelectItem = (item, isChecked) => {
        axios
            .patch(`/api/cart/${item.id}/selection`, { selected: isChecked })
            .then(() => {
                const updatedSelectedItems = isChecked
                    ? [...selectedItems, item]
                    : selectedItems.filter((selectedItem) => selectedItem.id !== item.id);

                setCartItems((prevItems) =>
                    prevItems.map((cartItem) =>
                        cartItem.id === item.id ? { ...cartItem, selected: isChecked } : cartItem
                    )
                );

                setSelectedItems(updatedSelectedItems);
                localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
            })
            .catch(() => setError('Failed to update selection.'));
    };

    const handleRemoveFromCart = (id) => {
        axios.delete(`/api/cart/${id}`)
        .then(response => {
            console.log('Item deleted', response.data);
            setCartItems(cartItems.filter(item => item.id !== id)); // Remove the item from the state
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
    };

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            if (item.selected) { // Only calculate total for selected items
                return acc + item.price * item.quantity;
            }
            return acc;
        }, 0);
        setTotalPrice(total.toFixed(2)); // Round the total price to two decimal places
    }, [selectedItems, cartItems]);

    const proceedToCheckout = () => {
        Inertia.visit('/checkout', {
            method: 'get',
            preserveScroll: true,
        });
    };

    const goToStore = () => {
        Inertia.visit('/store', {
            method: 'get',
            preserveScroll: true,
        });
    };

    const goToDashboard = () => {
        Inertia.visit('/dashboard', {
            method: 'get',
            preserveScroll: true,
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container className="my-5" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <h1 className="text-center mb-4">Shopping Cart</h1>
            {error && <div className="alert alert-danger">{error}</div>}

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
                                            checked={item.selected} // Each item is selected by default
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
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
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

                {/* Place the Secondary Button and Checkout Button side by side */}
                <div className="d-flex">
                    <SecondaryButton className="ms-4" onClick={goToDashboard}>
                        Go to Dashboard
                    </SecondaryButton>
                    {selectedItems.length > 0 && (
                        <Button variant="success" onClick={proceedToCheckout} className="ms-4">
                            Proceed to Checkout
                        </Button>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default CartPage;
