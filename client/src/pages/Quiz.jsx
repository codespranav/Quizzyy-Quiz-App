import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const API_KEY = import.meta.env.VITE_API_KEY;

const Quiz = () => {``
    let { name } = useParams();
    const navigate = useNavigate();
    const url = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${name}&limit=10`; // Fetch 10 questions
    const [isIntroRead, setIsIntroRead] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers
    const [timeLeft, setTimeLeft] = useState(480); // Set timer in seconds (8 minutes = 480 seconds)
    
    useEffect(() => {
        const fetchURL = async () => {
            try {
                let res = await fetch(url);
                const data = await res.json();
                setQuestions(data); // Set questions from API
            } catch (error) {
                console.error("Something went wrong: " + error);
            }
        };
        fetchURL();
    }, [url]);

    // Timer effect
    useEffect(() => {
        let timer;
        if (isIntroRead) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }

        // Cleanup timer when component unmounts or quiz ends
        return () => {
            clearInterval(timer);
            };
    }, [isIntroRead]);

    // Format time for display
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleAnswerSelection = (questionId, answerKey) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answerKey, // Store answer by question ID
        }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    const handleSubmitQuiz = () => {
        let score = 0;
        questions.forEach((question, index) => {
            const correctAnswer = Object.keys(question.correct_answers).find(
                (key) => question.correct_answers[key] === "true"
            );

            if (selectedAnswers[question.id] === correctAnswer.replace('_correct', '')) {
                score++;
            }
        });

        alert(`Your score is ${score}/${questions.length}`);

        // Navigate to a results page (optional)
        navigate("/results", { state: { score, total: questions.length } });
    };

    useEffect(()=>{
        if(timeLeft === 0){
            console.log(timeLeft);
            handleSubmitQuiz();
        }
    }, [timeLeft])

    return (
        isIntroRead ? (
            <>
                <Navbar />
                <div className="quizContainer max-w-4xl bg-white shadow-lg rounded-lg m-auto p-6 mt-12">
                    <div className="topbar flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Quiz: {name}</h1>
                        <div className="time flex items-center gap-2">
                            <span className="text-lg font-medium">Time Left:</span>
                            <div className={`${timeLeft < 10 ? 'bg-red-700' : 'bg-yellow-400'} text-black font-bold px-3 py-1 rounded`}>
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        {questions.length > 0 ? (
                            <div className="questionBox">
                                <h2 className="text-xl font-bold mb-4">
                                    {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
                                </h2>
                                <div className="options grid grid-cols-2 gap-4">
                                    {Object.entries(questions[currentQuestionIndex].answers).map(([key, answer], i) =>
                                        answer ? (
                                            <label
                                                key={key}
                                                className={`option flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-200 cursor-pointer ${selectedAnswers[questions[currentQuestionIndex].id] === key ? 'bg-blue-200' : ''}`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name={`question-${currentQuestionIndex}`} 
                                                    id={key} 
                                                    className="mr-2" 
                                                    checked={selectedAnswers[questions[currentQuestionIndex].id] === key} 
                                                    onChange={() => handleAnswerSelection(questions[currentQuestionIndex].id, key)} // Set selected answer
                                                />
                                                {answer}
                                            </label>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p>Loading questions...</p>
                        )}
                    </div>

                    <div className="buttons flex justify-between mt-5 outline-none">
                        <button
                            className='bg-red-800 text-white p-3 rounded-md'
                            onClick={()=>{
                                let askUserToExit = confirm("Are you sure you want to exit?")
                                if(askUserToExit){
                                    setIsIntroRead(false)
                                }

                            }}
                        >
                            Exit
                        </button>
                        <div className="controlbtn">
                            <button 
                                className='bg-green-400 text-white p-3 rounded-md mr-2' 
                                onClick={handlePrevQuestion} 
                                disabled={currentQuestionIndex === 0}
                            >
                                Prev
                            </button>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <button 
                                    className='bg-green-800 text-white p-3 rounded-md mr-2'
                                    onClick={handleSubmitQuiz}
                                >
                                    Submit
                                </button>
                            ) : (
                                <button 
                                    className='bg-green-800 text-white p-3 rounded-md mr-2'
                                    onClick={handleNextQuestion}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <div className='h-screen w-full flex justify-center items-center flex-col'>
                <p className='text-lg font-bold font-Poppins mb-3'>Start Quiz: {name}</p>
                <button className='bg-slate-900 text-white p-4 rounded-md flex justify-center items-center' onClick={() => setIsIntroRead(true)}>
                    Start Test
                </button>
            </div>
        )
    );
};

export default Quiz;
