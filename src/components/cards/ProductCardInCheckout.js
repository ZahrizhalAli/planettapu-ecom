import React from 'react';
import ModalImage from 'react-modal-image';
import contoh from '../../contoh.jpg';
function ProductCardInCheckout({ p }) {
  return (
    <tr>
      <td>
        <div style={{ width: '100px', height: 'auto' }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} alt={p.images[0].url} />
          ) : (
            <ModalImage small={contoh} large={contoh} alt={p.slug} />
          )}
        </div>
      </td>
      <td>{p.title}</td>
      <td>{p.price}</td>
      <td>{p.color}</td>
      <td>{p.count} items</td>
      <td>{p.shipping}</td>
      <td>Icon Remove</td>
    </tr>
  );
}

export default ProductCardInCheckout;
