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
