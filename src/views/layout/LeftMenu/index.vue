<template>
    <el-menu
        :default-active="openIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right: none"
        :unique-opened="true"
    >
        <!-- <el-menu-item index="1" style="text-align:center">logo</el-menu-item> -->
        <!-- <router-link to="/home">
            <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <template slot="title">
                    <span>1-入门demo</span>
                </template>
            </el-menu-item>
        </router-link> -->
        <!-- <router-link to="/about">
            <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">群组管理</span>
            </el-menu-item>
        </router-link> -->
        <el-submenu :index="types['LAYOUT']">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>three.js快速入门</span>
            </template>
            <router-link to="/home">
                <el-menu-item :index="types['LAYOUT_HOME']">
                    <template slot="title">
                        <span>1.第一个3D场景</span>
                    </template>
                </el-menu-item>
            </router-link>
            <router-link to="/box-geometry">
                <el-menu-item :index="types['LAYOUT_BOX_GEOMETRY']">2.立方体旋转动画</el-menu-item>
            </router-link>

            <router-link to="/controls">
                <el-menu-item :index="types['LAYOUT_CONTROLS']">3.鼠标操作3维场景缩放</el-menu-item>
            </router-link>
        </el-submenu>
    </el-menu>
</template>
<script>
import * as types from '@/router/routetypes';
export default {
    name: 'left-menu',
    data() {
        return {
            types
        };
    },
    computed: {
        openIndex() {
            // https://element.eleme.cn/#/zh-CN/component/menu
            return this.$route.meta.index || this.$route.name;
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>
<style >
a {
    text-decoration: none; /* 解决click出现下划线bug */
}
</style>