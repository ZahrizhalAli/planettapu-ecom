import React, { useEffect, useState } from 'react';
import { getProduct, productStar, getRelated } from '../functions/product';
import { toast } from 'react-toastify';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';

function ProductsHomepage({ match }) {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;
  //

  useEffect(() => {
    loadingSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product && product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadingSingleProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        // set related product
        getRelated(res.data._id).then((res) => setRelated(res.data));
      })
      .catch((err) => {
        toast.error('Fetching product error');
      });
  };

  const onStarClick = (newRating, name) => {
    // name = productId
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log('rating clicked', res);
      loadingSingleProduct();
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
            setStar={setStar}
          />
        </div>
        <div className="row p-5">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h2>Related Product</h2>
            <hr />
            <div className="row pb-5">
              {related && related.length > 0 ? (
                related.map((r) => (
                  <div className="col-md-4" key={r._id}>
                    <ProductCard product={r} />
                  </div>
                ))
              ) : (
                <div className="text-center">No Products Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsHomepage;
