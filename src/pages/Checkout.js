import React from 'react';

function Checkout() {
  const saveAddressToDb = () => {
    //
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          textarea
          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon?</h4>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products x</p>
          <hr />
          <p>List of products</p>
          <hr />
          <p>cart total : x</p>

          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary">Place Order</button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary">Empty Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
