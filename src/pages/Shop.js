import React, { useState, useEffect } from 'react';
import { getProductsByCount, getProductsByFilter } from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
const { SubMenu, Item } = Menu;

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);

  let { search } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  const { text } = search; // destructure text from search

  useEffect(() => {
    loadAllProducts();
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
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h4>Search/Filter</h4>
            <hr />
            <Menu defaultOpenKeys={['slider_1', '2']} mode="inline">
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
