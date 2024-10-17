import { defineStore } from 'pinia'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { generateColors } from '@/utils/theme'
import { getStorage, setStorage } from '@/utils/storage'
import variables from '@/styles/variables.module.scss'
import type { ThemeState } from '@/types/stores'


// 定义 theme store
export const useThemeStore = defineStore('theme', {
    state: () => ({
        mainColor: getStorage(MAIN_COLOR) || DEFAULT_COLOR,
        variables: variables
    }),
    actions: {
        setMainColor(state: ThemeState, newColor: string) {
            state.mainColor = newColor
            state.variables.menuBg = newColor
            setStorage(MAIN_COLOR, newColor)
        }
    },
    getters: {
        // 定义动态菜单的css变量
        cssVar: (state) => ({
            ...state.variables,
            ...generateColors(getStorage(MAIN_COLOR))
        }),
        // 获取主题色
        mainColor: (state) => state.mainColor
    }
})