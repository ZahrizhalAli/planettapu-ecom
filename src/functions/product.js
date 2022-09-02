import axios from 'axios';

export const createProduct = async (products, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/product`,
    products,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getProductsByCount = async (count) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/products/${count}`
  );
};

export const removeProduct = async (slug, authtoken) => {
  await axios.delete(`${process.env.REACT_APP_BACKEND_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};
