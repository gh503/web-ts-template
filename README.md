# web-ts-template
前端项目模板,`TypeScript`搭建框架和工具链,组件选用`Vaadin Components`.

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
    npm run clean && webpack --mode production
  serve
    webpack serve --mode development --open
```

