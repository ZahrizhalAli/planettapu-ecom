import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

function UserRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <div className="container p-5 text-center">
      <p>
        Please head over to <a href="/login">Login</a> page to be able to access
        this page.
      </p>
    </div>
  );
}

export default UserRoute;
