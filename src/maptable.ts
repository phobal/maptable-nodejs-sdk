import fs from 'fs';
import axios from 'axios';
import qs from 'qs';
import FormData from 'form-data';
import type { AxiosRequestConfig } from 'axios';

interface AuthResponse {
  token: string;
  refreshToken: string;
}

class MaptableSDK {
  private appId: string;
  private appSecret: string;
  private token: string;
  private refreshToken: string;
  private baseUrl = 'https://maptable.com';

  constructor(appId: string, appSecret: string) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.token = '';
    this.refreshToken = '';
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
    const headers = { Authorization: accessToken };
    try {
      const response = await axios.request<MaptableSDKTypes.Response<T>>({
        ...config,
        headers: {
          ...config.headers,
          ...headers,
        },
      });
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
    columns: fs.PathLike;
    rows: fs.PathLike;
  }): Promise<MaptableSDKTypes.Response<any>> {
    const url = `${this.baseUrl}/open/api/v1/tablenodes/import/`;
    const formData = new FormData(); // 创建一个 FormData 对象
    formData.append('projectId', data.projectId)
    formData.append('name', data.name)
    formData.append('skipFirstRow', data.skipFirstRow)
    formData.append('rows', fs.createReadStream(data.rows));
    formData.append('columns', fs.createReadStream(data.columns));
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
