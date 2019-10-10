<template>
    <el-container class="layout">
        <el-aside :width="variables.sideBarWidth">
            <LeftMenu class="layout-leftmenu"></LeftMenu>
        </el-aside>
        <el-container>
            <!-- <el-header>
                <NavBar></NavBar>
            </el-header> -->
            <el-main style="padding: 0">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import variables from '@/styles/variables.scss';
import LeftMenu from './LeftMenu/index';
// import NavBar from './NavBar/index';
export default {
    name: 'layout',
    components: {
        LeftMenu
    },
    data() {
        return {
            variables
        };
    }
};
</script>
<style lang="scss">
.layout {
    height: 100%;
    .layout-leftmenu {
        height: 100%;
        background-color: skyblue;
    }
}
// .el-menu {
//     border-right: none !important;
// }
.el-main {
    padding: 0;
}
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>