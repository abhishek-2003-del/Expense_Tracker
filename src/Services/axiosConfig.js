import axios from "axios";

const axiosConfig = (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data: data
  });
};

export default axiosConfig;
