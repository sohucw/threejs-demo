<template>
    <div id="home" ref="home-dom">
        {{ mydom }}
    </div>
</template>
<script>
import * as THREE from 'three';
import {getStyles} from '@/utils/utils';
// const OrbitControls = require('three-orbit-controls')(THREE);
export default {
    name: 'home',
    data() {
        return {
            mydom: ''
        };
    },
    mounted() {
        // 获取dom
        const homeDom = this.$refs['home-dom'];
        // 获取渲染区宽度
        const width = Number.parseInt(getStyles(homeDom, 'width'));
        const height = Number.parseInt(getStyles(homeDom, 'height'));
        // 创建场景
        const scene = new THREE.Scene();
        // 创建透视摄像机
        const camera = new THREE.PerspectiveCamera(75, width / width, 0.1, 1000);
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        // 设置渲染器的大小
        renderer.setSize(width, width);
        // 将渲染器添加到对应的dom中
        homeDom.appendChild(renderer.domElement);

        // 创建一个长宽高都为1个单位的立方体
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // 创建材质，对光照无感
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        // 创建一个立方体网格（mesh）将材质包裹在立方体上
        const cube = new THREE.Mesh(geometry, material);
        // 将立方体网格添加到场景中
        scene.add(cube);

        // 指定相机的位置
        camera.position.z = 5;
        const animate = function() {
            // 让浏览执行参数中函数，不断循环（浏览器的一个新的api）
            requestAnimationFrame(animate);

            // 让立方体动起来
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景
            renderer.render(scene, camera);
        };

        animate();
    }
};
</script>
<style lang="scss">
.home-dom {
    height: 100%;
}
</style>