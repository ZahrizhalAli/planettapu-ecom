import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ForgotPassword({ history }) {
  const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);
  //redirect user in case they type manual url in url box
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
  async function handleForgotSubmit(e) {
    e.preventDefault();
    // setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        // setLoading(false);
        toast.success("Password recovery link sent to your email!");
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  }
  return (
    <>
      <div class="container auth-container">
        <div class="row">
          <div class="col col-lg-12 ">
            <div class="card card-signin my-5">
              <div class="card-body col">
                <h1 class="card-title text-center">Forgot Password?</h1>
                <form class="form-signin" onSubmit={handleForgotSubmit}>
                  <label for="inputEmail">Email address</label>
                  <input
                    size="50"
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    autofocus
                  />
                  <button
                    class="btn btn-md btn-signin btn-block"
                    type="submit"
                    onClick={handleForgotSubmit}
                  >
                    Register
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

export default ForgotPassword;
