import axios from "axios";

const instance = axios.create({
  baseURL: "https://fest-lb.bibim-bap.com/",
});

export default instance;
