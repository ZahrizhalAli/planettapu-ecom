import axios from "axios";

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
