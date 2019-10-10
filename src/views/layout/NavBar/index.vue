<template>
    <div class="navbar">
        <!-- <router-link to="/home">Home</router-link> | <router-link to="/about">About</router-link> |
        <router-link to="/demo">demo</router-link> -->
        <el-dropdown>
            <span class="el-dropdown-link">{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
    name: 'navbar',
    computed: {
        user() {
            return this.$store.getters.user;
        }
    }
};
</script>
<style lang="scss" scoped>
.navbar {
    text-align: right;
}
</style>