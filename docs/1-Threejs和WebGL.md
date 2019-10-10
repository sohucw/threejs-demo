# 什么是 WebGL

WebGL （全写 Web Graphics Library）是一种 3D 绘图协议，
这种绘图技术标准允许把 JavaScript 和 OpenGL ES 2.0
（OpenGL for Embedded Systems，
OpenGL 嵌入式版本，针对手机、游戏机等设备相对较轻量级的版本）结合在一起，
通过增加 OpenGL ES 2.0 的一个 JavaScript 绑定，
WebGL 可以为 HTML5 Canvas 提供硬件 3D 加速渲染，
这样 Web 开发人员就可以借助系统显卡来在浏览器更流畅地展示 3 场景和模型了，
还能创建复杂的导航和数据视觉化。

## Three.js

Three.js 是 WebGL 的 JavaScript 3D 库，其对 WebGL 提供的接口进行了非常好的封装，
简化了很多细节，大大降低了学习成本，称为前端开发者完成 3D 绘图的得力工具。

```js
three.js
    Camera - 相机
    Renderers - 渲染器
        shaders
    Scenes - 场景屏幕

    Lights - 光线
        Shadows - 阴影
    Geometries - 几何图形
    Materials - 材质
    Objects - 图形对象
    Loaders - 加载器
        Managers
    Textures - 纹理

    Animation - 动画
        Tracks
    Audio - 声音

    Math - 数学库
        Interpolants - 插值
    Extras - 附件
        Core
        Curves
        Helpers
        Objects
    Constant - 常量
    core - 核心
        BufferAttribute

```

### three.js 三大组件（场景-scene，相机-camera，渲染器-renderer）

场景 Scene
场景是所有物体的容器，场景只有一种。
场景的构造函数是：

```js
const scene = new THREE.Scene();
```

照相机（Cameras）
定义了三维空间到二维屏幕的投影方式，投影方式主要分为正交投影和透视投影。

1. 正交投影：正交投影照相机获得的结果对于在三维空间内平行的线，投影到二维空间中也是一定平行的。

2. 透视投影：透视投影照相机获得的结果是类似人眼在真是世界中看到的有“近大远小”的效果。

![政教投影 && 透视投影 图片](https://user-gold-cdn.xitu.io/2018/9/18/165ea904acd7821e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

一般来说，对于制图、建模软件通常使用正交投影，这样不会因为投影而改变物体比例；而对于其他大多数应用，通常使用透视投影，
因为这更接引人眼的观察效果，以下详细介绍透视投影。

透视投影照相机。（Perspective Camera）的构造函数是：

```js
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

让我们通过一张透视照相机投影的图来了解这些参数。

![透视图， 侧视图](https://user-gold-cdn.xitu.io/2018/9/18/165ea912e406a307?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

透视图中，灰色的部分是视景体，是可能被渲染的物体所在的区域，在该视景体以外的物体将不会被渲染

-   `fov`: 是视景体竖直方向上的张角（是角度制而非弧度制）
-   `aspect`: 等于 `width/height`，是照相机水平方向和竖直方向长度的比值，通常设为 Canvas 的横纵比例。
-   `near`: 照相机到视景体最近的距离，为正值。
-   `far`: 照相机到视景体最远的距离，为正值。

渲染器（Renderers）
渲染器的作用就是讲相机拍摄出的画面在浏览器中呈现出来。
渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制。
three.js 中有很多中类似的渲染器，
例如：webGLRenderer、canvasRenderer、SVGRenderer，通常使用的是 webGLRenderer 渲染器。

webGLRenderer 渲染器的构造函数是：

```js
const renderer = new THREE.WebGLRenderer();
```

创建完渲染器之后，需要调用 render 方法将之前创建好的场景和相机结合渲染出来，即调用渲染的 render 方法

```js
renderer.render(scene, camera);
```

---

了解了 three.js 完成 3D 绘图的三大要素之后，便可以在页面中创建场景，并利用相机将场景渲染到网页上。

首先需要下载 three.js 库，并引用到自己代码中，以下为三种引入方式，选择合适的方式在自己的项目中。

```js
<script src="lib/three.js"></script>  //ES5

const THREE=require（'three'） //CommonJS/AMD
import \* as THREE from 'three' //ES6
```

```js
// 创建场景
const scene = new THREE.Scene();

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 创建一个 WebGL渲染器
const renderer = new THREE.WebGLRenderer({
    alpha: true // 默认情况下为黑色场景，此处设置为透明（即白色场景）
});

// 设置渲染器为全屏
renderer.setSize(window.innerWidth, window.innerHeight);

// 添加到网页中
document.body.appendChild(renderer.domElement);
```

完成上术各个步骤之后，我们在网页上看到的只有一块静态的白色场景，
看不到任务东西，接下来通过一些基础图像学习和了解，以呈现一些图形效果。

### 二、图像的表示

绘制的前期准备工作已经做完，接下来要做的就是把想要绘制的物体添加到场景中。
在计算机世界中，3D 世界是有点组成，
两个点能够组成一条直线，
三个不在一条直线上的点就能够组成一个三角面片，
无数个三角面片就能够组成各种各样形状的物体，
通常巴中网格模型叫做`Mesh`模型。

`Mesh`模型是三维开发中使用的最为广泛的型。

```
点、线、面
    点
        点模型 THREE.Points(geometry, material)
        点材质 PointsMaterial
    线
        线模型Line
            THREE.Line(geometry, material)
            THREE.LineLoop
            THREE.LineSegments
        线材质
            实线 LineBasicMaterial
            虚线 LineDashedMaterial
    面
        网格模型
            THREE.Mesh(geometry, material)
        网格材质
            基础 MeshBasicMaterial
            漫反射 MeshLambertMaterial
            ...
            深度 MeshDepthMaterial
```

Geometries(几何图形)

three.js 给出了很多方法去生成固定的网格形状，
比如长方体（BoxGeometry）、球体（SphereGeometry），圆形（CircelGeometry)等
还有根据具体坐标生成具体形状的方法，
可以接祖第三方建模软件（SketchUp）建模之后导入，
目前支持的模型格式有.obj（最常用）,.dae,.ctm,.ply,stl,.wrl,.vtk 等
Three.js 有一系列支持外部导入文件的函数，是在 three.js 库之外的，使用前需要单独下载，
（例如：OrbitControls-控制器、OBJLoader-加载.obj 文件、MTLLoader-加载.mtl 文件）

Materials(材质)

three.js 给出了很多直接生成材质的方法，
其中比较常用的有
MeshBasicMaterial（对光照无感，给几何体一种简单的颜色或显示线框）
MeshLambertMaterial（对光照有反应，无光源则不会显示，用于创建暗淡的不发光的物体）
MeshPhongMaterial（对光照有反应，吴光远不会显示，用于创建浸塑类米昂凉的物体）等等。
物体之所以能被人眼看见，
一种是它自身的材料就能发光，不需要借助外界光源；
另一种是自身材料不发光，需要反射环境中的光。
对于自身不发光的物体，需要个场景添加光源从而达到可视的效果。

Lights(灯光)

three.js 中可以创建很多不同类型的光源，
比如环境光 AmbientLight(他的颜色会添加到整个场景和所有对象的当前颜色上)
点光源 PointLight（这种光源放出的光线来自同一个点，且辐射方向四面八方，如蜡烛发出的光）
方向光 DirectionalLight（也称作无限光，从这种光源发出的光线可以看做是平行的，如太阳光）
聚光灯 SpotLight（这种光源的光线从一个椎体中射出，在被照射的物体上产生聚光灯的效果，如手电筒发出的光）
有光源就缺少不了阴影，在 Three.js 中，能形成阴影的光源只有 DirectionalLight 和 SpotLight
相对，能表现阴影效果的材质只有 LambertMaterial 和 PhongMaterial。

three.js 中渲染阴影的开销比较大，所以默认物体是没有阴影的，需要单独开启。
开启阴影的方法：

-   将渲染器的 shadowMapEnabled 属性设置为 true（告诉浏览器可以渲染隐形）
-   将物体及光源的 castShadow 属性设置为 true（告诉物体及光源可以投射阴影）
-   将接收改阴影的物体的 receiveShadow 属性设置为 true（告诉物体可以接收其他物体的阴影）

在了解了关于图形的基本知识之后，在上面的代码的基础上添加简单图像。

```js
// 创建一个长宽高都为1个单位的立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建材质，对光照无感
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

// 创建一个立方体网格（mesh），将材质包裹在立方体上
const cube = new THREE.Mesh(geometry, material);

// 将立方体网格添加到场景中
scene.add(cube);

// 指定相机位置
camera.position.z = 5;

function render() {
    // 让浏览器执行参数中的函数，不断循环（浏览器一个新的api）
    requestAnimationFrame(render);
    // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景
    renderer.render(scene, camera);
}

render();
```

在 `render()` 函数中添加一下代码 使上面场景中添加的正方体运动起来。

```js
cube.rotation.x += 0.1;

cube.rotation.y += 0.1;
```

### Controls （控制器）

轨道控制插件 OrbitControls.js 可以实现场景用鼠标交互，让场景动起来，可控制场景的旋转、平移和缩放。
由于 OrbitControls.js 是一个插件，所以咋 three.js 中使用时，需要单独引入该文件。

```js
// 初始化控制器
const controls = new THREE.OrbitControls(camera);
// 设置控制的焦点，是控制器围绕这个交单进行旋转
controls.target.set(0, 0, 0);
// 设置移动的最短距离（默认为零）
controls.minDistance = 80;
// 设置移动的最长距离（默认无穷）
controls.maxDistance = 400;
// 绕垂直轨道的距离（范围0-Math.PI,默认为Math.PI
controls.maxPolarAngle = Math.PI;
// 照相机转动时，必须更新该控制器
controls.update();
```

配置完该插件之后的效果

| 操控                       |           效果           |
| -------------------------- | :----------------------: |
| 按住鼠标左键并移动         | 摄像机围绕场景中心移旋转 |
| 转动鼠标滑轮或按住中键移动 |        放大或缩小        |
| 按住鼠标右键并移动         |       在场景中平移       |
| 上、下、左、右方向键       |       在场景中平移       |

### Loaders（加载器）

用来加载不同格式的文件，主要介绍以下三种：

OBJLoader 加载器（需要单独引入 js 文件）：用来加载.obj 文件（分为有材质和没有材质两种）

```js
// 没有材质
new THEEE.OBJLoader().load('./tree.obj', function(obj) {
    obj.scale.set(10, 10, 10);
    obj.position.set(-10, 0, 0);
    obj.children.forEach(function(e) {
        e.castShadow = true;
    }); //设置阴影
    scene.add(obj);
});
```

MTLLoader 加载器（需要单独引入 js 文件）：用来加载.mtl 文件（即加载有材质物体的 obj 文件之前现在加载 mtl 文件）

```js
// 有材质
new THREE.MTLLoader()
    .setPath('./model/VANS/')
    .load('VANS.mtl', function(materials) {
        materials.preload();
        new THREE.ObJLoader()
            .setMaterials(materials)
            .setPath('./model/VANS/')
            .load('VANS.obj', function(obj) {
                obj.scale.set(0.8, 0.8, 0.8);
                obj.position.set(-40, -50, 10);
                scene.add(obj);
            });
    });
```

CSS2DRenderer 加载器（需要单独引入 js 文件）：如果要将基于 HTML 的标签于 3D 对象组合，则 CSS2DRenderer 渲染非常有用。
这里，各个 DOM 元素也被包装到 CSS2DObject 的一个实例中并添加到场景图中。

```js
// 初始化 CSS2DRenderer
labelRenderer = new THEee.CSS2DRenderer();
// 设置渲染器的大小
labelRenderer.setSzie(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = 0;
container.appendChild(labelRenderer.domElement);

// 标注实例
function addSprite(text, Mash, callback) {
    biaozhudiv = document.createElement('div');
    biaozhudiv.className = 'label';
    biaozhudiv.textContent = text;
    biaozhudiv.onclick = function() {
        callback(Mash);
    };
    baiozhuLabel = new THREE.CSS2DObject(biaozhudiv);
    baiozhuLabel.position.set(0, 0, 0);
    Mash.add(biaozhuLabel);
}
```

### Textures（纹理）

纹理是一个 2D 图片（甚至也有 1D 和 3D 纹理），他可以用来添加物理的细节；
可以想象纹理是一张有砖块的纸，无缝折叠贴合到你的 3D 的房子上，这样你的房子看起来就像有砖墙外表了。

```js
const textureCube = new THREE.CubeTextureLoader().load(urls);
scene.background = textureCube;
```

### Three.js + vue.js

1. npm 安装 three

```bash
    $ npm install three --save
```

安装成功后，在项目中 import three from 'three';，之后运行程序。

发现控制台报错 default export is not declared in imported module 说明 three.js 没有默认的导出对象，应该写成

```js
import \* as three from 'three'; 或者可以这样：
import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';

或者使用 CommonJS 的形式引入 const three = require ('three');
```

2. 用 npm 安装轨道控制插件

```bash
    $ npm install three-orbit-controls --save
```

```js
该插件引入之前确认 three.js 库已经引入，
OrbitControls = require('three-orbit-controls')(THREE)
使用方法： controls = new OrbitControls(camera);
```

3. 用 npm 安装加载.obj 和.mtl 文件的插件

```bash
    $ npm i --save three-obj-mtl-loader
```

该插件引入之前必须确认 three.js 库已经引入，该插件包括加载.obj 和.mtl 文件的加载器
import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader';
使用方法：mtlLoader = new MTLLoader(); objLoader = new OBJLoader();
注：单独使用 three-mtl-loader 和 three-obj-loader 两个插件时，会发生错误：

![img text](https://user-gold-cdn.xitu.io/2018/9/18/165eab8ec14fd954?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

4. 用 npm 安装 three-css2drender 插件

```bash
    $  npm i --save three-css2drender
```

插件引入之前必须确认 htree.js 库已经引入
import {CSS2DRenderer,CSS2DObject} from 'three-css2drenderer';
使用方法： labelRenderer = new CSS2DRenderer(); label = new CSS2DObject( text );
