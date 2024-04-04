<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed">
    <el-checkbox-group v-model="userRoleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.name"
        :value="item.name"></el-checkbox>
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
import { getRoleList } from '@/api/role'
import { userDetail, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
// import { useStore } from 'vuex'
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

// 所有角色数据
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  const res = await getRoleList()
  allRoleList.value = res.results
  // 打印所有角色
  // console.log(allRoleList.value)
}
getListData()

// 监听语言切换
watchSwitchLang(getListData)

// 当前用户角色
const userRoleList = ref([])
// 获取当前用户角色
const getUserDetail = async () => {
  const res = await userDetail(props.userId)
  userRoleList.value = res.role
  // 打印当前用户角色id
  // console.log(userRoleList.value)
}
getUserDetail()

const roles = allRoleList.value.filter((role) =>
  userRoleList.value.includes(role)
)

console.log(roles)

// 把当前用户角色id与所有角色数据对应
// roles = userRoleList.value.map((id) => {
//   console.log(allRoleList.value.find((role) => role.id === id))
//   return allRoleList.value.find((role) => role.id === id)
// })

// 监听用户id变化
watch(
  () => props.userId,
  (val) => {
    if (val) getUserDetail()
  }
)

const emits = defineEmits(['update:modelValue', 'updateRole'])

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  // 处理数据结构
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  // const store = useStore()
  // const roles = store.getters.userInfo.roles
  // console.log(roles)

  await updateRole(props.userId, roles)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 角色更新成功
  emits('updateRole')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await getRoleList()
}
getListData()
watchSwitchLang(getListData)

// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
