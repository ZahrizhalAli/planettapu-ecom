import React from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import { showAverage } from '../../functions/rating';
const { Meta } = Card;

function ProductCard({ loading, product, defaultImage }) {
  const { title, description, images, slug } = product;

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pb-4">No ratings yet.</div>
      )}
      <Card
        cover={
          <img
            alt={images}
            src={images && images.length ? images[0].url : defaultImage}
            style={{ height: '150px', objectFit: 'cover' }}
            className="p-1"
          />
        }
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
      </Card>
    </>
  );
}

export default ProductCard;
