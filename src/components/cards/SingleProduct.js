import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagedefault from '../../pages/admin/products/default-image.jpg';
import ProductListItems from './ProductListItems';
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
        <h1 className="bg-info p-3">{product.title}</h1>

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
