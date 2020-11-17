import axios from "axios";
import { GET_API_URL } from "../constants";

export const getDataFromAPI = async () => {
  try {
    const res = (await axios.get(GET_API_URL)) as any;
    if (!res) throw new Error("Data not found");
    return res.data;
  } catch (e) {
    console.error("Error getting data");
  }
};
