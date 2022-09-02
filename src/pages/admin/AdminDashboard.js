import React, { useEffect, useState, lazy, Suspense } from 'react';
const AdminNav = lazy(() => import('../../components/nav/AdminNav'));

function AdminDashboard() {
  return (
    <>
      <Suspense fallback={null}>
        <div class="main">
          <div class="container-fluid">
            {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
            <div class="row margin-bottom-40">
              {/* <!-- USER NAV --> */}
              <AdminNav />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default AdminDashboard;
