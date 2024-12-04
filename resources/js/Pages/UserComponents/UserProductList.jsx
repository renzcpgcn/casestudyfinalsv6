import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import UserProductItem from "./UserProductItem";
import axiosInstance from '../../axiosInstance'; // Adjusted relative path
const UserProductList = ({ products }) => {
    const [cartMessage, setCartMessage] = useState("");

    const addToCart = async (product) => {
        try {
            const response = await axiosInstance.post("/cart", {
                product_id: product.product_id,
                quantity: 1, // Default quantity
            });

            setCartMessage(`${product.product_name} added to cart!`);
            setTimeout(() => setCartMessage(""), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
            setCartMessage("Failed to add to cart. Try again!");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Product List</h1>
            {cartMessage && <div className="text-green-500 text-center mt-2">{cartMessage}</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {products.map((product) => (
                    <UserProductItem key={product.product_id} product={product} onAddToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default UserProductList;
