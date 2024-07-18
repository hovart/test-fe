import Link from 'next/link';
import {HOME_PAGE} from "@/helpers/urls";
import Shop from "@/components/Shop";

export default function CardPage() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">Our Basket</h1>
                <Shop/>
            </div>
            <Link href={HOME_PAGE} className="absolute right-5 top-12 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                Go to home
            </Link>
        </main>
    );
}
