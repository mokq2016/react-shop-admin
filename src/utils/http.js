import Axios from 'axios';
import config from "../config/config.js";

Axios.defaults.timeout = 45000; // 45s
Axios.defaults.baseURL = config.target;

// Add a request interceptor
Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config['Content-Type'] === 'application/x-www-form-urlencoded;') { //默认发application/json请求，如果application/x-www-form-urlencoded;需要使用transformRequest对参数进行处理
    /*config['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';*/
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    config['transformRequest'] = function(obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&")
    };
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data;
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        alert("404未找到请求的资源");
        break;
      default:
        alert('网络错误');
    }
  } else if (error instanceof Error) {
    console.error(error.message);
  } else {
    
  }
  return Promise.reject(error);
});

export default Axios;