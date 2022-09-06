import React, { useEffect, useState } from 'react';
import AdminProductCard from '../components/cards/AdminProductCard';
import { getProductsByCount } from '../functions/product';
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
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <>
      <div class="col-md-9 col-sm-7">
        {loading ? <h1>Loading..</h1> : <h1>All Products</h1>}
        <div className="col">
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4 pb-3" key={p._id}>
                <AdminProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
