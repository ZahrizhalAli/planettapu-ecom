import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/product';
import { toast } from 'react-toastify';

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

  return <>{JSON.stringify(product)}</>;
}

export default ProductsHomepage;
