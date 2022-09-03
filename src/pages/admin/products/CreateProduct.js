import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import FileUpload from '../../../components/forms/FileUpload';
import { createProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
//category
import { getCategories, getSubs } from '../../../functions/category';
//antd design
import { Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
const { Option } = Select;

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

function CreateProduct() {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [loading, setLoading] = useState(false);
  //destructuring all products models from values state
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    color,
  } = values;

  //Redux untuk memastikan dia admin atau bukan
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);
  function loadCategories() {
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
    });
  }

  //
  function handleCategoryChange(e) {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });

    //fetch API getCategorySubs
    getSubs(e.target.value).then((res) => {
      setSubOptions(res.data);
      setShowSubs(true);
    });
  }
  function handleChange(e) {
    //
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    //
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.dark('Successfully Published');
        window.location.reload();
      })
      .catch((err) => {
        toast.error('Creating Product Failed');
        console.log(err);
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
              {loading ? <LoadingOutlined /> : <h1>Product</h1>}

              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
              <ProductCreateForm
                values={values}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleCategoryChange={handleCategoryChange}
                showSubs={showSubs}
                setValues={setValues}
                subOptions={subOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
