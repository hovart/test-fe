"use client"

import React, {useState} from 'react';
import {ADD_PRODUCT, GET_PRODUCTS} from "@/graphql/product";
import {useMutation} from "@apollo/client";
import { IoIosAdd } from "react-icons/io";

const AddProductButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const [addProduct, { data, loading, error }] = useMutation(ADD_PRODUCT, {
        update(cache, { data: { addProduct } }) {
            try {
                const existingProducts: any = cache.readQuery({ query: GET_PRODUCTS });
                console.log('Existing products:', existingProducts);

                if (existingProducts && existingProducts.products) {
                    const newProducts = [...existingProducts.products, addProduct];
                    cache.writeQuery({
                        query: GET_PRODUCTS,
                        data: { products: newProducts },
                    });
                } else {
                    cache.writeQuery({
                        query: GET_PRODUCTS,
                        data: { products: [addProduct] },
                    });
                }
            } catch (e) {
                console.error('Error reading cache:', e);
            }
        },
    });

    const handleAddProduct = async () => {
        try {
            const { data } = await addProduct({
                variables: {
                    name: name,
                    price: parseFloat(String(price)),
                    image: "https://picsum.photos/200/300",
                },
            });

            console.log('Product added:', data.addProduct);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                    onClick={openModal}
                >
                <span>
                    Add New Product
                </span>
                    <span className="text-2xl ml-2 text-bold">
                    <IoIosAdd />
                </span>
                </button>
            </div>
            {
                isOpen && <div className="fixed z-10 inset-0 overflow-y-auto" onClick={closeModal}>
                    <div
                        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                        onClick={e => e.stopPropagation()}
                    >
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-gray-200 px-4 py-3 sm:px-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                                    Add Product
                                </h3>
                            </div>

                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mb-4">
                                    <label htmlFor="product-name" className="block text-gray-700 text-sm font-bold mb-2">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="product-name"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter product name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="product-price" className="block text-gray-700 text-sm font-bold mb-2">
                                        Product Price
                                    </label>
                                    <input
                                        type="text"
                                        id="product-price"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter product price"
                                        value={price}
                                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        handleAddProduct()
                                        closeModal()
                                    }}
                                >
                                    {loading ? 'Adding...' : 'Add Product'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AddProductButton;
