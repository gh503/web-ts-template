# web-ts-template
前端项目模板,`TypeScript`搭建框架和工具链,组件选用`Vaadin Components`.

## 使用说明
工程已经支持`Vaadin` `TypeScript`组件引入和编译,直接开发`ts`代码即可.

## 项目工程说明
### 1.入口 index.html 关键点
1.通过 `index.html` 中 `id='app'` 注册路由;  
2.样式 `style.css` 通过 `webpack` 自动优化注入 `index.html`;  
3.js代码 `app.js` 和 `依赖包js` 通过 `webpack` 自动构建,优化,注入 `index.html`;  

### 2.app.ts 关键点
1.代码中用到的样式,在 `src/css/` 目录下,并在 `app.ts`中导入, `webpack`自动打包;  
2.代码中用到的库,比如 `vaadin` 组件包, 需要在 `app.ts` 中导入, `webpack` 自动打包;  
3.`app.ts` 本身会编译为 `app.js`;  

因此在 `dist/` 下会生成`main.css`, `main.js`, `依赖包.js`,命名会有所差异.

### 3.资源文件 assets
直接拷贝到 `dist/` 文件夹待发布.

## NPM Scirpt
```bash
Lifecycle scripts included in undefined:
  start
    npm run serve

available via `npm run-script`:
  lint
    eslint 'src/**/*.{ts,tsx}'
  format
    prettier --write 'src/**/*.{ts,tsx,js,jsx,json,css,scss,md}'
  clean
    rimraf dist
  build
    rimraf dist && webpack --mode production
  serve
    webpack serve --mode development --open
```

### 清理编译
`npm run clean` 删除 `dist/` 文件夹.

### 编译发布
`npm run build` 构建 `dist/` 文件夹,生产环境直接拷贝 `dist/*` 部署即可.

### 开发调试
`npm run serve` 本地环境预览前端效果,默认是热加载,修改后即时生效.

### 静态检查
`npm run lint` eslint检查代码规范,并给出结果.

### 自动修复
`npm run format` prettier自动格式化不标准代码.

