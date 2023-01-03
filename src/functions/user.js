import axios from 'axios';

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/cart`,
    {
      cart,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/user/cart`,
    {
      headers: {
        authtoken,
      },
    }
  );
};
