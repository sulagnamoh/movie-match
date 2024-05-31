import React from 'react';
import './StarRating.css';


const getStarArr = (rating) =>
{
   switch (rating)
   {
       case 0:
           return [0, 0, 0, 0, 0];
       case 0.5:
           return [2, 0, 0, 0, 0];
       case 1:
           return [1, 0, 0, 0, 0];
       case 1.5:
           return [1, 2, 0, 0, 0];
       case 2:
           return [1, 1, 0, 0, 0];
       case 2.5:
           return [1, 1, 2, 0, 0];
       case 3:
           return [1, 1, 1, 0, 0];
       case 3.5:
           return [1, 1, 1, 2, 0];
       case 4:
           return [1, 1, 1, 1, 0];
       case 4.5:
           return [1, 1, 1, 1, 2];
       case 5:
           return [1, 1, 1, 1, 1];
       default:
           return [];
   }
};


const fillStar = (star, index) =>
{
   switch (star)
   {
       case 0:
           return <span key = {index} className="unselected-star">☆</span>;
       case 1:
           return <span key = {index} className="selected-star">★</span>;
       case 2:
           return <span key = {index} className="half-selected-star">☆</span>;
       default:
           return null;
   }
};


const StarRating = ({ rating, rateChanged }) =>
{
   const handleRateChange = (index) =>
   {
       if (rateChanged)
       {
           const newRating = (rating === index + 0.5) ? index + 1 : index + 0.5;
           if (index === 0 && rating === 1)
           {
               rateChanged(0);
           }
           else
           {
               rateChanged(newRating);
           }
       }
   };
   return(
       <div className="star-rating">
           {getStarArr(rating).map((star, index) =>(
               <span key={index} onClick={() => handleRateChange(index)}>
                   {fillStar(star, index)}
               </span>
           ))}
       </div>
   );
};


export default StarRating;
