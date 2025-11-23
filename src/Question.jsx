import React, { useState } from 'react';

import './Question.css';

export default function Question({ question, options, onSubmit, questionNumber, totalQuestions, isVisible }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSubmit = () => {
    if (selectedQuestion) {
      onSubmit(selectedQuestion, questionNumber);
      setSelectedQuestion(null);
    }
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="quiz-container" style={{ display: isVisible ? 'block' : 'none' }}>
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">Question {questionNumber} of {totalQuestions}</span>
      </div>

      <p className="question viaoda-libre-bold">{question}</p>

      <ol>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => setSelectedQuestion(option)}
            className={selectedQuestion === option ? "selected" : ""}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedQuestion(option);
                e.preventDefault();
              }
            }}
          >
            {option}
          </li>
        ))}
      </ol>

      <div className="actions">
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={!selectedQuestion}
        >
          {questionNumber === totalQuestions ? 'Finish' : 'Next'}
        </button>
      </div>
      <p id="credits-text-quiz">Created by Parteek Deol and Kushaagra Patel</p>
    </div>
  );
}




