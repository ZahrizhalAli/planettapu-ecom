import React, { useEffect, useState } from 'react';
import ProductCard from '../components/cards/ProductCard';
import { getProductsByCount } from '../functions/product';
import { toast } from 'react-toastify';
import Jumbotron from '../components/cards/Jumbotron';
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);
  function loadAllProducts() {
    setLoading(true);
    getProductsByCount(6)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Cannot fetch the products');
        setLoading(false);
      });
  }
  return (
    <>
      <Jumbotron loading={loading} />
      <div className="container">
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p} loading={loading} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
