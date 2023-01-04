import React, { useState, useEffect } from 'react';
import { getProductsByCount, getProductsByFilter } from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/forms/Star';
import { Menu, Slider, Checkbox } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { getCategories } from '../functions/category';
const { SubMenu, Item } = Menu;

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  let { search } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  const { text } = search; // destructure text from search

  useEffect(() => {
    loadAllProducts();
    // get categories
    getCategories().then((res) => setCategories(res.data));
  }, []);

  // 1. Load default products on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. Load products based on search query
  useEffect(() => {
    const delayed = setTimeout(() => {
      // improve performance from each query request
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (text) => {
    getProductsByFilter(text).then((res) => {
      setProducts(res.data);
    });
  };

  //3.Load products based on price range
  const [ok, setOk] = useState(false);
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    setCategoryIds([]); // clean category ids
    setStar('');
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };

  // 4. load products based on category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    // check all available data in categoryIds
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;

    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found, pull out one item from index
      inTheState.splice(foundInTheState, 1); // remove 1 item given the index found
    }

    setCategoryIds(inTheState);

    fetchProducts({ category: inTheState });
  };

  // 5. Show products based on star rating

  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    fetchProducts({ stars: num });
  };
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />{' '}
      <Star starClick={handleStarClick} numberOfStars={4} />{' '}
      <Star starClick={handleStarClick} numberOfStars={3} />{' '}
      <Star starClick={handleStarClick} numberOfStars={2} />{' '}
      <Star starClick={handleStarClick} numberOfStars={1} />{' '}
    </div>
  );
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h4>Search/Filter</h4>

            <hr />
            <Menu
              defaultOpenKeys={['slider_1', 'slider_2', 'slider_3']}
              mode="inline"
            >
              <SubMenu
                key="slider_1"
                title={
                  <span className="h5">
                    <DollarOutlined />
                    Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `Rp. ${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="499999"
                  />
                </div>
                <br />
              </SubMenu>
              <SubMenu
                key="slider_2"
                title={
                  <span className="h5">
                    <DownSquareOutlined />
                    Categories
                  </span>
                }
              >
                {showCategories()}
              </SubMenu>
              {/* Stars */}
              <SubMenu
                key="slider_3"
                title={
                  <span className="h5">
                    <StarOutlined />
                    Star
                  </span>
                }
              >
                {showStars()}
              </SubMenu>
            </Menu>
          </div>
          <div className="col-md-9">
            {loading ? (
              <h5 className="text-danger">Loading...</h5>
            ) : (
              <h4>Products</h4>
            )}
            {products.length < 1 && <p>No Products Found.</p>}
            <div className="row">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 mt-4">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Shop;
