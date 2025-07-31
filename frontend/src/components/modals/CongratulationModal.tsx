const CongratulationModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 relative text-center shadow-lg">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">
          &times;
        </button>

        {/* Firework Icons */}
        <div className="mb-4">
          <div className="text-4xl text-center mb-2">🎉✨🎊</div>
          <h2 className="text-2xl font-bold text-gray-800">Congratulations</h2>
        </div>

        {/* Message */}
        <p className="text-md font-semibold text-gray-700 mt-2">
          Successfully Completed the Task!
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Congratulations! You have successfully completed the task and you got <span className="text-green-600 font-bold">20 points</span>.
        </p>
      </div>
    </div>
  );
};

export default CongratulationModal;
