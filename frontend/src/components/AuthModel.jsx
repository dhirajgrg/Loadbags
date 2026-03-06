



const AuthModal = ({ isOpen, onClose, onGoogleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900">Account created with Google</h3>
        <p className="mt-2 text-sm text-gray-600">
          This account was created with Google. Please login with Google to continue.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onGoogleClick}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Sign in with Google
          </button>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Close
          </button>
        </div>
      </div>
      
    </div>
  );
};
export default AuthModal