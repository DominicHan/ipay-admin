## 基于https://github.com/iview/iview-admin

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
