import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia here
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axiosInstance from '../axiosInstance'; // Adjusted relative path
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductComponents/ProductList';
import { Form } from 'react-bootstrap';
import UserProductList from './UserComponents/UserProductList';
import PrimaryButton from '@/Components/PrimaryButton';

const UserDashboard = () => {
    const [products, setProducts] = useState([]); // All products
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(''); // Search query
    const [cartItemCount, setCartItemCount] = useState(0); // State for cart item count

    useEffect(() => {
        fetchProducts();
        fetchCartItemCount(); // Fetch cart item count on component mount
    }, []);

    const fetchProducts = async () => {
        try {
            // Fetch products for the user
            const response = await axiosInstance.get('/api/products');
            setProducts(response.data);
            setFilteredProducts(response.data); // Display all products initially
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const fetchCartItemCount = async () => {
        try {
            // Fetch the count of items in the user's cart
            const response = await axiosInstance.get('/api/cart/item-count');
            setCartItemCount(response.data.count); // Set cart item count state
        } catch (error) {
            console.error("Error fetching cart item count:", error);
        }
    };

    const handleViewCart = async () => {
        Inertia.visit('/cart'); // Navigate to the Cart Page
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
                                View Cart ({cartItemCount}) {/* Display cart item count here */}
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
                    <UserProductList products={filteredProducts} />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default UserDashboard;
