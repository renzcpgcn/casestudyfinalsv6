import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductComponents/ProductList';
import PrimaryButton from '@/Components/PrimaryButton';
import { Form } from 'react-bootstrap';

const Dashboard = () => {
    const [products, setProducts] = useState([]); // All products
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(''); // Search query

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            setProducts(response.data);
            setFilteredProducts(response.data); // Display all products initially
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleAddProduct = () => {
        Inertia.visit('/add-product');
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
                            Product Dashboard
                        </h2>
                        <div className="ml-auto">
                            <PrimaryButton className="ms-4" onClick={handleAddProduct}>
                                Add Product
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
            <Head title="Product Dashboard" />
            <div>
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ProductList products={filteredProducts} />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
