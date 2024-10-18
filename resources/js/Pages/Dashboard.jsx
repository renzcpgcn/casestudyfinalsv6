import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductList from '@/Components/products/ProductList';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);      

    useEffect(() => {
        // Uncomment this line when ready to fetch data from API
        // fetchProducts();
        
        // Example product data
        const exampleProducts = [
            {
                id: 1,
                name: 'Product 1',
                description: 'This is the description for Product 1',
                price: 29.99,
                quantity: 100,
                category: 'Category A',
                image: 'https://via.placeholder.com/150', // Sample image URL
            },
            {
                id: 2,
                name: 'Product 2',
                description: 'This is the description for Product 2',
                price: 49.99,
                quantity: 50,
                category: 'Category B',
                image: 'https://via.placeholder.com/150', // Sample image URL
            },
        ];

        // Set example products
        setProducts(exampleProducts);
        setLoading(false);
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setLoading(false);  
        } catch (error) {
            console.error("Error fetching products:", error);
            setError('Failed to fetch products');  
            setLoading(false);
        }
    };

    const handleAddProduct = () => {
        Inertia.visit('/add-product');  // Use Inertia's visit method
    };
    
    return (
        <AuthenticatedLayout
            header={
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Product Dashboards
                    </h2>
                    <div className="ml-auto"> {/* Add this div for margin on the left */}
                        <Button variant="primary" onClick={handleAddProduct}>Add Product</Button> {/* Add button */}
                    </div>
                </div>
            }
        >
            <Head title="Product Dashboards" />
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
