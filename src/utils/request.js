import axios from 'axios';
import router, {resetRouter} from '@/router/index';

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
});

// 请求拦截  设置统一header
service.interceptors.request.use(
    config => {
        // if (localStorage.accessToken && localStorage.clientId) {
        //     config.headers['Access-Token'] = localStorage.accessToken;
        //     config.headers['Client-Id'] = localStorage.clientId;
        // }
        return config;
    },
    error => {
        const {status} = error.response;
        if (status === 401) {
            // coding ...

            // 重置路由
            resetRouter();

            // 页面跳转
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

// 响应拦截  401 token过期处理
service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 错误提醒
        const {status} = error.response || {};
        if (status === 401) {
            // coding ...

            // 重置路由
            resetRouter();

            // 页面跳转
            router.push('/login');
        }

        return Promise.reject(error);
    }
);

export default service;
