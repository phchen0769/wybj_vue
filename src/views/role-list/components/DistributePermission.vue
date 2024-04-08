<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed">
    <el-table :data="allPermission" border style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('msg.permission.num')" prop="id" width="60" />
      <!-- 权限名称 -->
      <el-table-column prop="name" :label="$t('msg.permission.name')">
      </el-table-column>
      <!-- 方法 -->
      <el-table-column prop="method" :label="$t('msg.permission.method')">
      </el-table-column>
      <!-- 所属路由 -->
      <el-table-column prop="router" :label="$t('msg.permission.router')">
      </el-table-column>
    </el-table>
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
import { getPermissionListAPI } from '@/api/permission'
import { getRolePermissionAPI } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 用于接收父组件传递的值，判断是否显示
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  // await distributePermission({
  //   roleId: props.roleId,
  //   permissions: treeRef.value.getCheckedKeys()
  // })
  ElMessage.success(i18n.t('msg.universal.updateSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  const res = await getPermissionListAPI()
  allPermission.value = res.results
  // 打印所有权限
  // console.log(allPermission.value)
}
getPermissionList()
watchSwitchLang(getPermissionList)

// 获取当前用户角色的权限
const getRolePermission = async () => {
  const res = await getRolePermissionAPI(props.roleId)
  const checkedKeys = res.permission
  // 打印当前角色的权限
  console.log('checkedKeys', checkedKeys)
  // 设置 Tree 组件中被选中节点的键值
}

watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)
</script>
