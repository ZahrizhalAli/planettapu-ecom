import React from 'react';
import { Link } from 'react-router-dom';

function ProductListItems({ product }) {
  const { category, subs, title, price, shipping, quantity, sold, color } =
    product;
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          Price{' '}
          <span className="label label-default label-pill pull-xs-right">
            Rp. {price}
          </span>
        </li>
        <li className="list-group-item">
          Category{' '}
          <Link
            to={`/category/${category && category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category && category.name}
          </Link>
        </li>
        <li className="list-group-item">
          Sub Categories{' '}
          {subs &&
            subs.map((p) => {
              return (
                <Link
                  to={`/category/${p.subs && p.subs.name}`}
                  className="label label-default label-pill pull-xs-right"
                >
                  {p.name}
                </Link>
              );
            })}
        </li>
        <li className="list-group-item">
          Shipping{' '}
          <span className="label label-default label-pill pull-xs-right">
            {shipping}
          </span>
        </li>
        <li className="list-group-item">
          Color{' '}
          <span className="label label-default label-pill pull-xs-right">
            {color}
          </span>
        </li>
        <li className="list-group-item">
          Stok Available{' '}
          <span className="label label-default label-pill pull-xs-right">
            {quantity}
          </span>
        </li>
        <li className="list-group-item">
          Sold{' '}
          <span className="label label-default label-pill pull-xs-right">
            {sold}
          </span>
        </li>
      </ul>
    </>
  );
}

export default ProductListItems;
