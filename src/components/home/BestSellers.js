import React, { useEffect, useState } from 'react';
import ProductCard from '../cards/ProductCard';
import { getProducts } from '../../functions/product';
import { toast } from 'react-toastify';
import LoadingCard from '../cards/LoadingCard';

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);
  function loadAllProducts() {
    setLoading(true);
    // sort,order, limit
    getProducts('sold', 'desc', 3)
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
    </>
  );
}

export default BestSellers;
