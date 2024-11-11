import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance'; // Adjusted relative path

export default function ProductAddItem() {
    const { data, setData, processing, reset } = useForm({
        product_name: '',
        description: '',
        price: '',
        available_quantity: '',
        category: '',
        barcode: '', // Assuming you have a barcode input
    });

    const [inputErrors, setInputErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [serverError, setServerError] = useState(null);

    const submit = async (e) => {
        e.preventDefault();

        if (processing) return; // Prevent multiple submissions

        // Validate inputs manually
        const newInputErrors = {};
        if (!data.product_name) newInputErrors.product_name = 'Product name is required';
        if (!data.description) newInputErrors.description = 'Description is required';
        if (!data.price) newInputErrors.price = 'Price is required';
        if (!data.available_quantity) newInputErrors.available_quantity = 'Available quantity is required';
        if (!data.category) newInputErrors.category = 'Category is required';

        if (Object.keys(newInputErrors).length > 0) {
            setInputErrors(newInputErrors);
            return;
        }

        try {
            // Clear any previous error messages
            setServerError(null);

            const response = await axiosInstance.post('/products', data);
            console.log('Product added:', response.data);

            // Display success message
            setSuccessMessage('Product Successfully Added');

            // Clear form fields and errors
            reset();
            setInputErrors({});

            // Remove success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
            // Handle server-side validation errors
            setServerError(error.response?.data.errors || 'Something went wrong.');
        }
    };

    return (
        <GuestLayout>
            <Head title="Add Product" />

            {/* Add Product Title */}
            <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                Add Product
            </h1>

            <form onSubmit={submit}>
                {successMessage && (
                    <div
                        style={{
                            color: 'green',
                            backgroundColor: '#d1fae5',
                            padding: '10px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            marginBottom: '15px',
                        }}
                    >
                        {successMessage}
                    </div>
                )}

                {serverError && (
                    <div
                        style={{
                            color: 'red',
                            backgroundColor: '#fde2e2',
                            padding: '10px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            marginBottom: '15px',
                        }}
                    >
                        {serverError}
                    </div>
                )}

                <div>
                    <InputLabel htmlFor="product_name" value="Product Name" />
                    <TextInput
                        id="product_name"
                        name="product_name"
                        value={data.product_name}
                        className={`mt-1 block w-full ${inputErrors.product_name ? 'border-red-500' : ''}`}
                        onChange={(e) => setData('product_name', e.target.value)}
                    />
                    <InputError message={inputErrors.product_name} className="mt-2 text-red-500" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className={`mt-1 block w-full ${inputErrors.description ? 'border-red-500' : ''}`}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={inputErrors.description} className="mt-2 text-red-500" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="price" value="Price" />
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        value={data.price}
                        className={`mt-1 block w-full ${inputErrors.price ? 'border-red-500' : ''}`}
                        onChange={(e) => setData('price', e.target.value)}
                    />
                    <InputError message={inputErrors.price} className="mt-2 text-red-500" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="available_quantity" value="Available Quantity" />
                    <TextInput
                        id="available_quantity"
                        type="number"
                        name="available_quantity"
                        value={data.available_quantity}
                        className={`mt-1 block w-full ${inputErrors.available_quantity ? 'border-red-500' : ''}`}
                        onChange={(e) => setData('available_quantity', e.target.value)}
                    />
                    <InputError message={inputErrors.available_quantity} className="mt-2 text-red-500" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="category" value="Category" />
                    <TextInput
                        id="category"
                        name="category"
                        value={data.category}
                        className={`mt-1 block w-full ${inputErrors.category ? 'border-red-500' : ''}`}
                        onChange={(e) => setData('category', e.target.value)}
                    />
                    <InputError message={inputErrors.category} className="mt-2 text-red-500" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('dashboard')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go back to Dashboard
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Add Product
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
