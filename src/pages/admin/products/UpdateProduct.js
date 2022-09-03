import { LoadingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../functions/product';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  color: '',
  brand: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: [
    'Black',
    'Blue',
    'Red',
    'White',
    'Space Grey',
    'Gray',
    'Yellow',
    'Green',
    'Navy',
  ],
};

function UpdateProduct() {
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    getProduct(slug)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div class="main">
        <div class="container-fluid">
          {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div class="row margin-bottom-40">
            {/* <!-- USER NAV --> */}
            <div className="col-md-3 col-sm-12 ">
              <AdminNav />
            </div>
            <div class="col-md-9 col-sm-9">
              {loading ? <LoadingOutlined /> : <h1>{slug}</h1>}
              {JSON.stringify(values)}
              <ProductUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                values={values}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
