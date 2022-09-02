import React from 'react';

function UpdateProduct({ match }) {
  return <h1>{match.params.slug}</h1>;
}

export default UpdateProduct;
