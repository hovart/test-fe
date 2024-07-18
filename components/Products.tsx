"use client"

import React, {FC} from 'react';
import ProductCard from "@/components/ProductCard";
import {Product} from "@/interfaces/Product";
import { useQuery, useMutation } from '@apollo/client';
import {ADD_TO_CART, GET_CART_ITEMS, GET_PRODUCTS} from "@/graphql/product";
import {toast} from "react-toastify";
import Skeleton from "@/components/Skeleton";

const Products: FC = () => {

    const { data: productsData, loading: cartLoading, error: cartError } = useQuery(GET_PRODUCTS);
    const [addToCartMutation] = useMutation(ADD_TO_CART, {
        update(cache, { data: { addToCart } }) {
            try {
                const existingCart: any = cache.readQuery({ query: GET_CART_ITEMS });

                if (existingCart && existingCart.cart) {
                    const cartItemIndex = existingCart.cart.findIndex((item: any) => item.productId === addToCart.productId);

                    if (cartItemIndex > -1) {
                        const updatedCart = existingCart.cart.map((item: any) =>
                            item.productId === addToCart.productId
                                ? { ...item, quantity: addToCart.quantity }
                                : item
                        );

                        cache.writeQuery({
                            query: GET_CART_ITEMS,
                            data: { cart: updatedCart },
                        });
                    } else {
                        const newCart = [...existingCart.cart, addToCart];

                        cache.writeQuery({
                            query: GET_CART_ITEMS,
                            data: { cart: newCart },
                        });
                    }
                } else {
                    cache.writeQuery({
                        query: GET_CART_ITEMS,
                        data: { cart: [addToCart] },
                    });
                }
            } catch (e) {
                console.error('Error reading cache:', e);
            }
        },
    });
    const handleAddToCart = (product: Product, quantity: number) => {
        console.log('Added to cart:', product);

        addToCartMutation({
            variables: { productId: product.id, quantity }
        }).then(() => {
            // alert('Product added to cart!');
            toast("Product added to cart!");
        }).catch(error => {
            alert(`Error adding product to cart: ${error.message}`);
        });
    };

    return productsData ? (
        <div className="flex gap-20 justify-center flex-wrap">
            {productsData.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} handle={handleAddToCart} />
            ))}
        </div>
    ) : <div className="gap-12">
        {
            new Array(1).fill(undefined).map((_, index) => {
                return <Skeleton key={index}/>
            })
        }
    </div>;
};

export default Products;
