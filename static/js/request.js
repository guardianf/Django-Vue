/**
 * global handle request 
 */
axios.interceptors.request.use(config => {

  return config;
}, err => {
  return Promise.reject();
})

/**
 * global handle error and warning
 */
axios.interceptors.response.use(
  response => {
    res = response.data;
    let ret = {};
    let isSuccess = false;
    // error check
    switch(res.code) {
      case 401:
        Vue.prototype.$message({
          type: "error",
          message: "username or password error",
          duration: 2000,
        });
        break;
      case 200:
        isSuccess = true;
        ret = {
          code: res.code,
          data: res.data,
          msg: res.msg,
        };
        break;
      default:

    }
    if(isSuccess) {
      return Promise.resolve(ret);
    } else {
      return Promise.reject(ret);
    }
  },
  err => {
    return Promise.reject();
  }
)