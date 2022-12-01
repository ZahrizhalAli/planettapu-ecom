import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">search/filter menu</div>
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
