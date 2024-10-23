import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import PrimaryButton from '@/Components/PrimaryButton'; // Import PrimaryButton

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);      

    useEffect(() => {
        fetchProducts(); // Fetch products on component load
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            setProducts(response.data);
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
    
    return (
        <AuthenticatedLayout
            header={
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Product Dashboard
                    </h2>
                    <div className="ml-auto">
                        {/* Use PrimaryButton for the Add Product button */}
                        <PrimaryButton className="ms-4" onClick={handleAddProduct}>
                            Add Product
                        </PrimaryButton>
                    </div>
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
                    <ProductList products={products} />  
                )}
            </div>
        </AuthenticatedLayout>
    );
}
