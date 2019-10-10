const getters = {
    isAutnenticated: state => state.user.isAutnenticated, // 用户是否授权
    user: state => state.user.user // 用户信息
};
export default getters;
