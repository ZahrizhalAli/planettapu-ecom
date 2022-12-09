import React, { useState } from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
const { Meta } = Card;

function ProductCard({ loading, product, defaultImage }) {
  const [tooltip, setTooltip] = useState('Click to add');
  const { title, description, images, slug } = product;

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
      console.log(unique);
      localStorage.setItem('cart', JSON.stringify(unique));
    }
  };
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
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" />
              <br />
              Add to cart
            </a>
          </Tooltip>,
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
