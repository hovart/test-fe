"use client"

import React, {FC} from 'react';
import CartProductCard from "@/components/CartProductCard";
import {Cart} from "@/interfaces/Cart";
import {useRemoveFromCart} from "@/hooks/useRemoveFromCart";
import {GET_CART_ITEMS} from "@/graphql/product";
import {useQuery} from "@apollo/client";
import {PAY_PAGE} from "@/helpers/urls";
import Link from "next/link";

const Shop: FC = () => {
    const { data: cartData } = useQuery(GET_CART_ITEMS);

    const { handleRemoveFromCart, loading, error } = useRemoveFromCart();

    const onRemoveClick = (cart: Cart) => {
        handleRemoveFromCart(cart.id);
    };


    console.log(cartData, 'shop')
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return cartData && (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold text-left">Image</th>
                            <th className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold text-left">Product</th>
                            <th className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold text-left">Price</th>
                            <th className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold text-left">Quantity</th>
                            <th className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold text-left">Total</th>
                            <th className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.cart.map((cart: Cart) => (
                            <CartProductCard key={cart.id} cart={cart} handle={onRemoveClick}/>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-16">
                <div className="flex gap-4">
                    <img src="/images/pay1.jpg" alt="" className="w-1/6 h-24 cursor-pointer"/>
                    <img src="/images/pay2.jpg" alt="" className="w-1/6 h-24 cursor-pointer"/>
                    <img src="/images/pay3.jpg" alt="" className="w-1/6 h-24 cursor-pointer"/>
                </div>
            </div>


            <Link href={PAY_PAGE} className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                Pay now
            </Link>
        </div>
    );
};

export default Shop;
