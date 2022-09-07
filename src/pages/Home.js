import React, { useEffect, useState } from 'react';
import AdminProductCard from '../components/cards/AdminProductCard';
import { getProductsByCount } from '../functions/product';
import { toast } from 'react-toastify';
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);
  function loadAllProducts() {
    setLoading(true);
    getProductsByCount(5)
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
      <div className="jumbotron text-center">
        {loading ? <h1>Loading..</h1> : <h1>All Products</h1>}
      </div>
      <div className="container">
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <AdminProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
