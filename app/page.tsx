import Products from "@/components/Products";
import Link from 'next/link';
import {CART_PAGE} from "@/helpers/urls";
import AddProductButton from "@/components/AddProductButton";
import { FaShoppingCart } from "react-icons/fa";

export default async function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
            <div className="products-page">
                <div className="text-center pt-2 pb-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Products</h1>
                </div>
                <div className="text-center pb-8">
                    <AddProductButton/>
                </div>
                <Products />
            </div>
            <Link href={CART_PAGE} className="absolute right-5 top-12 inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                <span>Go to cart</span>
                <span className="ml-5 text-2xl">
                    <FaShoppingCart />
                </span>
            </Link>
        </main>
    );
}
