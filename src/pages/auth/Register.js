import React, { useState, useEffect } from "react";

//auth from firebase
import { auth } from "../../firebase.js";
//toastify
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Register({ history }) {
  const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);

  //
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
  //
  async function handleSubmit(e) {
    //prevent web from refreshing
    e.preventDefault();
    // setLoading(true);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    //send sign in link to registered email
    await auth.sendSignInLinkToEmail(email, config);
    //show toast when succeeded
    toast.dark(`Email sent! Click link on your email for activation`);
    //show user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
    // setLoading(false);
  }

  return (
    <>
      <div class="container-fluid">
        <div class="row auth-container-register">
          <div class="col col-md-8 ">
            <div class="card card-signin auth-right ">
              <div class="card-body col">
                <h1 class="card-title text-center">Sign Up</h1>
                <form class="form-signin" onSubmit={handleSubmit}>
                  <label for="inputEmail">Email address</label>

                  <input
                    size="50"
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="ex. harrypotter@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    autoFocus
                  />
                  <p
                    className="p-2"
                    style={{ fontSize: "0.7rem", color: "grey" }}
                  >
                    Enter your email to get verified and logged in. We will
                    never share your email with anyone else.
                  </p>
                  <button
                    class="btn btn-sm btn-email btn-dark "
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <i class="fas fa-user-plus"></i> Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
