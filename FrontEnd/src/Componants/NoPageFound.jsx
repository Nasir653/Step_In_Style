import React from 'react';
import './NoPageFound.scss';

const NoPageFound = () => {
  return (
    <div className="no-page-container">
      <div className="no-page-content">
        <h1 className="no-page-title">404</h1>
        <p className="no-page-message">Page Not Found</p>
        <p className="no-page-description">Oops! The page you are looking for doesn't exist.</p>
        <a className="no-page-link" href="/">Go back to Home</a>
      </div>
    </div>
  );
};

export default NoPageFound;
