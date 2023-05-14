import axios from "axios";

const instance = axios.create({
  baseURL: "http://fest-api.bibim-bap.com/",
});

export default instance;
