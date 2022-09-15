import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/product';
import { toast } from 'react-toastify';
import SingleProduct from '../components/cards/SingleProduct';

function ProductsHomepage({ match }) {
  const [product, setProduct] = useState({});

  const { slug } = match.params;
  //

  useEffect(() => {
    loadingSingleProduct();
  }, []);

  const loadingSingleProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        toast.error('Fetching product error');
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct product={product} />
        </div>
        <div className="row">
          <div>Related Product</div>
        </div>
      </div>
    </>
  );
}

export default ProductsHomepage;
