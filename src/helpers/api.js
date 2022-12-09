import axios from "axios";

export async function getDollarValue() {
  const res = await axios.get("https://dolar-api.vercel.app/",);
  const data = res.data?.data || {};

  return data;
}
