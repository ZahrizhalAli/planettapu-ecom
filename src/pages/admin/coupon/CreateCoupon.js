import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getCoupons,
  removeCoupons,
  createCoupons,
} from '../../../functions/coupon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
function CreateCoupon() {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const handleSubmit = (e) => {
    //
    e.preventDefault();
    createCoupons({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div class="main">
        <div class="container-fluid">
          {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div class="row margin-bottom-40">
            {/* <!-- USER NAV --> */}
            <AdminNav />

            <div class="col-md-9 col-sm-7">
              <h1>Coupons</h1>
              <div class="content-page">
                <form class="form-signin" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="inputEmail">New Coupon</label>
                    <input
                      size="50"
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Create New Coupon"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      autofocus
                    />
                  </div>
                  <div className="form-group">
                    <label for="inputEmail">Discount %</label>
                    <input
                      size="50"
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Create New Coupon"
                      value={discount}
                      onChange={(e) => {
                        setDiscount(e.target.value);
                      }}
                      autofocus
                    />
                  </div>
                  <div className="form-group">
                    <label for="inputEmail">Expiry Date</label>
                    <DatePicker
                      className="form-control"
                      selected={new Date()}
                      value={expiry}
                      required
                      onChange={(date) => setExpiry(date)}
                    />
                  </div>
                  <button
                    class="btn btn-md btn-outline-dark btn-category"
                    type="submit"
                  >
                    Add Coupon
                  </button>
                </form>{' '}
                <hr />
                {/* UNTUK TAMPILKAN LIST KOSONG */}
                {/* UNTUK TAMPILKAN COUPONS  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCoupon;
