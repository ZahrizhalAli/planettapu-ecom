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
  const handleSubmit = () => {
    //
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
              <h1>Sub Category</h1>
              <div class="content-page">
                <form class="form-signin" onSubmit={handleSubmit}>
                  <label for="inputEmail">New Category</label>
                  <input
                    size="50"
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Enter new Category"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    autofocus
                  />
                  <button
                    class="btn btn-md btn-outline-dark btn-category"
                    type="submit"
                  >
                    Add Sub Category
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
