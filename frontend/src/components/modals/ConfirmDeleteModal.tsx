const ConfirmDeleteModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 text-center shadow-lg relative">
        {/* Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
          alt="Confirm Delete"
          className="w-20 mx-auto mb-4"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Are you Sure!!
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6">
          Do you want to delete this Task on this app?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-md font-semibold transition">
            Yes
          </button>
          <button className="bg-red-200 hover:bg-red-300 text-red-600 px-6 py-2 rounded-md font-semibold transition">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
