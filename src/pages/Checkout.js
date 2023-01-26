import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
  applyCoupon,
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Checkout() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

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
      setTotalAfterDiscount(0);
      setCoupon('');
      setTotal(0);
      toast.success('Cart is empty.');
    });
  };

  const saveAddressToDB = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address saved');
      }
    });
  };

  const applyDiscountCoupon = () => {
    // console.log(coupon);
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data.err) {
        toast.error('Coupon Invalid');
        // update redux coupon applied
      } else if (res.data) {
        toast.success('Coupon Applied');
        setTotalAfterDiscount(res.data);
      }
      // update state in redux the total after discount
    });
  };

  const showAddress = () => {
    return (
      <>
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDB}>
          Save
        </button>
      </>
    );
  };

  const showProductsSummary = () => {
    return products.map((p, i) => {
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
    });
  };

  const showApplyCoupon = () => {
    return (
      <>
        <input
          onChange={(e) => setCoupon(e.target.value)}
          type="text"
          value={coupon}
          placeholder="Your Coupon Here"
          className="form-control"
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
          Apply
        </button>
      </>
    );
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6 pl-4">
          <h4>Delivery Address</h4>
          <br />
          <br />
          {showAddress()}
          <hr />
          <h4>Got Coupon?</h4>
          {showApplyCoupon()}
          <br />
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>

          <hr />
          <p>{products.length} Products</p>
          <hr />
          {showProductsSummary()}
          <hr />
          <p>Cart total : {total}</p>
          {totalAfterDiscount > 0 && (
            <p className="bg-success">
              Discount Applied: Total Payable: Rp. {totalAfterDiscount}
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              <button
                disabled={!addressSaved || !products.length}
                className="btn btn-primary"
              >
                Place Order
              </button>
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
