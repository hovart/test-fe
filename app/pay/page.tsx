import Link from 'next/link';
import {HOME_PAGE} from "@/helpers/urls";

export default function CardPage() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Your payment has been successfully completed
            </h1>
            <Link href={HOME_PAGE} className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                Go to home
            </Link>
        </main>
    );
}
