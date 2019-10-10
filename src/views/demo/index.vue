<template>
    <div class="demo">
        <h3>{{ user }}</h3>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import {postLogin} from '@/api/login';
export default {
    name: 'demo',
    components: {},
    filters: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['user'])
    },
    watch: {},
    created() {
        // 登录
        // postLogin();

        setTimeout(() => {
            const newUser = {
                name: 'henry',
                avatar: 'demo'
            };
            this.setUser(newUser);
        }, 1000);
    },
    mounted() {},
    beforeDestroy() {
        // this.clearCurrentState();
    },
    methods: {
        ...mapActions({
            setUser: 'user/setUser',
            clearCurrentState: 'user/clearCurrentState'
        })
    }
};
</script>
<style lang="scss" scoped>
.demo-container {
    background-color: skyblue;
    color: #fff;
    height: 50vh;
}
</style>