import fs from 'fs';
import path from 'path';
import axios from 'axios';
import qs from 'qs';
import FormData from 'form-data';
import type { AxiosRequestConfig } from 'axios';
import { writeFileSync } from './utils';

interface AuthResponse {
  token: string;
  refreshToken: string;
}
const TEMP_PATH = `${path.resolve()}/node_modules/maptable-nodejs-sdk/dist/src/tempData`;
const COLOUMS_PATH = `${TEMP_PATH}/columns.json`;
const ROWS_PATH = `${TEMP_PATH}/rows.csv`;

class MaptableSDK {
  private appId: string;
  private appSecret: string;
  private token: string;
  private refreshToken: string;
  private tempPath: string;
  private columnsPath: string;
  private rowsPath: string;
  private baseUrl = 'https://maptable.com';

  constructor(
    appId: string,
    appSecret: string,
    tempPath?: string,
    columnsPath?: string,
    rowsPath?: string,
  ) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.token = '';
    this.refreshToken = '';
    this.tempPath = tempPath || TEMP_PATH;
    this.columnsPath = columnsPath || COLOUMS_PATH;
    this.rowsPath = rowsPath || ROWS_PATH;
  }

  private async authenticate(): Promise<void> {
    const url = `${this.baseUrl}/open/api/v1/auth/`;
    const data = { appId: this.appId, appSecret: this.appSecret };
    const response = await axios.post<MaptableSDKTypes.Response<AuthResponse>>(
      url,
      qs.stringify(data),
    );
    this.token = response?.data?.detail?.token;
  }

  private async getAccessToken(): Promise<string> {
    if (!this.token) {
      await this.authenticate();
    }
    return this.token;
  }

  private async request<T>(
    config: AxiosRequestConfig,
  ): Promise<MaptableSDKTypes.Response<T>> {
    const accessToken = await this.getAccessToken();
    const headers = { Authorization: accessToken, ...(config.headers || {}) };
    const configOptions = {
      ...config,
      headers
    }
    try {
      const response = await axios.request<MaptableSDKTypes.Response<T>>(configOptions);
      return response.data;
    } catch (error) {
      if (error) {
        throw new Error(`Maptable API error: ${error}`);
      } else {
        throw new Error(`Network error: ${error}`);
      }
    }
  }

  /** 获取所有的工作区列表 */
  public async getAllWorkspaces(): Promise<
    MaptableSDKTypes.Response<MaptableSDKTypes.WorkspaceType[]>
  > {
    const url = `${this.baseUrl}/open/api/v1/workspaces/`;
    return this.request({ url, method: 'GET' });
  }

  /** 读取工作区详情 */
  public async getWorkspaceDetail(
    workspaceType: MaptableSDKTypes.WorkspaceType['type'],
    workspaceId: string,
  ): Promise<MaptableSDKTypes.Response<MaptableSDKTypes.WorkspaceType>> {
    const url = `${this.baseUrl}/open/api/v1/workspaces/${workspaceType}/${workspaceId}/`;
    return this.request({ url, method: 'GET' });
  }
  /** 获取工作区权限 */
  public async getWorkspaceRoles(
    workspaceType: MaptableSDKTypes.WorkspaceType['type'],
    workspaceId: string,
  ): Promise<MaptableSDKTypes.Response<MaptableSDKTypes.RoleType>> {
    const url = `${this.baseUrl}/open/api/v1/workspaces/${workspaceType}/${workspaceId}/roles/`;
    return this.request({ url, method: 'GET' });
  }
  /** 创建项目 */
  public async createProject(
    data: Pick<MaptableSDKTypes.ProjectType, 'name' | 'desc' | 'icon'>,
  ): Promise<MaptableSDKTypes.Response<MaptableSDKTypes.ProjectType>> {
    // TODO: URL 可能有问题，会报 400 的错误
    const url = `${this.baseUrl}/open/api/v1/projects/`;
    return this.request({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: qs.stringify(data),
    });
  }
  /** 创建表格 */
  public async createTable(data: {
    projectId: string;
    name: string;
    skipFirstRow: boolean;
    columns: MaptableSDKTypes.Column[];
    rows: MaptableSDKTypes.Row[];
  }): Promise<MaptableSDKTypes.Response<any>> {
    const url = `${this.baseUrl}/open/api/v1/tablenodes/import/`;
    fs.mkdirSync(this.tempPath, { recursive: true });
    writeFileSync(COLOUMS_PATH, data.columns);
    writeFileSync(ROWS_PATH, data.rows);
    const formData = new FormData(); // 创建一个 FormData 对象
    formData.append('projectId', data.projectId);
    formData.append('name', data.name);
    formData.append('skipFirstRow', data.skipFirstRow);
    formData.append('rows', fs.createReadStream(this.rowsPath));
    formData.append('columns', fs.createReadStream(this.columnsPath));
    return this.request({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }
  /** 获取表格详情 */
  public async getTableDetail({
    tableId,
    viewId,
    lastSegmentRowID,
  }: {
    /** 表格 ID */
    tableId: string;
    /** 视图 ID */
    viewId?: string;
    /** 前一分片最后一行的 ID，为空时请求第一分片 */
    lastSegmentRowID?: string;
  }): Promise<MaptableSDKTypes.Response<MaptableSDKTypes.TableDetail>> {
    const url = `${
      this.baseUrl
    }/open/api/v1/tablenodes/${tableId}/partial/?${qs.stringify({
      viewId,
      lastSegmentRowID,
    })}`;
    return this.request({ url, method: 'GET' });
  }
  public async appendData({
    tableId,
    columns,
    rows,
  }: {
    tableId: string;
    columns: MaptableSDKTypes.Column[];
    rows: MaptableSDKTypes.Row[];
  }): Promise<MaptableSDKTypes.Response<any>> {
    const url = `${this.baseUrl}/open/api/v1/tablenodes/${tableId}/rows/append/`;
    await fs.mkdirSync(this.tempPath, { recursive: true });
    await writeFileSync(COLOUMS_PATH, columns);
    await writeFileSync(ROWS_PATH, rows);
    const formData = new FormData(); // 创建一个 FormData 对象
    formData.append('rows', fs.createReadStream(this.rowsPath));
    formData.append('columns', fs.createReadStream(this.columnsPath));
    return this.request({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }
}

export default MaptableSDK;
