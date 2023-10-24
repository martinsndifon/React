import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import StarRating from './StarRating';
// import { useState } from 'react';

/* function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={5} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
} */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
      defaultRating={3}
    />
    <StarRating color="red" size={30} maxRating={40} className="test" />
    <Test /> */}
  </React.StrictMode>
);
