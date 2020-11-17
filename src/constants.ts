import dotenv from "dotenv";

const env = process.env.NODE_ENV;
if (env !== "production") {
  dotenv.config();
}

export const TOKEN = process.env.REACT_APP_MY_TOKEN || "";
export const GET_API_URL = `https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=${TOKEN}`;
export const POST_API_URL = `https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=${TOKEN}`;
