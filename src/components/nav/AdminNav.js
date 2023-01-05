import React from 'react';
import { Link } from 'react-router-dom';

function AdminNav() {
  return (
    <>
      <div class="sidebar">
        <div
          class="d-flex p-3 alert alert-secondary"
          style={{ width: '280px' }}
        >
          <ul class="nav nav-pills flex-column mb-auto">
            <li>
              <Link to="/admin/dashboard" class="nav-link link-dark">
                <i class="fas fa-home icon-nav"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/product" class="nav-link link-dark">
                <i class="fas fa-table icon-nav"></i> Add Product
              </Link>
            </li>
            <li>
              <Link to="/admin/products" class="nav-link link-dark">
                <i class="fas fa-table icon-nav"></i> Products
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" class="nav-link link-dark">
                <i class="fas fa-comments-dollar icon-nav"></i> Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/category" class="nav-link link-dark">
                <i class="far fa-file-alt icon-nav"></i> Category
              </Link>
            </li>
            <li>
              <Link to="/admin/sub" class="nav-link link-dark">
                <i class="far fa-file icon-nav"></i> Sub Category
              </Link>
            </li>
            <li>
              <Link to="/admin/coupon" class="nav-link link-dark">
                <i class="fas fa-comments-dollar icon-nav"></i> Coupon
              </Link>
            </li>
            <li>
              <Link to="/admin/password" class="nav-link link-dark">
                <i class="fas fa-key icon-nav"></i> Password
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminNav;
