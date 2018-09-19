
## 前端技术选型
* [单页应用](#单页应用) / [多页应用](#多页应用)
* 浏览器兼容性 (toB/toC)
* 移动端 / PC端

### 单页应用
* 特征
    1. 所有内容都在前端生成
    2. JS承担更多的业务逻辑，后端只是提供API
    3. 页面路由跳转不需要经过后端
* 常用类库
    1. React(.jsx)
    2. Vue(.vue)
    3. Angular(.ts)
    4. Backbone
* 架构工具
    1. npm
    2. yarn
    3. bower
    4. jspm
* 模块化工具
    1. webpack
    2. rollup
    3. browserify

### 多页应用
* 特征
    1. 内容都是由服务端用模板生成(jsp...)
    2. 每次页面跳转都要经过服务端
    3. JS更多只是做动画、CSS交互效果
* 常用类库
    1. jQuery
    2. mootools
    3. YUI
* 架构工具
    1. grunt
    2. gulp
* 模块化工具
    1. seajs
    2. requirejs