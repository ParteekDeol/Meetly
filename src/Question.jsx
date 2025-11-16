import React, { useState } from 'react';

import './Question.css';

export default function Question({ question, options, onSubmit, questionNumber, isVisible }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSubmit = () => {
    if (selectedQuestion) {
      onSubmit(selectedQuestion, questionNumber);
    }
  };

  return (
    <div className="quiz-container" style={{ display: isVisible ? 'block' : 'none' }}>
      <p className="question">{question}</p>

      <ol>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => setSelectedQuestion(option)}
            className={selectedQuestion === option ? "selected" : ""}
            tabIndex={0}                 /* improves accessibility + keyboard focus */
            onKeyDown={(e) => {          /* allow Enter/Space to select */
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

      {selectedQuestion && <p className="selected-note">You selected: {selectedQuestion}</p>}

      <div className="actions">
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}




