import axios from "axios";

const instance = axios.create({
  baseURL: "http://117.16.137.229:8080/", // TBD: "https://fest-api.bibim-bap.com/"
});

export default instance;
