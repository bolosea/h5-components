import * as __URL__ from '../../../config/index';
import * as Util from '../../util/index';

export default async (args) => {
  //判断当前环境
  let ENV = Util.getEnv();
  let params = args.type.toUpperCase() === 'GET' ? null : args.param;
  let url = args.type.toUpperCase() === 'GET' ? Util.createUrl(args) : args.url;
  let requestUrl = __URL__[ENV]['apiUrl'] + url;
  if(args.isPreview){
      requestUrl = __URL__[ENV]['apiPreviewUrl'] + __URL__[ENV]['previewFilterUrl'] + url;
  }
  if (args.isAuth) {
    const configURL = require('bnq-json');
    if (ENV === 'production') {
      requestUrl = configURL[ENV]['newAuthUrl'] + __URL__[ENV]['authUrlFilter'] + url
    } else {
      requestUrl = configURL[ENV]['authUrl'] + __URL__[ENV]['authUrlFilter'] + url
    }
    
  }
  let token = Util.getCookie('sessionToken');
  let headers = {
    'Accept': 'application/json',
    'Content-Type': args.contentType || 'application/json'
  }
  if(token) {headers['sessionToken'] = token}

    return fetch(requestUrl, {
    credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
    method: args.type.toUpperCase(),
    follow: 1,
    timeout: 10000,
    headers: headers,
    body: params ? JSON.stringify(params) : null
  }).then((response) => response.json());
}
