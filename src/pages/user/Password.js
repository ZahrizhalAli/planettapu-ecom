import React, { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";

function Password() {
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        toast.dark(`Password updated!`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  return (
    <>
      <div class="main">
        <div class="container-fluid">
          {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div class="row margin-bottom-40">
            {/* <!-- USER NAV --> */}
            <UserNav />
            <div class="col-md-9 col-sm-7">
              <h1>My Account Page</h1>
              <div class="content-page">
                <div class="card card-signin my-5">
                  <div class="card-body col">
                    <form class="form-signin" onSubmit={handleSubmit}>
                      <label for="inputEmail">New Password</label>
                      <input
                        size="50"
                        type="password"
                        id="inputEmail"
                        class="form-control"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        autofocus
                      />
                      <button
                        class="btn btn-md btn-signin btn-block"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!password || password.length < 6}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Password;
