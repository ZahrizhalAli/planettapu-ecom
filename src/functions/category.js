import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/category/${slug}`
  );
};

export const removeCategory = async (slug, authtoken) => {
  await axios.delete(`${process.env.REACT_APP_BACKEND_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/category`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
};

//fetch subs based on category , subs has parent from category ObjectId
export const getSubs = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/category/subs/${_id}`
  );
};
