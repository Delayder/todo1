require("dotenv").config();
const { PUBLIC_URL, NODE_ENV } = process.env;

export const config = {
  GLOBAL_URL: PUBLIC_URL,
  env: NODE_ENV
};
