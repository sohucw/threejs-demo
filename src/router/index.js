import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/index';
import Demo from '@/views/demo/index';
import BoxGeometry from '@/views/home/box-geometry';
import Controls from '@/views/home/controls';
import Layout from '@/views/layout/index';
import Nofind from '@/views/nofind/index';
import * as types from '@/router/routetypes';
Vue.use(Router);

// 创建路由实例
const createRouter = () =>
    new Router({
        // mode: 'hash',
        mode: 'history',
        base: process.env.publicPath,
        routes: [
            {
                path: '/',
                redirect: '/layout'
            },
            {
                path: '/layout',
                name: types['LAYOUT'],
                component: Layout,
                redirect: '/home',
                children: [
                    {
                        path: '/home',
                        name: types['LAYOUT_HOME'],
                        component: Home
                    },
                    {
                        path: '/demo',
                        name: types['LAYOUT_DEMO'],
                        component: Demo,
                        meta: {
                            index: ''
                        }
                    },
                    {
                        path: '/box-geometry',
                        name: types['LAYOUT_BOX_GEOMETRY'],
                        component: BoxGeometry,
                        meta: {
                            index: ''
                        }
                    },
                    {
                        path: '/controls',
                        name: types['LAYOUT_CONTROLS'],
                        component: Controls,
                        meta: {
                            index: ''
                        }
                    },
                    {
                        path: '/about',
                        name: 'about',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import(
                                /* webpackChunkName: "about" */ '@/views/about/index'
                            ),
                        meta: {
                            index: ''
                        }
                    }
                ]
            },
            {path: '*', name: '/404', component: Nofind}
        ],
        scrollBehavior: () => ({y: 0})
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
