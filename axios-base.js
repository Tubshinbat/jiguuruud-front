import axios from "axios";

const instance = axios.create({
  baseURL: "https://jiguur.mn/api/",
});

instance.defaults.withCredentials = true;

export default instance;
