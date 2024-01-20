import axios from "axios";

export const paymentToken = async (url) => {
  const res = await axios.get(url);
  return res;
};
