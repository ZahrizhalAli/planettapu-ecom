import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";

function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });
  return ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <div className="container p-5 text-center">
      <p>
        Only admin has the authority to access this page. You are an admin?{" "}
        <a href="/login">Login</a> here.
      </p>
    </div>
  );
}

export default AdminRoute;
