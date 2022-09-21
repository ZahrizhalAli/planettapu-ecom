import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagedefault from '../../pages/admin/products/default-image.jpg';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
const { Meta } = Card;
const { TabPane } = Tabs;

function SingleProduct({ product }) {
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
        <div>
          <StarRating
            name={product._id}
            numberOfStars={5}
            rating={2}
            changeRating={(newRating, name) =>
              console.log('newRating', newRating, 'name', name)
            }
            isSelectable={true}
            starRatedColor="orange"
          />
        </div>
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
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
