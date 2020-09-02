# scrawllife-fabric

一个包含 prettier，eslint，stylelint 的配置文件合集
Migrated to the new github [fabric](https://github.com/scrawllife/scrawllife-fabric)

### 安装

```bash
yarn add -D @scrawllife/fabric
```

### 使用

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('@scrawllife/fabric/dist/eslint')],
  rules: {
    // your rules
  },
};
```

in `.stylelintrc.js`

```js
module.exports = {
  extends: [require.resolve('@scrawllife/fabric/dist/stylelint')],
  rules: {
    // your rules
  },
};
```


in `.prettierrc.js`

```js
const fabric = require('@scrawllife/fabric');

module.exports = {
  ...fabric.prettier,
};

```
