import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagedefault from '../../pages/admin/products/default-image.jpg';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

const { Meta } = Card;
const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, star, setStar }) {
  const [tooltip, setTooltip] = useState('Add to cart');
  const { images, description } = product;
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    // create cart array
    setTooltip('Added');
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in local storage get it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      // console.log(cart);
      // // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates first
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      localStorage.setItem('cart', JSON.stringify(unique));

      // add to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
    }
  };
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true}>
            {images.map((p) => {
              return (
                <div>
                  <img src={p.url} key={p.public_id} />
                </div>
              );
            })}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={imagedefault}
                className="mb-3 card-image"
                alt={images}
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on XXX XXXX XXXX to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{product.title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-5 pb-3">No ratings yet.</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                Add to cart
              </a>
            </Tooltip>,
            ,
            <Link to="/">
              <HeartOutlined />
              <br />
              Add to Wishlist
            </Link>,
            <>
              <RatingModal>
                <StarRating
                  name={product._id}
                  numberOfStars={5}
                  rating={star}
                  isSelectable={true}
                  starRatedColor="orange"
                  changeRating={onStarClick}
                />
              </RatingModal>
            </>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
