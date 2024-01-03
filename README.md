# Vue 3 + TypeScript + Vite

# package.json

去掉模块化

```js
 "type": "module",
```

# git commit 提交规范

feat：新功能（feature）
fix/to：修复 bug，可以是 QA 发现的 BUG，也可以是研发自己发现的 BUG：【这个不太懂】
fix：产生 diff 并自动修复此问题。适合于一次提交直接修复问题
to：只产生 diff 不自动修复此问题。适合于多次提交。最终修复问题提交时使用 fix
docs：文档（documentation）。
style：格式（不影响代码运行的变动）【比如说加注释就是这个？】
refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）。
perf：优化相关，比如提升性能、体验。
test：增加测试。
chore：构建过程或辅助工具的变动。
revert：回滚到上一个版本。
merge：代码合并。
sync：同步主线或分支的 Bug。
