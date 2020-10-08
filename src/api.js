import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "df4c1ff21ed5ce7bc83e2f373f66ff0e",
    language: "en-US"
  }
});

export default api;
