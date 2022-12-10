import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart() {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h4>Cart</h4>
          {JSON.stringify(cart)}
        </div>
      </div>
    </>
  );
}

export default Cart;
