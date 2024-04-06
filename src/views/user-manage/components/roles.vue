<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed">
    <el-checkbox-group v-model="userRoleNameList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.name"></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { roleListAPI } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { userDetail, updateRole } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
// 定义触发事件函数，用于更新父组件的数据
const emits = defineEmits(['update:modelValue', 'updateRole'])

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  // 处理数据结构
  const roles = userRoleNameList.value.map((name) => {
    return allRoleList.value.find((role) => role.name === name)
  })
  // 角色更新
  await updateRole(props.userId, roles)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 触发自定义事件函数，更新父组件数据
  emits('updateRole')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  // 触发自定义事件函数，更新父组件数据
  emits('update:modelValue', false)
}

// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  const res = await roleListAPI()
  allRoleList.value = res.results
  // 打印所有角色数据
  // console.log(allRoleList.value)
}
getListData()
watchSwitchLang(getListData)

// 当前用户角色
const userRoleNameList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userDetail(props.userId)
  userRoleNameList.value = res.role.map((item) => item.name)
  // 打印当前用户角色
  // console.log(userRoleNameList.value)
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
