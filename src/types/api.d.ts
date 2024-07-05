export interface Router {
  router_id: number;
  path: string;
  component: string;
  redirect: string | null;
  hidden: boolean;
  name: string | null;
  title: string;
  icon: string | null;
  sub_router: number | null;
}

export interface Role {
  id: number;
  name: string;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  mobile: string;
  avatar: string;
  address: string | null;
  routers: Router[];
  role: Role[];
  add_time: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

// 视频通话的用户信息
export interface UserItem {
  username: string;
  userId: string;
}

