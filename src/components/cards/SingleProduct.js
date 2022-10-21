import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagedefault from '../../pages/admin/products/default-image.jpg';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
const { Meta } = Card;
const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, star, setStar }) {
  const { images, description } = product;
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
            <>
              <ShoppingCartOutlined className="text-success" /> Add to Cart
            </>,
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
