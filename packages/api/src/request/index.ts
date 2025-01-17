import axios, { AxiosResponse } from "axios";

axios.defaults.timeout = 30000;

// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};

// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.defaults.baseURL = "https://api.geckoterminal.com/api/v2";

// HTTPresponse拦截
axios.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error(error));
  },
);

export default axios;
