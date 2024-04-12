<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    :destroy-on-close="true"
    @close="closed"
    style="width: 70%">
    <el-table
      ref="multipleTable"
      :data="allPermission"
      :row-key="getRowKeys"
      @selection-change="userSelectionChange"
      border
      style="width: 100%">
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column :label="$t('msg.permission.num')" prop="id" width="60" />
      <!-- 权限名称 -->
      <el-table-column prop="name" :label="$t('msg.permission.name')" />
      <!-- 方法 -->
      <el-table-column prop="method" :label="$t('msg.permission.method')" />
      <!-- 描述 -->
      <el-table-column prop="desc" :label="$t('msg.universal.desc')" />
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
import { getRolePermissionAPI, updateRoleAPI } from '@/api/role'
// import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 用于接收父组件传递的值，判断是否显示
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
  确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  // 调用api更新角色权限
  await updateRoleAPI(props.roleId, {
    id: props.roleId,
    permission: rolePermission.value
  })
  ElMessage.success(i18n.t('msg.universal.updateSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  // 关闭弹窗，还原组件状态
  page.value = 1
  size.value = 10
  emits('update:modelValue', false)
}

// 所有权限
const allPermission = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const getPermissionList = async () => {
  const res = await getPermissionListAPI({
    page: page.value,
    size: size.value
  })
  // 总数据
  total.value = res.count
  // 获取分页后的所有权限
  allPermission.value = res.results
  // 打印所有权限
  // console.log('allPermission', allPermission.value)
}
// 执行获取所有权限的函数
getPermissionList()

// 获取当前用户角色的权限
const rolePermission = ref([])
const getRolePermission = async () => {
  const res = await getRolePermissionAPI(props.roleId)
  rolePermission.value = res.permission
  // 打印当前角色的权限
  // console.log('rolePermission', rolePermission.value)
}

// 初始化多选框
const multipleTable = ref()
// 用户数据反显(默认选中）
const reserveSelection = async () => {
  if (rolePermission.value.length !== 0) {
    // 因为初始化的是allPermission，所以需要等待allPermission加载完成
    rolePermission.value.forEach((item) => {
      setTimeout(() => {
        // 找到对应的行的数据对象
        const row = allPermission.value.find(
          (permission) => permission.id === item.id
        )
        if (row) {
          // 找到对应数据，该行显示选中状态
          multipleTable.value.toggleRowSelection(row, true)
        }
      }, 0)
    })
  }
}
// 指定key值,数据更新之后保留之前行被选中的前端效果
const getRowKeys = (row) => {
  return row.id
}

// 用户点击后，存储选中的数据
const userSelectionChange = (values) => {
  rolePermission.value = values
}

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = async (currentSize) => {
  if (currentSize * page.value > total.value) {
    page.value = 1
  }
  size.value = currentSize
  // 页码改变，重新获取表格数据
  await getPermissionList()
  await getRolePermission()
  await reserveSelection()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = async (currentPage) => {
  page.value = currentPage
  // 页码改变，重新获取表格数据
  await getPermissionList()
  await getRolePermission()
  await reserveSelection()
}

// 监听roleId变化
watch(
  () => props.roleId,
  async (val) => {
    if (val) {
      // 重新获取权限列表
      await getPermissionList()
      // 重新获取角色权限
      await getRolePermission()
      // 重新勾选已有权限
      reserveSelection()
    }
  }
)
</script>
