import React from 'react';
import ModalImage from 'react-modal-image';
import contoh from '../../contoh.jpg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function ProductCardInCheckout({ p }) {
  let dispatch = useDispatch();
  const colors = [
    'Black',
    'Blue',
    'Red',
    'White',
    'Space Grey',
    'Gray',
    'Yellow',
    'Green',
    'Navy',
  ];

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      // save again in local storage after change
      localStorage.setItem('cart', JSON.stringify(cart));

      // save in redux
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    // make sure the quantity does not over the available quantity
    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }
    console.log('test');
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };
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
      <td>
        <select
          name="color"
          className="form-control"
          onChange={handleColorChange}
        >
          {p.color ? (
            <option value={p.color}>{p.color}</option>
          ) : (
            <option>Select</option>
          )}
          {colors
            .filter((c) => c !== p.color)
            .map((c, i) => (
              <option value={c} key={i}>
                {c}
              </option>
            ))}
        </select>
      </td>
      <td className="text-center">
        <input
          type="number"
          className="form-control"
          value={p.count}
          onChange={handleQuantityChange}
        />
      </td>
      <td>{p.shipping}</td>
      <td>Icon Remove</td>
    </tr>
  );
}

export default ProductCardInCheckout;
