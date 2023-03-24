declare namespace MaptableSDKTypes {
  /** Maptable API 返回值类型 */
  export type Response<T> = {
    /** 错误码 0 为成功， 其它为异常 */
    code: number;
    detail: T;
    extra: string | null;
    message: string;
    requestID: number | null;
  };

  /** 工作区类型 */
  export type WorkspaceType = {
    /** ID */
    id: string;
    /** 工作区名称 */
    name: string;
    /** 工作区类型
     * @param 'user' 个人工作区
     * @param 'org' 组织工作区
     */
    type: 'user' | 'org';
    /** 缩略图地址 */
    avatar: string;
  };

  /** 用户信息 */
  export type userInfo = {
    /** 用户 ID */
    id: string;
    /** 用户名 */
    name: string;
    /** 用户头像 */
    avatar: string;
  };

  /** 数据表类型 */
  export type TableNodesType = {
    /** 数据表 ID */
    id: string;
    /** 数据表名称 */
    name: string;
    /** 数据表的类型
     * @param 'table' 普通数据表
     * @param 'bigTable' 大数据表
     * @param 'group' 数据表分组
     */
    type: 'table' | 'bigTable' | 'group';
    /** 是否为订阅表 */
    subscribed: boolean;
    /** 是否已发布为订阅源 */
    published: boolean;
    /** 创建时间 */
    createTime: string;
  };

  /** 项目类型 */
  export type ProjectType = {
    /** 项目 ID */
    id: string;
    /** 项目名称 */
    name: string;
    /** 项目描述 */
    desc: string;
    /** 项目图标 */
    icon: string;
    /** 更新时间 */
    updateTime: string;
    /** 创建时间 */
    createTime: string;
    /** 项目成员数量 */
    memberCount: number;
    /** 创建人 */
    creator: userInfo;
    /** 项目中的数据表列表 */
    tableNodes: TableNodesType[];
  };

  /** 工作区详情 */
  export type WorkspaceDetail = {
    /** 当前用户信息 */
    currentUser: userInfo;
    /** 项目列表 */
    projects: ProjectType[];
    /** 回收站中的项目列表 */
    recycleProjects: ProjectType[];
    /** 数据文件列表 */
    dataFiles: any[] | null;
    /** 回收站中数据文件列表 */
    recycleDataFiles: any[] | null;
    /** 未读消息数量 */
    unreadNotificationsCount: number;
  };
}
