import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
function Cart({ history }) {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderToDB = () => {
    //
    alert('Save order to db');
    history.push('/checkout');
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((c, i) => (
            <ProductCardInCheckout key={i} p={c} />
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-md-8">
            <h4>{cart.length} products in Cart</h4>

            {!cart.length ? (
              <h4>
                No products in cart. <Link to="/shop">Shop now!</Link>
              </h4>
            ) : (
              showCartItems()
            )}
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <hr />
            <p>Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = Rp.{c.price * c.count}
                </p>
              </div>
            ))}
            <hr />
            Total : <b>Rp. {getTotal()}</b>
            <hr />
            {user ? (
              <button
                onClick={saveOrderToDB}
                disabled={!cart.length}
                className="btn btn-sm btn-primary mt-2"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button className="btn btn-sm btn-primary mt-2">
                <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
                  Login to Checkout
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
