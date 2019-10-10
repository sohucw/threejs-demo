import request from '@/utils/request';

// 登录 => 提交表单
export function postLogin(data) {
    return request({method: 'post', url: '/sessions/', data});
}

// 退出
export function deleteLogout() {
    return request({method: 'delete', url: '/sessions/'});
}
