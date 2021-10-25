# vite-plugin-markdown2vue

## 说明
Convert PDF to vue3 component

## 特性
- 默认支持[highlight.js](https://fenxianglu.cn/highlight.html)主题
- 默认markdown主题为gitbook
  - 主题一：gitbook-azure
  - 主题二：gitbook-slate
  - 主题三：gitbook-teal  

## 安装
```sh
npm i vite-plugin-markdown2vue --save-dev

yarn add vite-plugin-markdown2vue -D
```

## 实用
```js
// vite.config.js
import { defineConfig } from "vite";
import vitePluginMd2Vue from "vite-plugin-markdown2vue";

export default defineConfig({
  ...
  plugins: [vitePluginMd2Vue({codeTheme: 'github', theme: 'gitbook-teal'})]
});
```

## vue3 Example
```vue
<template>
  <Test />
</template>

<script>
import { defineComponent } from 'vue'
import Test, { headings }  from 'docs/test.md'

export default defineComponent({
  name: 'Test',
  components: {
    Test
  },
})
</script>
```


