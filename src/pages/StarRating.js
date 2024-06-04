import React, { useState } from 'react';
import './StarRating.css';

const getStarArr = (rating) => {
    switch (rating) {
        case 0: return [0, 0, 0, 0, 0];
        case 0.5: return [2, 0, 0, 0, 0];
        case 1: return [1, 0, 0, 0, 0];
        case 1.5: return [1, 2, 0, 0, 0];
        case 2: return [1, 1, 0, 0, 0];
        case 2.5: return [1, 1, 2, 0, 0];
        case 3: return [1, 1, 1, 0, 0];
        case 3.5: return [1, 1, 1, 2, 0];
        case 4: return [1, 1, 1, 1, 0];
        case 4.5: return [1, 1, 1, 1, 2];
        case 5: return [1, 1, 1, 1, 1];
        default: return [];
    }
};

const fillStar = (star, index) => {
    switch (star) {
        case 0:
            return <span className="unselected-star">☆</span>;
        case 1:
            return <span className="selected-star">★</span>;
        case 2:
            return <span className="half-selected-star">☆</span>; 
        default:
            return null;
    }
};

const StarRating = ({ initialRating = 0, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleRateChange = (starValue, event) => {
        const rect = event.target.getBoundingClientRect();
        const isHalfStar = (event.clientX - rect.left) < (rect.width / 2);
        const newRating = isHalfStar ? starValue - 0.5 : starValue;
        setRating(newRating);
        onRatingChange(newRating);
    };

    return (
        <div className="star-rating">
            {getStarArr(rating).map((star, index) => (
                <span key={index} onClick={(event) => handleRateChange(index + 1, event)}>
                    {fillStar(star, index)}
                </span>
            ))}
        </div>
    );
};


export default StarRating;
