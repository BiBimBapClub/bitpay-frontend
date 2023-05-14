import axios from "axios";

const instance = axios.create({
  baseURL: "https://fest-api.bibim-bap.com/",
});

export default instance;
