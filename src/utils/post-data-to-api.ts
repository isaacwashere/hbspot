import axios from "axios";
import { POST_API_URL } from "../constants";

export const postDataToAPI = async (data: any) => {
  try {
    const res = await axios.post(POST_API_URL, { data });
    console.log("POST", res);
  } catch (e) {
    console.error("Error posting data");
  }
};
