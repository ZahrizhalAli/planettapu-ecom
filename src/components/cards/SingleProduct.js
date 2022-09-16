import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagedefault from '../../pages/admin/products/default-image.jpg';

const { Meta } = Card;

function SingleProduct({ product }) {
  const { images } = product;
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
      </div>
      <div className="col-md-5">
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
          <Meta title={product.title} description={product.description} />
          <p>
            price/category/subs/shipping/color/brand/quantity available/ sold
          </p>
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
