import React from 'react';

function Jumbotron({ loading }) {
  return (
    <>
      <div className="jumbotron text-center">
        {loading ? <h1>Loading..</h1> : <h1>All Products</h1>}
      </div>
    </>
  );
}

export default Jumbotron;
