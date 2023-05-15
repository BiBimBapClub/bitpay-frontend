import axios from "axios";

const instance = axios.create({
  baseURL: "https://fest-lb.bibim-bap.com/",
  timeout: 30000,
});

export default instance;
