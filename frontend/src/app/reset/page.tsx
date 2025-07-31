const ResetDesign = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-white px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-max">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-1">Reset your Password</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Strong passwords include numbers, letters, and punctuation marks.
        </p>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Enter New Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="********"
                className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-400">
                👁️
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Retype password"
                className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-400">
                👁️
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetDesign;
