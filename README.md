# face-front
基于Vue的人脸识别系统前端页面    

### 开发部署

> A Vue.js project

## Build Setup

``` bash
# 本地开发，需要将域名 0.0.0.0换成127.0.0.1
npm install

npm run dev

# 线上部署
npm run build

# 单元测试
npm run unit

# run all tests
npm test
```

### Git
``` bash
# 创建本地分支并切换
git checkout -b dev
# 暂存代码
git add .
# 提交代码
git commit -m "本次提交说明"
# 推送到远程仓库
git push
```


### 技术栈
- [Vue.js](https://cn.vuejs.org/index.html)
- [Vuex](https://vuex.vuejs.org/zh/guide/)
- [element-ui](https://element.eleme.cn/)
- [Axios](https://github.com/axios/axios)
- [Eslint](https://github.com/eslint/eslint)
- [Postcss](https://github.com/postcss/postcss)

### 接口文档

### 工程结构

```
.
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.dev.conf.js  // webpack配置文件
├── config
│   ├── dev.env.js           // 配置文件
│   ├── index.js
├── index.html               // vue加载页
├── package.json
├── package-lock.json
├── README.md
├── server.js
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css
│   │   ├── ele-custom-theme
│   │   ├── logo.png
│   │   ├── main.css
│   │   └── util
│   ├── components
│   │   ├── home.vue
│   │   ├── index.vue         // 首页
│   ├── http.js
│   ├── main.js
│   ├── index.js            // 路由
│   └── store                 // vuex store
│       ├── store.js
│       └── types.js          // 常量
├── static
└── yarn.lock
```
