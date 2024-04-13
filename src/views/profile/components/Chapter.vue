<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item ? item.id : undefined"
      :timestamp="item ? item.timestamp : undefined"
      placement="top">
      <el-card>
        <h4>{{ item ? item.content : undefined }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import { chapterListAPI } from '@/api/user'
import { ref } from 'vue'
const chapterData = ref([])

const getChapterData = async () => {
  const res = await chapterListAPI()
  chapterData.value = await res
  // 打印chapterData内容
  // console.log('chapterData', chapterData.value)
}
getChapterData()

// 监听语言切换
watchSwitchLang(getChapterData)
</script>

<style lang="scss" scoped></style>
