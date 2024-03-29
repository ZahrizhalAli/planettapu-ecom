import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => {
      total.push(r.star);
    });

    let totalReduced = total.reduce((p, n) => p + n, 0); // perform fibonacci --> 1 4 6 7 = 1 + 4 = 5 + 6 = 11 + 7 ...
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            rating={result}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="2px"
            editing={false}
          />
          ({result})
        </span>
      </div>
    );
  }
};
