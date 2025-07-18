import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-6">
        The page you're looking for doesn't exist !
      </p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
