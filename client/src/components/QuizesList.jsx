import React, { useEffect, useState } from 'react';
import Quiz from '../pages/Quiz';
import { useNavigate } from 'react-router-dom';

const API_KEY = "GzCTK7RYUbjcCs2SMSvlZrKaUhFWnqN1FvAw5cJ8";

const QuizesList = () => {
    const URL = `https://quizapi.io/api/v1/categories?apiKey=${API_KEY}`;
    const navigate = useNavigate();
    const [quizes, setQuizes] = useState([]);
    const [quizCat, setQuizCat] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchURL = async () => {
            try {
                const cachedCat = localStorage.getItem("category");
                if (cachedCat) {
                    setQuizCat(JSON.parse(cachedCat)); // Parse JSON string
                    return;
                }

                let res = await fetch(URL);
                const data = await res.json();
                localStorage.setItem("category", JSON.stringify(data));
                setQuizCat(data); // No need for await here
            } catch (error) {
                console.error("Something went wrong: " + error);
                setError("Failed to load categories");
            }
        };
        fetchURL();
    }, [URL]);

    const startQuiz = ((name)=>{
        console.log("clicked");
        navigate(`/start-quiz/${name}`)
    })

    return (
        <div className='max-w-7xl mx-auto p-6 '>
            {error ? <p>{error}</p> : null}
            <h1 className='text-xl font-bold border-l-4 border-yellow-300 font-Poppins pl-4'>Featured Quizes</h1>
            <div className="list bg-white mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 m-auto">
                {quizCat && quizCat.length > 0 ? (
                    quizCat.map((item, index) => (
                        <div key={index} className="card bg-[#f5f5f5] rounded-md p-4 cursor-pointer" title={item.name} onClick={()=>{startQuiz(item.name)}}>
                            <div className="image">
                                <img src="https://cf.quizizz.com/img/presentation/default-img/presentation_title_img-5_technology.jpg" alt="technology thumbnail" />
                                <h2 className='text-lg font-bold font-Poppins mt-4 uppercase'>{item.name}</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )}
            </div>
        </div>
    );
};

export default QuizesList;
