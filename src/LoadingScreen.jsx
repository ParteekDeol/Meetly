import React from "react";
import "./LoadingScreen.css";

export default function LoadingScreen({ progress, isLoadingVisible }) {
  const progressPercentage = progress * 25;
  return (
    <div style={{ display: isLoadingVisible ? 'block' : 'none' }} className="loading-container">
      <main className="loading-card">
        <header className="loading-header">
          <h1 className="viaoda-libre-bold">Processing...</h1>
        </header>

        <div className="start-wrap">
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>
      </main>
      <p id="credits-text-loading">Created by Parteek Deol and Kushaagra Patel</p>
    </div>
  );
}
