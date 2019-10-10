/**
 * @file userinfo
 * @author lishaohai
 */

import * as storetypes from '@/store/storetypes';
// 需要维护的状态
const state = {
    isAutnenticated: false, // 是否认证
    user: {
        name: 'henry',
        avatar: ''
    } // 存储用户信息
};

const mutations = {
    [storetypes.SET_IS_AUTNENTIATED](state, isAutnenticated) {
        if (isAutnenticated) {
            state.isAutnenticated = isAutnenticated;
        } else {
            state.isAutnenticated = false;
        }
    },
    [storetypes.SET_USER](state, user) {
        if (user) {
            state.user = user;
        } else {
            state.user = {};
        }
    }
};

const actions = {
    setIsAutnenticated: ({commit}, isAutnenticated) => {
        commit(storetypes.SET_IS_AUTNENTIATED, isAutnenticated);
    },
    setUser: ({commit}, user) => {
        commit(storetypes.SET_USER, user);
    },
    clearCurrentState: ({commit}) => {
        commit(storetypes.SET_IS_AUTNENTIATED, false);
        commit(storetypes.SET_USER, null);
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
