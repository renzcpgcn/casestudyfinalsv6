import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import axiosInstance from '../axiosInstance'; // Adjusted relative path

export default function ProductAddItem() {
    const { data, setData, processing, errors, reset } = useForm({
        product_name: '',
        description: '',
        price: '',
        available_quantity: '',
        category: '',
        barcode: '', // Assuming you have a barcode input
    });

    const submit = async (e) => {
        e.preventDefault();

        if (processing) return; // Prevent multiple submissions

        try {
            // Log the data being submitted for debugging
            console.log('Submitting product:', data);

            const response = await axiosInstance.post('/products', data);
            console.log('Product added:', response.data);

            // Reset form fields after successful submission
            reset(); // This will reset all fields at once
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
            // Handle error accordingly
        }
    };

    return (
        <GuestLayout>
            <Head title="Add Product" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="product_name" value="Product Name" />
                    <TextInput
                        id="product_name"
                        name="product_name"
                        value={data.product_name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('product_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.product_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="price" value="Price" />
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        value={data.price}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('price', e.target.value)}
                        required
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="available_quantity" value="Available Quantity" />
                    <TextInput
                        id="available_quantity"
                        type="number"
                        name="available_quantity"
                        value={data.available_quantity}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('available_quantity', e.target.value)}
                        required
                    />
                    <InputError message={errors.available_quantity} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="category" value="Category" />
                    <TextInput
                        id="category"
                        name="category"
                        value={data.category}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('category', e.target.value)}
                        required
                    />
                    <InputError message={errors.category} className="mt-2" />
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
