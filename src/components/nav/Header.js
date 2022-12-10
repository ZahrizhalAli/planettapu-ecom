import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../forms/Search';
import firebase from 'firebase';
import { ShopOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

function Header() {
  let history = useHistory();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  function logout() {
    //sign out user from firebase
    firebase.auth().signOut();
    //dispatch state
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });

    history.push('/login');
  }
  return (
    <>
      <div className="header-blue">
        <nav class="navbar navbar-expand-lg navbar-light ">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <Link class="navbar-brand" to="/">
              Navbar
            </Link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {user && (
                  <>
                    <li class="nav-item dropdown">
                      <Link
                        class="nav-link "
                        to="/"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="far fa-user nav-icon"></i>
                      </Link>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        {user && user.role === 'admin' && (
                          <>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/admin/dashboard"
                              >
                                {user.email.split('@')[0]}
                              </Link>
                            </li>
                            <li>
                              <hr class="dropdown-divider" />
                            </li>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/admin/dashboard"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/admin/orders"
                              >
                                Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/admin/product"
                              >
                                Products
                              </Link>
                            </li>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/payment"
                              >
                                Payment
                              </Link>
                            </li>
                          </>
                        )}
                        {user && user.role === 'subscriber' && (
                          <>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/user/history"
                              >
                                {user.email.split('@')[0]}
                              </Link>
                            </li>
                            <hr class="dropdown-divider" />
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/user/history"
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/user/history"
                              >
                                History
                              </Link>
                            </li>
                            <li>
                              <Link
                                class="dropdown-item nav-link-dropdown"
                                to="/user/orders"
                              >
                                Orders
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </li>
                  </>
                )}
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to="/cart">
                    <i class="fas fa-shopping-bag nav-icon"></i>
                    <Badge count={cart.length} offset={[-4, -15]}></Badge>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/user/wishlist">
                    <i class="far fa-heart nav-icon"></i>
                  </Link>
                </li>
                <li class="nav-item ">
                  <Link className="nav-link" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    MAN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    WOMAN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    KIDS
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav ">
              <li className="nav-item float-right">
                <Search />
              </li>
              {user && (
                <li className="nav-item ">
                  <Link to="/login" onClick={logout} className="nav-link">
                    <i className="fas fa-sign-out-alt"></i>
                  </Link>
                </li>
              )}
              {!user && (
                <>
                  <li className="nav-item ">
                    <Link to="/login" className="nav-link">
                      <i className="fas fa-sign-in-alt"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Header;
