import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <div className="text-center">
        {/* Large 404 Text */}
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <div className="relative -mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Go Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Decorative element */}
      <div className="mt-12">
        <svg
          className="w-64 h-auto text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.366zM7.5 14.335a6 6 0 01-3.32-9.309l9.309 3.322a6 6 0 01-5.989 5.987z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageNotFound;
