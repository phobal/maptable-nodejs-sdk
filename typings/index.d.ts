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
  type RoleType = {
    /** 角色 ID */
    id: string
    /** 角色类型 */
    type: 'project' | 'table' | 'org' | 'datafile'
    /** 权限 */
    role: 'admin' | 'editable' | 'readonly'
  }
  /** 表格列信息 */
  type Column = {
    /** 列名称 */
    name: string
    /** 列类型
     * @param multiLineText 多行文本
     * @param number 数字
     * @param datetime 日期时间
     * @param singleChoice 单选
     * @param coordinate 坐标
     */
    type: 'multiLineText' | 'number' | 'datetime' | 'singleChoice' | 'coordinate'
    /** 列选项，number datetime singleChoice 时需要 */
    typeOptions?: {
      /** 数值格式，列类型为 number 时生效 */
      format: 'number' | 'percentage' | 'commaNumber'
      /** 数值精度：0 - 5，列类型为 number 时生效 */
      precision: number
      /** 日期格式，列类型为 datetime 时生效 */
      dateFormat: 'year/month/day' | 'month/day/year' | 'detail'
      /** 时间格式，，列类型为 datetime 时生效 */
      timeFormat: 'hidden' | '24-hour-clock' | '12-hour-clock'
      /** 单选选项, 为空时自动创建，列类型为 singleChoice 时生效 */
      choices?: Array<{
        /** 选项名：当选项名和单元格值相等时使用该选项，列类型为 singleChoice 时生效 */
        name: string
        /** 选项颜色，为空时随机设置颜色，列类型为 singleChoice 时生效 */
        color?: string
      }>
    }
    /** 是否为主列：只能设置一个，且列类型为：multiLineText number datetime */
    isPrimaryKey: boolean
  }

  type Row = any
}
