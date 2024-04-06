<template>
  <div class="permission-container">
    <el-card>
      <el-table :data="permissionList" border style="width: 100%">
        <el-table-column
          :label="$t('msg.permission.num')"
          prop="id"
          width="60" />
        <!-- 权限名称 -->
        <el-table-column prop="name" :label="$t('msg.permission.name')">
        </el-table-column>
        <!-- 方法 -->
        <el-table-column prop="method" :label="$t('msg.permission.method')">
        </el-table-column>
        <!-- 所属路由 -->
        <el-table-column prop="router" :label="$t('msg.permission.router')">
        </el-table-column>
        <el-table-column
          :label="$t('msg.universal.action')"
          fixed="right"
          width="260">
          <template #default="{ row }">
            <!-- v-permission="['distributeRole']" -->
            <!-- v-permission="['removeUser']" -->
            <el-button type="success" size="default" @click="onAddClick(row)">{{
              $t('msg.universal.add')
            }}</el-button>

            <el-button
              type="primary"
              size="default"
              @click="onEditClick(row)"
              >{{ $t('msg.universal.update') }}</el-button
            >
            <el-button
              type="danger"
              size="default"
              @click="onRemoveClick(row)"
              >{{ $t('msg.universal.remove') }}</el-button
            >
          </template>
        </el-table-column>
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
    </el-card>
  </div>

  <!-- 新增权限 -->
  <el-dialog
    v-model="dialogFormAddVisible"
    :title="$t('msg.permission.addDialogTitle')"
    width="500">
    <el-form v-model="selectPermission">
      <el-form-item :label="$t('msg.permission.num')" label-width="140px">
        <el-input v-model="selectPermission.id" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('msg.permission.name')" label-width="140px">
        <el-input v-model="selectPermission.name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('msg.permission.method')" label-width="140px">
        <el-input v-model="selectPermission.method" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('msg.permission.router')" label-width="140px">
        <el-select
          v-model="selectPermission.router"
          :placeholder="$t('msg.permission.selectRouterDialog')">
          <el-option
            v-for="item in allRouter"
            :key="item.id"
            :label="item.title"
            :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="addPermission()">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 编辑权限 -->
  <el-dialog
    v-model="dialogFormEditVisible"
    :title="$t('msg.permission.editDialogTitle')"
    width="500">
    <el-form v-model="selectPermission">
      <el-form-item :label="$t('msg.permission.num')" label-width="140px">
        {{ selectPermission.id }}
      </el-form-item>
      <el-form-item :label="$t('msg.permission.name')" label-width="140px">
        <el-input v-model="selectPermission.name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('msg.permission.method')" label-width="140px">
        <el-input v-model="selectPermission.method" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item :label="$t('msg.permission.router')" label-width="140px">
        <el-select
          v-model="selectPermission.router"
          :placeholder="$t('msg.permission.selectRouterDialog')">
          <el-option
            v-for="item in allRouter"
            :key="item.router_id"
            :label="item.router_id" />
        </el-select>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="updatePermission(selectPermission)">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  getPermissionListAPI,
  postPermissionAPI,
  updatePermissionAPI,
  deletePermissionAPI
} from '@/api/permission'
import { getRouterAllAPI } from '@/api/router'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */
// 所有路由
const allRouter = ref([])
const getRouterAll = async () => {
  const res = await getRouterAllAPI()
  allRouter.value = res.results
  // 打印所有信息
  console.log(allRouter.value)
}
getRouterAll()

// 所有权限
const permissionList = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const getPermissionList = async () => {
  const res = await getPermissionListAPI({
    page: page.value,
    size: size.value
  })
  permissionList.value = res.results
  total.value = res.count
  // 打印所有信息
  // console.log(permissionList.value)
  // console.log(total.value)
  // console.log(page.value)
  // console.log(size.value)
}

getPermissionList()
watchSwitchLang(getPermissionList)

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getPermissionList()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getPermissionList()
}

// 初始化对话框
const selectPermission = ref([])
const dialogFormAddVisible = ref(false)
const dialogFormEditVisible = ref(false)
/**
 * 添加权限对话框显示
 */
const onAddClick = () => {
  dialogFormAddVisible.value = true
}

// 添加权限
const addPermission = (selectPermission) => {
  // 添加数据
  postPermissionAPI(selectPermission.value)
  dialogFormAddVisible.value = false
  ElMessage.success(i18n.t('msg.permission.addSuccess'))
}

/**
 * 编辑权限对话框显示，并传参
 */
const onEditClick = (row) => {
  dialogFormEditVisible.value = true
  // 为表格赋值
  selectPermission.value = row
  // 打印selelPermission的值
  console.log('selectPermission', selectPermission.value)
}

// 更新权限
const updatePermission = (selectPermission) => {
  // 更新数据
  updatePermissionAPI(selectPermission.value.id, selectPermission.value)
  dialogFormEditVisible.value = false
  ElMessage.success(i18n.t('msg.permission.updateSuccess'))
}

// 保证每次打开重新获取用户角色数据
watch(dialogFormAddVisible, (val) => {
  if (!val) selectPermission.value = ''
})

/**
 * 删除权限
 */
const i18n = useI18n()
const onRemoveClick = async (selectPermission) => {
  try {
    await ElMessageBox.confirm(
      i18n.t('msg.permission.dialogTitle1') +
        selectPermission.name +
        selectPermission.method +
        i18n.t('msg.permission.dialogTitle2'),
      {
        type: 'warning'
      }
    )
    await deletePermissionAPI(selectPermission.id)
    ElMessage.success(i18n.t('msg.univsersal.removeSuccess'))
    // 重新渲染数据
    getPermissionList()
  } catch (error) {
    ElMessage.info(i18n.t('msg.universal.cancel'))
  }
}
</script>

<style lang="scss" scoped>
.permission-container {
}
</style>
