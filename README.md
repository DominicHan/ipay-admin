## 基于 https://github.com/iview/iview-admin

## node.js 版本v10.15.1

## Getting started
```bush
# clone the project
git clone https://github.com/iview/iview-admin.git

// install dependencies
npm install

// develop
npm run dev
```

## Build
```bush
npm run build
```

## 关键代码
src/view/components 所有页面代码基本都在此目录下

src/components/cropper/index.vue 上传图片、视频的组件，其中Upload组件的action属性目前需要写死上传接口地址

## 部署
基于nginx部署

脚本 nginx.conf为当前测试服务器配置

ipay-admin.conf 存放在测试服务器/etc/nginx/conf.d中

目前测试服务器中将打好包的目录放在 /root 下更名为ipay-admin，启动nginx访问3000端口即可
