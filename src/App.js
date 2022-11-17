import React, { useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './css/style.css';

//toasitify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
//functions
import { currentUser } from './functions/auth';
//pages -> auth
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const RegisterComplete = React.lazy(() =>
  import('./pages/auth/RegisterComplete')
);

const History = React.lazy(() => import('./pages/user/History'));
//components/routes
const UserRoute = React.lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = React.lazy(() => import('./components/routes/AdminRoute'));

const CategoryCreate = React.lazy(() =>
  import('./pages/admin/category/CategoryCreate')
);
const CategoryUpdate = React.lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
);

//pages/user
const Wishlist = React.lazy(() => import('./pages/user/Wishlist'));
const Password = React.lazy(() => import('./pages/user/Password'));
//pages/admin
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));

const CreateSub = React.lazy(() => import('./pages/admin/sub/CreateSub'));
const UpdateSub = React.lazy(() => import('./pages/admin/sub/UpdateSub'));
//pages
const Home = React.lazy(() => import('./pages/Home'));
const ProductsHomepage = React.lazy(() => import('./pages/ProductsHomepage'));
//components/nav & /footer
const Header = React.lazy(() => import('./components/nav/Header'));
const Footer = React.lazy(() => import('./components/footer/Footer'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
//products
const CreateProduct = React.lazy(() =>
  import('./pages/admin/products/CreateProduct')
);
const UpdateProduct = React.lazy(() =>
  import('./pages/admin/products/UpdateProduct')
);
const Products = React.lazy(() => import('./pages/admin/products/Products'));
const CategoryHome = React.lazy(() => import('./pages/category/CategoryHome'));
const SubHome = React.lazy(() => import('./pages/sub/SubHome'));
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            if (res.data) {
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
            } else {
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  name: user.name,
                  email: user.email,
                  token: idTokenResult.token,
                  role: user.role,
                  _id: user._id,
                },
              });
            }
          })
          .catch();
      }
    });

    //clean up
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Suspense fallback={null}>
        <Header />
        <ToastContainer />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:slug" component={ProductsHomepage} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/subs/:slug" component={SubHome} />

          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          {/* ADMIN PROTECTED ROUTE */}
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={CategoryUpdate}
          />

          <AdminRoute exact path="/admin/sub" component={CreateSub} />
          <AdminRoute exact path="/admin/sub/:slug" component={UpdateSub} />

          <AdminRoute exact path="/admin/product" component={CreateProduct} />
          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={UpdateProduct}
          />

          <AdminRoute exact path="/admin/products" component={Products} />
        </Switch>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
