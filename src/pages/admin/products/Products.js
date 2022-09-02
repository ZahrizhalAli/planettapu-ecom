import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getProductsByCount } from '../../../functions/product';
import { removeProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import imagedefault from './default-image.jpg';
const AdminNav = lazy(() => import('../../../components/nav/AdminNav'));
const AdminProductCard = lazy(() =>
  import('../../../components/cards/AdminProductCard')
);

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (slug) => {
    //
    if (window.confirm('Delete this product?')) {
      removeProduct(slug, user && user.token)
        .then((res) => {
          toast.dark('Product Deleted.');
          loadAllProducts();
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };
  return (
    <>
      <Suspense fallback={null}>
        <div class="main">
          <div class="container-fluid">
            {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
            <div class="row margin-bottom-40">
              {/* <!-- USER NAV --> */}
              <AdminNav />

              <div class="col-md-9 col-sm-7">
                {loading ? <h1>Loading..</h1> : <h1>All Products</h1>}
                <div className="col">
                  <div className="row">
                    {products.map((p) => (
                      <div className="col-md-4 pb-3" key={p._id}>
                        <AdminProductCard
                          handleRemove={handleRemove}
                          defaultImage={imagedefault}
                          product={p}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Products;
