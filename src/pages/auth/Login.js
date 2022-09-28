import React, { useState, useEffect } from 'react';
import { auth, googleFirebaseAuth } from '../../firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";

//functions
import { createOrUpdateUser } from '../../functions/auth';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);

  //redux
  let dispatch = useDispatch();
  //redirect user from accessing login page after logged in
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [user, history]);
  //roleBasedRedirect();
  function roleBasedRedirect(res) {
    // check if there is an intended routes
    let intended = history.location.state; // check previous URL's visited
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/history');
      }
    }
  }

  //login with google
  async function handleGoogleLogin(e) {
    e.preventDefault();

    auth
      .signInWithPopup(googleFirebaseAuth)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch();
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setPassword('');
      });
  }

  //login with email and password
  async function handleLoginSubmit(e) {
    e.preventDefault();
    // setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      //createOrUpdate API
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data.id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch();

      //redirect back to home
      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      // setLoading(false);
      setPassword('');
    }
  }

  return (
    <>
      <div class="container-fluid">
        <div class="row auth-container">
          <div className="col-md-6 auth-left"></div>
          <div class="col-md-6 ">
            <div class="card card-signin auth-right ">
              <div class="card-body col">
                <h1 class="card-title text-center">Sign In</h1>
                <form class="form-signin" onSubmit={handleLoginSubmit}>
                  <label for="inputEmail">Email address</label>

                  <input
                    size="50"
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="ex. voldemort99@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    autoFocus
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
                    placeholder="Enter password"
                    required
                    autoFocus
                  />

                  <button
                    class="btn btn-sm btn-email btn-secondary "
                    type="submit"
                    onClick={handleLoginSubmit}
                  >
                    <i class="far fa-envelope"></i> Sign In with Email
                  </button>
                  <hr class="my-4" />
                </form>
                <button
                  class="btn btn-sm btn-google btn-raised btn-info"
                  type="submit"
                  onClick={handleGoogleLogin}
                >
                  <i class="fab fa-google"></i> Sign In with Google
                </button>
                <p className="text-center p-2">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-danger auth-link">
                    Register here.
                  </Link>
                </p>
                <p className="text-center ">
                  <Link to="/forgot/password" className="text-danger auth-link">
                    Forgot Password?.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
