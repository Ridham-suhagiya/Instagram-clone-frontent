import Link from "../../components/link/link";


const NotFound = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
            <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-center max-w-md mb-6">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/login"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition duration-300"
            >
                Go to Login
            </Link>
        </div>
    );
};

export default NotFound;
