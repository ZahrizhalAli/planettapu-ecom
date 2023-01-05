import axios from 'axios';

export const getCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/coupons`);
};

export const removeCoupons = async (couponId, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/coupon/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCoupons = async (coupon, authtoken) => {
  return (
    await axios.post(`${process.env.REACT_APP_BACKEND_API}/coupon`),
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};
