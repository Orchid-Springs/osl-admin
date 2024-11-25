import axios from "axios";

export const api = axios.create({
  baseURL: "https://walrus-app-pjfrz.ondigitalocean.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
