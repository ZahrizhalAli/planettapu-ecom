import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

//functions
import { createOrUpdateUser } from "../../functions/auth";
function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  //spread operator
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  //redirect user to home after logged in
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [user, history]);

  async function handleSubmit(e) {
    //prevent page from refreshing
    e.preventDefault();
    // setLoading(true);
    if (!email || !password) {
      toast.error("Email and Password are required.");
      //prevent next code from executed
      return;
    }
    //check if password is less than 6 characters
    if (password.length < 6) {
      toast.error(
        `May God have mercy on your account. What a weak password...`
      );
      return;
    }

    try {
      const localURL = window.localStorage.href;
      const result = await auth.signInWithEmailLink(email, localURL);
      //check if user is verified
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch();
        history.push("/");
        toast.dark("Registration success! Happy shopping ;)");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("This link is no longer available. Please register back.");
    }
    // setLoading(false);
  }

  return (
    <div class="container auth-container">
      <div class="row auth-container-register">
        <div class="col col-md-8">
          <div class="card card-signin my-5">
            <div class="card-body col">
              <h1 class="card-title text-center">Registration Form</h1>
              <form class="form-signin" onSubmit={handleSubmit}>
                <label for="inputEmail">Email address</label>

                <input
                  size="50"
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Email address"
                  value={email}
                  disabled
                  required
                  autofocus
                />
                <label for="inputPassword">Password</label>

                <input
                  size="50"
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  required
                />

                <button
                  class="btn btn-md btn-dark btn-register-complete"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Complete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
