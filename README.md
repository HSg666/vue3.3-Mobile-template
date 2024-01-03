# 技术栈： Vue 3.3 / TS 5.2 / Vite5.0 / Pinia2.1.7 / router4.2.5 
# 环境： Node:16.20.1    pnpm:8.14.0
# 代码管理工具：sourceTree

# 启动命令
```js
cd learn-vite  // 切换
pnpm i        // 装依赖
pnpm dev     // 启动
```

# 搭建一期
这个项目有什么东西呢？
## 1、务必装上安装pnpm 
没装的看这篇文章  https://blog.csdn.net/Steven_Son/article/details/135151622 
## 2、新增 .nvmrc
每次切换项目都手动切换 node 版本
## 3、CSS预处理用的是SCSS
## 4、公共样式表
common.scss  需要初始化全局样式可以在此文件编辑
## 5、autoprefiexer 自动增加css浏览器兼容前缀
## 6、windicss  第三方便捷性css库
## 7、封装Antd / Vant-ui按需导入 
## 8、pinia 封装统一管理存储库 
## 9、router 封装 
## 10、配置路径别名 alias
示例：@/store   只要在src下的都能这样简写
## 11、polyfill web项目兼容低版本浏览器插件
core-js 和 @vitejs/plugin-legacy
## 12、prettier + eslint 配置了代码规范插件
## 13、husky + lint-staged  git提交规范
## 14、browserslist 配置了浏览器兼容性


### 备份
#### package.json

去掉模块化

```js
 "type": "module",
```

### git commit 提交规范

- feat：新功能（feature）
- fix/to：修复 bug，可以是 QA 发现的 BUG，也可以是研发自己发现的 
- fix：产生 diff 并自动修复此问题。适合于一次提交直接修复问题
- to：只产生 diff 不自动修复此问题。适合于多次提交。最终修复问题提交时使用 fix
- docs：文档（documentation）。
- style：格式（不影响代码运行的变动）【比如说加注释就是这个？】
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）。
- perf：优化相关，比如提升性能、体验。
- test：增加测试。
- chore：构建过程或辅助工具的变动。
- revert：回滚到上一个版本。
- merge：代码合并。
- sync：同步主线或分支的 Bug。

搭建此项目参考的文章地址  https://blog.csdn.net/qq_17335549/article/details/128480583

# 搭建二期
