import { useEffect } from "react";
import { usePage, router } from "@inertiajs/react";

export default function ErrorPage({ status, message }) {
    useEffect(() => {
        // Automatically redirect back after showing error
        const timer = setTimeout(() => {
            router.visit("/", { preserveState: true });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Error {status}</h1>
                <p className="text-gray-600">{message}</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
