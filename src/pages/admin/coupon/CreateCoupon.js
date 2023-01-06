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
import FlipMove from 'react-flip-move';

function CreateCoupon() {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCoupons();
  }, []);

  function loadCoupons() {
    getCoupons().then((c) => {
      setCoupons(c.data);
    });
  }
  const handleSubmit = (e) => {
    //
    e.preventDefault();
    createCoupons({ name, expiry, discount }, user && user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`${res.data.name} is created`);
        loadCoupons();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //remove categories
  async function handleRemove(id) {
    if (window.confirm('Are you sure want to delete? ')) {
      removeCoupons(id, user.token)
        .then(() => {
          toast.dark('Discount removed');
          loadCoupons();
        })
        .catch((err) => {
          toast.error('Remove failed');
        });
    }
  }

  return (
    <>
      <div class="main">
        <div class="container-fluid">
          {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div class="row margin-bottom-40">
            {/* <!-- USER NAV --> */}
            <AdminNav />

            <div class="col-md-9 col-sm-7">
              <h1>Coupons </h1>
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
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Coupon Code</th>
                      <th scope="col">Expiry Date</th>
                      <th scope="col">Discount %</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c, i) => {
                      return (
                        <tr>
                          <td>{c.name}</td>
                          <td>{c.expiry}</td>
                          <td>{c.discount}</td>
                          <td>
                            <span
                              className="btn btn-sm float-right"
                              onClick={() => {
                                handleRemove(c._id);
                              }}
                            >
                              <DeleteOutlined />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCoupon;
