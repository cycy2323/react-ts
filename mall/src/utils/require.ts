import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import * as qs from 'qs';
import { sessionStorageGet } from '@/utils/regular'
/**
 * 处理响应数据
 * @param res
 */
function processResponse(res: any) {
  try {
    if (res.response) {
      const { response } = res;
      return { data: response };
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * @param  {string} url
 * @param  {object} options
 * @returns Observable
 */
function request(options: any): Observable<any> {
  const token = (sessionStorageGet('login', '') && sessionStorageGet('login', '').token) || '';
  const headers: any = {
    // 'hq_deviceId': 1212,
    'hq_source': 2,
    // Accept: 'application/json',
    'client-type': 'web',
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'If-None-Match': false
    'Cache-Control': 'no cache',
    'Authorization': token
  }
  if (token) headers.token = token;
  const requestOptions: any = {
    headers,
    ...options,
    timeout: 30000
  };


  return ajax(requestOptions).pipe(
    map(processResponse),
    catchError(err => {
      const errStr = JSON.stringify(err);

      console.error(err);
      if (errStr.indexOf('timeout') >= 0) {
        // 直接使用域名请求的接口不提示网络超时
        if (!/\w+\.\w+\.(com|cn|net|org)/.test(requestOptions.url)) {
          alert('网络超时, 请重试');
        }

        return of(null);
      }
      if (err.status) {
        alert(`网络异常：${err.status}`);
      }
      return of(null);
    })
  );
}

interface RequireOpt {
  url: string;
  method: string;
  body?: any;
}

/**
 * 地址栏参数
 * @param url
 * @param method
 * @param params
 */
function queryParams(url: string, method: string, params?: any): RequireOpt {
  return {
    url: `${url}?${qs.stringify(params ? params : {})}`,
    method
  };
}

/**
 * body参数
 * @param url
 * @param method
 * @param params
 */
function bodyParams(url: string, method: string, params: any): RequireOpt {
  return {
    url,
    method,
    body: method === 'GET' ? qs.stringify(params) : params
    // body: qs.stringify(params)
  };
}

/**
 * GET请求通用方法
 * @param url
 * @param params
 */
export const get = (url: string, params?: any): Observable<any> => {
  return request(queryParams(url, 'GET', params));
};

/**
 * POST请求通用方法
 * @param url
 * @param params
 */
export const post = (url: string, params: any): Observable<any> => {
  return request(bodyParams(url, 'POST', params));
};

/**
 * PUT请求通用方法
 * @param url
 * @param params
 */
export const put = (url: string, params: any): Observable<any> => {
  return request(bodyParams(url, 'PUT', params));
};

/**
 * DELETE请求通用方法
 * @param url
 * @param params
 */
export const deleted = (url: string, params: any): Observable<any> => {
  return request(queryParams(url, 'DELETE', params));
};
