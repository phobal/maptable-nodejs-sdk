# Maptable OpenAPI Nodejs SDK


[Maptable OpenAPI](https://maptable.feishu.cn/docs/doccn8sDXlBQkj7GHwRcUOVcBdc#)


## Install

``` bash
npm install maptable-nodejs-sdk
```

Make sure you're using `node >= 16`

## Usage

To use the SDK, you'll need an [Maptable OpenAPI key](https://maptable.feishu.cn/docs/doccn8sDXlBQkj7GHwRcUOVcBdc#YrblaG)


After you got the key, you can use the SDK like this:

``` javascript
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

async function example() {
  // 获取所有的工作空间
  const workspaces = await maptable.getAllWorkspaces()
  console.log(workspaces)
}
```

## API

## Docs

## Demos