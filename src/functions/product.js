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

export const getProduct = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/product/${slug}`
  );
};

export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );
};

// FOR HOMEPAGE
export const getProducts = async (sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_API}/products/`, {
    sort,
    order,
    page,
  });
};

export const getProductsCount = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/products/total/`
  );
};
