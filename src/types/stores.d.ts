import type { UserInfo } from "./api";

export interface TagView {
    title: string;
    path: string;
}

export interface AppState {
    sidebarOpened: boolean;
    language: string;
    tagsViewList: TagView[];
}

export interface Variables {
    [key: string]: string; // 所有变量都是键值对，键是字符串，值也是字符串
}

export interface ThemeState {
    mainColor: string;
    variables: variables
}
