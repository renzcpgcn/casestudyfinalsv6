import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axiosInstance from '../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import UserProductList from './UserComponents/UserProductList';
import PrimaryButton from '@/Components/PrimaryButton';

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        fetchProducts();
        fetchCartItemCount();

        // Set an interval to fetch the cart count every 3 seconds
        const interval = setInterval(() => {
            fetchCartItemCount();
        }, 3000);

        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/api/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const fetchCartItemCount = async () => {
        try {
            const response = await axiosInstance.get('/api/cart/item-count');
            setCartItemCount(response.data.count);
        } catch (error) {
            console.error("Error fetching cart item count:", error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await axiosInstance.post('/api/cart/add', { product_id: productId });
            await fetchCartItemCount(); // Optional: Immediately update after adding to cart
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const handleSearchInput = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

        const lowercasedQuery = inputValue.toLowerCase();
        const filtered = products.filter(product =>
            product.product_name.toLowerCase().includes(lowercasedQuery) ||
            product.description.toLowerCase().includes(lowercasedQuery) ||
            product.barcode.includes(inputValue) ||
            product.price.includes(inputValue) ||
            product.category.includes(inputValue)
        );
        setFilteredProducts(filtered);
    };

    const handleViewCart = () => {
        Inertia.visit('/cart');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="d-flex flex-column align-items-start">
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            User Dashboard
                        </h2>
                        <div className="ml-auto">
                            <PrimaryButton className="ms-4" onClick={handleViewCart}>
                                View Cart ({cartItemCount})
                            </PrimaryButton>
                        </div>
                    </div>
                    <Form className="mt-3 w-100">
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Search Products..."
                                value={query}
                                onChange={handleSearchInput}
                                className="me-2"
                            />
                        </div>
                    </Form>
                </div>
            }
        >
            <Head title="User Dashboard" />
            <div>
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <UserProductList
                        products={filteredProducts}
                        onAddToCart={handleAddToCart} // Pass the handler here
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default UserDashboard;
