const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <header className="bg-gradient-to-r from-green-800 to-teal-700 h-28 w-full"></header>

      <div className="flex flex-col justify-center items-center flex-grow px-4 text-center">
        <h1 className="text-[100px] font-extrabold text-gray-800 leading-none">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          Oops! Page Not Found
        </p>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved. Let's get you back to where you need to be.
        </p>

        <button
          className="bg-[#60E5AE] text-black px-6 py-3 rounded font-semibold hover:shadow-lg transition"
          onClick={() => window.location.href = "/"}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;