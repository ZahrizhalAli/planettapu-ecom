import React from 'react';
import UserNav from '../../components/nav/UserNav';
function History() {
  return (
    <>
      <div class="main">
        <div class="container-fluid">
          {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div class="row margin-bottom-40">
            {/* <!-- USER NAV --> */}
            <UserNav />
            <div class="col-md-9 col">
              <h1>My Account Page</h1>
              <div class="content-page">History page</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
