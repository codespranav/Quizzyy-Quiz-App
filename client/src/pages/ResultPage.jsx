// ResultPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();


  // Calculate percentage
  const { score, total } = location.state || { score: 0, total: 0 };
  const percentage = total / score

  const resetQuiz = ()=>{
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz Result</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700">
          Score: {score + "/" + total}
        </h2>
        <h3 className="text-lg text-gray-600 mt-2">
          Percentage: {100 / percentage+"%"}
        </h3>

        {percentage >= 70 ? (
          <p className="text-green-600 font-semibold text-xl mt-4">Congratulations! You Passed!</p>
        ) : (
          <p className="text-red-600 font-semibold text-xl mt-4">Better luck next time!</p>
        )}
      </div>

      <div className="flex space-x-4 mt-8">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
          onClick={resetQuiz}
        >
          Retry Quiz
        </button>
        <button
          className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
