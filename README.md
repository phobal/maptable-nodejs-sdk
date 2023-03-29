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
  // get all workspaces
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

The createProject() method is used to create a new project in the Maptable API.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  // Create a new project
  const response = await maptable.createProject({
    name: 'My Project',
    desc: 'A description of my project',
    icon: 'todo',
  });

  // The response contains a ProjectType object representing the newly created project
  const project = response.data;
  console.log(project);
} catch (error) {
  console.error(error);
}

```
#### Parameters

The createProject() method accepts one parameter:

* data: An object that specifies the details of the project to create. This object should have the following properties:
  * name: required, A string that specifies the name of the project.
  * desc: required, A string that provides a description of the project.
  * icon: required, A string that specifies the project's icon, it can't set empty string
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

The getTableDetail() method is used to retrieve details for a specific table, including its columns and data. This method can also be used to request data in segments, with each segment containing a specified number of rows.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  // Retrieve details for a table
  const response = await maptable.getTableDetail({
    tableId: '12345',
    viewId: '67890',
    lastSegmentRowID: 'abcdef',
  });

  // The response contains a TableType object
  const table = response.detail;
  console.log(table);
} catch (error) {
  console.error(error);
}
```
#### Parameters
The getTableDetail() method accepts one parameter, an object that specifies the details of the table to retrieve:

  * tableId, A string that specifies the unique identifier of the table to retrieve.
  * viewId (optional): A string that specifies the unique identifier of the view to use for retrieving data. If not provided, the default view will be used.
  * lastSegmentRowID (optional): A string that specifies the ID of the last row in the previous segment. This parameter can be used to request data in segments.
#### Return Values

``` json
{
    "code": 0,
    "msg": "success",
    "detail": {
        "id": 1,
        "type": "table",
        "segmentType": "segmentStart",
        "rows": [
        {
            "id": "61ca7730aeb6fdcb5a6cfcd5",
            "cells": {
                "620a0e9ef5f9e0fbec16049e": "汤河口镇",
                "620a0e9ef5f9e0fbec16049f": 2
            },
            "meta": {
                "createTime": "0001-01-01T00:00:00Z",
                "updateTime": "0001-01-01T00:00:00Z",
                "creatorID": 0,
                "updaterID": 0
            }
        },
        "columns": [
            {
                "id": "620a0e9ef5f9e0fbec16049e",
                "syncedID": "000000000000000000000000",
                "tableNodeID": 0,
                "name": "a",
                "type": "singleLineText",
                "typeOptions": null,
                "isPrimary": true,
                "mode": "normal",
                "meta": {
                    "createTime": "0001-01-01T00:00:00Z",
                    "updateTime": "0001-01-01T00:00:00Z",
                    "creatorID": 0,
                    "updaterID": 0
                }
            }
        ],
        "views": [
            {
                "id": "620a0e9ef5f9e0fbec16049d",
                "name": "新建视图",
                "order": 1,
                "frozenColumnCount": 1,
                "filterCondition": "and",
                "filters": [],
                "groups": null,
                "orders": null,
                "rows": [
                    {
                        "id": "61ca7730aeb6fdcb5a6cfcd5",
                        "order": 1
                    },
                    {
                        "id": "61ca7730aeb6fdcb5a6cfcd6",
                        "order": 2
                    },
                    {
                        "id": "61ca7730aeb6fdcb5a6cfcd7",
                        "order": 3
                    }
                ],
                "columns": [
                    {
                        "id": "620a0e9ef5f9e0fbec16049e",
                        "order": 1,
                        "width": 200,
                        "isHidden": false
                    },
                    {
                        "id": "620a0e9ef5f9e0fbec16049f",
                        "order": 2,
                        "width": 200,
                        "isHidden": false
                    }
                ]
            }
        ]
     }
}
```
### appendData

The appendData() method is used to append rows of data to a specified table in the Maptable API.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  const detail = await maptable.getTableDetail({
    tableId: '10910',
    viewId: '64213f5f87b0d9b46fa62661',
  })
  const columns = detail.detail.columns
  const rows = [
    ["test1", "2020-01-01", "", "", "12"],
    ["test2", "2022-01-01", "", "", "12"],
  ]
  const result = await maptable.appendData({
    tableId: detail.detail.id,
    columns,
    rows,
  })
  console.log(result)
} catch (error) {
  console.error(error);
}
```
#### Parameters
The appendData() method accepts an object parameter that specifies the details of the data to append:

* tableId: A string that specifies the unique identifier of the table to which the data should be appended.
* skipFirstRow (optional): A boolean that indicates whether to skip the first row of the data. Defaults to true.
* autoCreateColumn (optional): A boolean that indicates whether to automatically create columns if they do not already exist in the table. Defaults to false.
* columns: An array of objects representing the columns to which the data corresponds. Each object should have the following properties:
  * name: A string that specifies the name of the column.
  * type: A string that specifies the type of the column, such as "text", "number", or "email".
* rows: An array of arrays representing the data to be appended. Each inner array represents a single row, with values corresponding to the columns in the same order as they appear in the columns property.

### deleteTableToRecycleBin

The deleteTableToRecycleBin() method is used to delete a table in the Maptable API and move it to the recycle bin.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  const result = await maptable.deleteTableToRecycleBin('10981')
  console.log('--result', result)
} catch (error) {
  console.error(error);
}
```
#### Parameters

* tableId, Required, the unique identifier of the table

### restoreTableFromRecycleBin

The restoreTableFromRecycleBin() method is used to restore a table in the Maptable API and from the recycle bin.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  const result = await maptable.restoreTableFromRecycleBin('10981')
  console.log(result)
} catch (error) {
  console.error(error);
}
```
#### Parameters

* tableId, Required, the unique identifier of the table

### hardDeleteTableFromRecycleBin

The hardDeleteTableFromRecycleBin() method is used to permanently delete a table from the recycle bin in the Maptable API.

``` ts
import Maptable from 'maptable-nodejs-sdk'

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
const maptable = new Maptable(appId, appSecret)

try {
  const result = await maptable.hardDeleteTableFromRecycleBin('10981')
  console.log(result)
} catch (error) {
  console.error(error);
}
```
#### Parameters

* tableId, Required, the unique identifier of the table