import axios from 'axios'
import qs from 'qs'
import type { AxiosRequestConfig } from 'axios'

interface AuthResponse {
  token: string
  refreshToken: string
}

class MaptableSDK {
  private appId: string
  private appSecret: string
  private token: string
  private refreshToken: string
  private baseUrl = 'https://maptable.com'

  constructor(appId: string, appSecret: string) {
    this.appId = appId
    this.appSecret = appSecret
    this.token = ''
    this.refreshToken = ''
  }

  private async authenticate(): Promise<void> {
    const url = `${this.baseUrl}/open/api/v1/auth/`
    const data = { appId: this.appId, appSecret: this.appSecret }
    const response = await axios.post<MaptableSDKTypes.Response<AuthResponse>>(
      url,
      qs.stringify(data),
    )
    this.token = response?.data?.detail?.token
  }

  private async getAccessToken(): Promise<string> {
    if (!this.token) {
      await this.authenticate()
    }
    return this.token
  }

  private async request<T>(config: AxiosRequestConfig): Promise<MaptableSDKTypes.Response<T>> {
    const accessToken = await this.getAccessToken()
    const headers = { Authorization: accessToken }
    try {
      const response = await axios.request<MaptableSDKTypes.Response<T>>({
        ...config,
        headers: {
          ...config.headers,
          ...headers,
        },
      })
      return response.data
    } catch (error) {
      if (error) {
        throw new Error(`Maptable API error: ${error}`)
      } else {
        throw new Error(`Network error: ${error}`)
      }
    }
  }

  /** 获取所有的工作区列表 */
  public async getAllWorkspaces(): Promise<
    MaptableSDKTypes.Response<MaptableSDKTypes.WorkspaceType[]>
  > {
    const url = `${this.baseUrl}/open/api/v1/workspaces/`
    return this.request({ url, method: 'GET' })
  }

  /** 读取工作区详情 */
  public async getWorkspaceDetail(
    workspaceType: MaptableSDKTypes.WorkspaceType['type'],
    workspaceId: string,
  ): Promise<MaptableSDKTypes.Response<MaptableSDKTypes.WorkspaceType>> {
    const url = `${this.baseUrl}/open/api/v1/workspaces/${workspaceType}/${workspaceId}/`
    return this.request({ url, method: 'GET' })
  }
}

export default MaptableSDK
