import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emptyUserCart, getUserCart } from '../functions/user';
import { toast } from 'react-toastify';
function Checkout() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  const emptyCart = () => {
    //remove from localstorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    // remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });

    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success('Cart is empty.');
    });
  };

  const saveAddressToDB = () => {
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
          <button className="btn btn-primary mt-2" onClick={saveAddressToDB}>
            Save
          </button>
          <hr />
          <h4>Got Coupon?</h4>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>

          <hr />
          <p>{products.length} Products</p>
          <hr />
          {products.map((p, i) => {
            return (
              <>
                <div key={i}>
                  <p>
                    {p.product.title} ({p.color}) x {p.count} ={' '}
                    {p.product.price * p.count}
                  </p>
                </div>
              </>
            );
          })}
          <hr />
          <p>Cart total : {total}</p>

          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary">Place Order</button>
            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-primary"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
