import React from "react";

function UserNav() {
  return (
    <>
      <div class="sidebar col-md-3 col-sm-12">
        <div class="d-flex flex-column p-3 bg-light" style={{ width: "280px" }}>
          <ul class="nav nav-pills flex-column mb-auto">
            <li>
              <a href="/user/history" class="nav-link link-dark">
                <i class="fas fa-history icon-nav"></i> History
              </a>
            </li>
            <li>
              <a href="/user/password" class="nav-link link-dark">
                <i class="fas fa-key icon-nav"></i> Password
              </a>
            </li>
            <li>
              <a href="/admin/orders" class="nav-link link-dark">
                <i class="fas fa-cart-plus icon-nav"></i> Cart
              </a>
            </li>
            <li>
              <a href="/admin/orders" class="nav-link link-dark">
                <i class="fas fa-search-dollar icon-nav"></i> Payment
                Confirmation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserNav;
