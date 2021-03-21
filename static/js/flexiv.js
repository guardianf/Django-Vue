function navigateTo(page, token) {
  if (!token) {
    token = getURLParameter('token');
  }
  location.href = page + (token ? `?token=${token}` : '');
}

function getURLParameter(key) {
  let ret = '';
  const search = location.search.slice(1)
  if (search) {
    const params = search.split('&')
    for (var i = 0; i < params.length; i++) {
      const reg = /([^=]{1,})=([^#]{1,})/g
      const paramArray = reg.exec(params[i])
      if (paramArray && key == paramArray[1]) {
        ret = paramArray[2]
      }
    }
  }
  return ret;
}
