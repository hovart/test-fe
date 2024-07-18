"use client"

import React, {useState} from 'react';
import {Product} from "@/interfaces/Product";
import { FaCartPlus } from "react-icons/fa";
import QuantityControl from "@/components/QuantityControl";

interface ProductProps {
    product: Product;
    handle: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, handle }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-full md:w-96">
            <div className="relative w-full h-48 md:h-56 lg:h-64">
                <img
                    className="object-cover w-full h-56"
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-gray-900 font-medium text-lg">{product.name}</h3>
                    <p className="text-gray-600 mt-1">${quantity * product.price}</p>
                </div>

                <div className="mt-4">
                    <QuantityControl initialQuantity={quantity} onQuantityChange={handleQuantityChange} />
                </div>

                <button
                    className="flex items-center mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 self-center"
                    onClick={() => handle(product, quantity)}
                >
                    <span className={"mr-2 text-2xl"}>
                        <FaCartPlus />
                    </span>
                    <span>
                        Add
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
