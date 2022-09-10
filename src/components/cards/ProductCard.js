import React from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

const { Meta } = Card;

function ProductCard({ loading, product, defaultImage }) {
  const { title, description, images, slug } = product;

  return (
    <>
      <Skeleton></Skeleton>
      {/* <Card
        cover={
          <img src={images && images.length ? images[0].url : defaultImage} />
        }
        style={{ height: '150px', objectFit: 'cover' }}
        className="m-2"
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined />
            <br />
            View Product
          </Link>,
          <div>
            <ShoppingCartOutlined />
            <br />
            Add to cart
          </div>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 50)}...`}
        />
      </Card> */}
    </>
  );
}

export default ProductCard;
