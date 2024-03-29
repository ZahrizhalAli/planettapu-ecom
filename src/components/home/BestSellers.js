import React, { useEffect, useState } from 'react';
import ProductCard from '../cards/ProductCard';
import { getProducts, getProductsCount } from '../../functions/product';
import { toast } from 'react-toastify';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setproductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setproductsCount(res.data);
    });
  }, []);
  function loadAllProducts() {
    setLoading(true);
    // sort,order, limit
    getProducts('sold', 'desc', page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Cannot fetch latest products');
      });
  }
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <ProductCard product={p} loading={loading} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center mb-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
}

export default BestSellers;
