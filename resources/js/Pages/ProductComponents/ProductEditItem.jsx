import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

export default function ProductEditItem({ className = '' }) {
    const { product } = usePage().props;
    const { flash } = usePage().props;

    const { data, setData, put, errors, processing } = useForm({
        product_name: product.product_name,
        barcode: product.barcode,
        description: product.description,
        price: product.price,
        available_quantity: product.available_quantity,
        category: product.category,
    });

    const [inputErrors, setInputErrors] = useState({});

    const validateInputs = () => {
        const newInputErrors = {};
        if (!data.product_name) newInputErrors.product_name = 'Product name is required.';
        if (!data.description) newInputErrors.description = 'Description is required.';
        if (!data.price) newInputErrors.price = 'Price is required.';
        if (!data.available_quantity) newInputErrors.available_quantity = 'Available quantity is required.';
        if (!data.category) newInputErrors.category = 'Category is required.';

        return newInputErrors;
    };

    const submit = (e) => {
        e.preventDefault();

        // Validate inputs
        const newInputErrors = validateInputs();
        if (Object.keys(newInputErrors).length > 0) {
            setInputErrors(newInputErrors);
            return;
        }
        
        // Clear any previous errors
        setInputErrors({});

        // Initialize FormData and append all fields
        const productData = new FormData();
        productData.append('product_name', data.product_name);
        productData.append('barcode', data.barcode); // Include barcode for submission
        productData.append('description', data.description);
        productData.append('price', data.price);
        productData.append('available_quantity', data.available_quantity);
        productData.append('category', data.category);

        // Submit the form data using PUT
        put(route('products.update', product.product_id), {
            data: productData,
            onSuccess: () => {
                console.log('Product updated successfully!');
                Inertia.visit('/dashboard'); // Navigate to dashboard after success
            },
            onError: (errors) => console.log(errors), // Log any errors
        });
    };

    return (
        <GuestLayout>
            <Head title="Edit Product" />

            <div className="container mt-4">
                <h2 className="text-center">Edit Product</h2>

                <form onSubmit={submit} className={className}>
                    {flash?.success && <div className="alert alert-success">{flash.success}</div>}

                    <div className="mt-4">
                        <InputLabel htmlFor="product_name" value="Product Name" />
                        <TextInput
                            id="product_name"
                            name="product_name"
                            value={data.product_name}
                            className={`mt-1 block w-full ${inputErrors.product_name ? 'border-red-500' : ''}`}
                            onChange={(e) => setData('product_name', e.target.value)}
                            
                        />
                        <InputError message={inputErrors.product_name || errors.product_name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="barcode" value="Barcode" />
                        <TextInput
                            id="barcode"
                            name="barcode"
                            value={data.barcode}
                            className="mt-1 block w-full"
                            readOnly // Make the input read-only
                            plaintext // Makes it look like a label
                        />
                        <InputError message={errors.barcode} className="mt-2" />
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
                        <InputError message={inputErrors.description || errors.description} className="mt-2" />
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
                        <InputError message={inputErrors.price || errors.price} className="mt-2" />
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
                        <InputError message={inputErrors.available_quantity || errors.available_quantity} className="mt-2" />
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
                        <InputError message={inputErrors.category || errors.category} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route('dashboard')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Go back to Dashboard
                        </Link>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Save Changes
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
