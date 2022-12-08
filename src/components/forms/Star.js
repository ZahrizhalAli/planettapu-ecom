import React from 'react';
import StarRating from 'react-star-ratings';

function Star({ starClick, numberOfStars }) {
  return (
    <>
      <br />
      <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starSpacing="2px"
        starDimension="20px"
        starHoverColor="red"
        starEmptyColor="red"
      />
    </>
  );
}

export default Star;
