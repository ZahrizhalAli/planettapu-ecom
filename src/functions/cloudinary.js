import axios from 'axios';

export const uploadImages = async (uri, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/product/image`,
    uri,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeImage = async (public_id, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/product/image`,
    { public_id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
