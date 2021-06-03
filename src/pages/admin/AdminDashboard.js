import React, { lazy, Suspense } from "react";
const AdminNav = lazy(() => import("../../components/nav/AdminNav"));
function History() {
  return (
    <>
      <Suspense fallback={null}>
        <div class="main">
          <div class="container-fluid">
            {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
            <div class="row margin-bottom-40">
              {/* <!-- USER NAV --> */}
              <AdminNav />

              <div class="col-md-9 col-sm-7">
                <h1>Admin Dashboard</h1>
                <div class="content-page">
                  Welcome admin. Check this news and our new blogs to help you
                  through and start making more money during this ramadhan.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default History;
