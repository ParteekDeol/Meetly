import React, { useState, useEffect } from 'react';

import Question from './Question.jsx';

// import {GenerateLocations, GenerateInfo} from './request.js';
// import GenerateInfo from './request.js';

export default function Quiz({ setLocation, setPlan, setImages, isVisible, setIsVisible, setIsLoadingVisible, setIsLocationVisible, setProgress }) {
    const questions = [
        {
            question: "How do you prefer to spend your time when exploring a new place?",
            options: [
                "Food experiences",
                "Nature and scenic views",
                "Museums and history",
                "Nightlife and entertainment",
            ],
        },
        {
            question: "What level of social interaction are you comfortable with when meeting new people?",
            options: ["Low", "Moderate", "High"],
        },
        {
            question: "Do you enjoy structured plans or spontaneous exploration?",
            options: ["Structured plans", "Flexible balance", "Mostly spontaneous"],
        },
        {
            question: "Are you more interested in well-known landmarks or hidden/local spots?",
            options: ["Landmarks", "Hidden gems", "A mix of both"],
        },
        {
            question: "What pace do you prefer while traveling?",
            options: ["Relaxed", "Balanced", "Fast-moving"],
        },
        {
            question: "Do you prefer indoor cultural activities or outdoor adventures?",
            options: ["Indoor cultural", "Outdoor adventure", "Both equally"],
        },
        {
            question: "What type of food experience are you seeking?",
            options: ["Local specialties", "Familiar options", "High-end dining", "Street food"],
        },
        {
            question: "What's your ideal setting?",
            options: ["Urban city centers", "Coastal areas", "Mountains", "Rural villages"],
        },
        {
            question: "How important is budget in your decisions?",
            options: ["Strict budget", "Moderate budget", "Flexible budget"],
        },
        {
            question: "Are you open to trying customs or activities outside your comfort zone?",
            options: ["Not really", "Maybe a little", "Absolutely"],
        },
    ];

    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        if (answers.length === questions.length && questions.length > 0) {
            generateQuiz();
        }
    }, [answers]);

    function returnError(error) {
        console.error(`${error.code}: ${error.message}`);
        setIsVisible(false);
        setIsLoadingVisible(false);
        setIsLocationVisible(true);
    }

    function handleSubmit(answer, questionNumber) {
        setAnswers([...answers, {question: questions[questionNumber - 1].question, answer: answer}]);
        setCurrentQuestion(questionNumber);
    }

    async function generateQuiz() {
        setIsLoadingVisible(true);
        const location = await fetch("/api/generate-location", {
            method: "POST",
            body: JSON.stringify({ "answers": answers })
        })
        .then(async res => {
            const location = (await res.json()).location;
            setLocation(location);
            setProgress(2);

            const plan = await fetch("/api/generate-plan", {
                method: "POST",
                body: JSON.stringify({ "location": location })
            })
            .then(async res => {
                const plan = await res.json();
                setPlan(plan);
                setProgress(3);
            })
            .catch(error => {
                returnError(error);
            })

            const images = await fetch("/api/get-images", {
                method: "POST",
                body: JSON.stringify({ "location": location })
            })
            .then(async res => {
                const images = await res.json();
                setImages(images);
                setProgress(4);
            })
            .catch(error => {
                returnError(error);
            })
            setIsVisible(false);
            setIsLoadingVisible(false);
            setIsLocationVisible(true);
        })
        .catch(error => {
            returnError(error);
        })
    }

    return (
        <div style={{ display: isVisible ? 'block' : 'none' }}>
            {questions.map((q, i) => (
                <Question key={i}
                    question={q.question}
                    questionNumber={i + 1}
                    totalQuestions={questions.length}
                    options={q.options}
                    onSubmit={(answer, questionNumber) => handleSubmit(answer, questionNumber)}
                    isVisible={currentQuestion + 1 === i + 1}
                />
            ))}
        </div>
    );
}