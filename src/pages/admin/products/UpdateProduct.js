import { LoadingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../functions/product';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { getCategories, getSubs } from '../../../functions/category';
const initialState = {
  title: '',
  description: '',
  price: '',
  color: '',
  brand: '',
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
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  useEffect(() => {
    getProduct(slug)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    loadCategories();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }
  async function loadCategories() {
    await getCategories().then((c) => {
      setCategories(c.data);
    });
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  function handleCategoryChange(e) {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });

    //fetch API getCategorySubs
    setShowSubs(true);
    getSubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
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
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                subOptions={subOptions}
                showSubs={showSubs}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
