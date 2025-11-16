import React, { useState } from 'react';

import Question from './Question.jsx';

import GenerateLocations from './request.js';
import GenerateInfo from './request.js';

export default function Quiz( {setLocation, setPlan} ) {
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

    const answers = [];

    const [currentQuestion, setCurrentQuestion] = useState(0);

    function handleSubmit(answer, questionNumber) {
        console.log("Answer submitted:", answer, "for question:", questions[questionNumber - 1].question);
        answers[questionNumber] = {question: questions[questionNumber - 1].question, answer: answer};
        setCurrentQuestion(questionNumber);
    }

    function generateQuiz() {
        const location = GenerateLocations(answers.toString());
        const locationValue = location.then((res) => {
            setLocation(res);
            return res;
        });

        console.log(locationValue);

        const plan = GenerateInfo(locationValue);
        plan.then((res) => setPlan(res));
    }

    return (
        <>
            <h1>Quiz Component</h1>
            {questions.map((q, i) => (
                <Question key={i}
                    question={q.question}
                    questionNumber={i + 1}
                    options={q.options}
                    onSubmit={(answer, questionNumber) => handleSubmit(answer, questionNumber)}
                    isVisible={currentQuestion + 1 === i + 1}
                />
            ))}
            <button onClick={() => generateQuiz()}>Generate</button>
        </>
    );
}