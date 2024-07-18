"use client"

import React, {useState} from 'react';
import {Cart} from "@/interfaces/Cart";
import QuantityControl from "@/components/QuantityControl";
import {MdDelete} from "react-icons/md";

interface CartProps {
    cart: Cart;
    handle: (cart: Cart) => void;
}

const CartProductCard: React.FC<CartProps> = ({cart, handle}) => {
    const [quantity, setQuantity] = useState(cart.quantity);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };


    return (
        <tr>
            <td className="py-2 px-4">
                <img
                    className="object-cover w-20 h-20"
                    src={cart.product.image}
                    alt={cart.product.name}
                />
            </td>
            <td className="py-2 px-4">
                <h3 className="text-gray-900 font-medium">{cart.product.name}</h3>
            </td>
            <td className="py-2 px-4">
                <p className="text-gray-600">${cart.product.price}</p>
            </td>
            <td className="py-2 px-4">
                <QuantityControl initialQuantity={quantity} onQuantityChange={handleQuantityChange}/>
            </td>
            <td className="py-2 px-4">
                <p className="text-gray-600">${cart.product.price * quantity}</p>
            </td>
            <td className="py-2 px-4">
                <button
                    className="text-white py-2 px-4 rounded  focus:outline-none "
                    onClick={() => handle(cart)}
                    title="Remove from cart"
                >
                            <span className="text-red-500 text-2xl">
                                <MdDelete/>
                            </span>
                </button>
            </td>
        </tr>
    );
};

export default CartProductCard;

