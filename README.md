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
To use the getAllWorkspaces() method, you must first create an instance of the MaptableSDK class and authenticate with your API key. Once authenticated, you can call the getAllWorkspaces() method

## API

### getAllWorkspaces

The getAllWorkspaces() method is used to retrieve a list of all workspaces associated with the current user's account.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  // Retrieve a list of all workspaces
  const response = await maptable.getAllWorkspaces();

  // The response contains a list of WorkspaceType objects
  const workspaces = response.detail;
  console.log(workspaces);
} catch (error) {
  console.error(error);
}
```
#### Return Value
``` json
{
  "detail": [
    {
      "type": "user",
      "id": "12345",
      "name": "John Doe",
      "avatar": "https://p1.feishu.cn/xxxxx"
    },
    {
      "type": "org",
      "id": "456789",
      "name": "John Doe",
      "avatar": "https://p1.feishu.cn/xxxxx"
    }
  ]
}
```

### getWorkspaceDetail

The getWorkspaceDetail() method is used to retrieve details about a specific workspace, identified by its workspaceType and workspaceId.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  // Retrieve details for a workspace
  const response = await maptable.getWorkspaceDetail('user', '12345');

  // The response contains a WorkspaceType object
  const workspace = response.detail;

  console.log(workspace);
} catch (error) {
  console.error(error);
}
```
#### Parameters
The getWorkspaceDetail() method accepts two parameters:
* workspaceType: 'user' | 'org'.
* workspaceId: A string that specifies the unique identifier of the workspace to retrieve.

#### Return Value
``` json
{
  "detail": {
    "type": "user",
    "id": "12345",
    "name": "John Doe",
    "avatar": "https://p1.feishu.cn/xxxxx"
  }
}
```

### getWorkspaceRoles

The getWorkspaceRoles() method is used to retrieve the roles and permissions associated with a specific workspace, identified by its workspaceType and workspaceId.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  // Retrieve details for a workspace
  const response = await maptable.getWorkspaceRoles('user', '12345');

  // The response contains a WorkspaceType object
  const workspace = response.detail;

  console.log(workspace);
} catch (error) {
  console.error(error);
}
```
#### Parameters
The getWorkspaceDetail() method accepts two parameters:
* workspaceType: 'user' | 'org'.
* workspaceId: A string that specifies the unique identifier of the workspace to retrieve.

#### Return Value
* id: A string that uniquely identifies the role.
* type: A string that specifies the type of the workspace associated with the role. This can be one of the following values: 'project', 'table', 'org', or 'datafile'.
* role: A string that specifies the level of access granted to users with this role. This can be one of the following values: 'admin', 'editable', or 'readonly'.

``` json
{
  "detail": {
    "id": 2345,
    "type": "table",
    "role": "admin"
  }
}
```

### createProject

### createTable

The createTable() method is used to create a new table in the user's project.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  const columns = [
    {
      name: "ID",
      type: "multiLineText",
      isPrimary: true,
    },
    {
      name: "Name",
      type: "multiLineText",
      isPrimary: false,
    },
    {
      name: "Time",
      type: "datetime",
      isPrimary: false,
      typeOptions: {
        dateFormat: "year/month/day",
        quantiles: null,
        timeFormat: "hidden",
      },
    },
  ];
  const rows = [["03327e4cf4a0d119cdd7903b0116bde8", "Jeo Hax", "2022/10/12"]];
  const response = await maptable.createTable({
    projectId: "2626",
    name: "Student",
    skipFirstRow: true,
    columns,
    rows,
  });
  const data = response.detail;
  console.log(data);
} catch (error) {
  console.error(error);
}
```

#### Parameters

refs: /typings/index.d.ts


### getTableDetail

### appendData

### deleteTableToRecycleBin

### restoreTableFromRecycleBin

### hardDeleteTableFromRecycleBin