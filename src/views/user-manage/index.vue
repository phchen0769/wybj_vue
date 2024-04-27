<template>
  <div class="user-manage-container">
    <!-- <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']">
          {{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card> -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <!-- <template v-slot="{ row }"> -->
          <template #default="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="default"
                >{{ item.name }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="default">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ row.add_time }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.universal.action')"
          fixed="right"
          width="260">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="default"
              @click="onShowClick(row.id)"
              >{{ $t('msg.universal.check') }}</el-button
            >
            <!-- v-permission="['distributeRole']" -->
            <el-button
              type="info"
              size="default"
              @click="onShowRoleClick(row)"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <!-- v-permission="['removeUser']" -->
            <el-button
              type="danger"
              size="default"
              @click="onRemoveClick(row)"
              >{{ $t('msg.universal.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- <export-to-excel v-model="exportToExcelVisible"></export-to-excel> -->
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId.toString()"
      @updateRole="getListData"></roles-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { getUserManageList, deleteUserAPI } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
// import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'
// ①、定义数据，并赋初值
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
// ②、获取数据
const getListData = async () => {
  // 调用api接口函数获取数据，并赋值
  const res = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.results
  total.value = res.count
  // console.log(tableData.value)
  // console.log(total.value)
}
// 执行获取数据的函数
getListData()
// 监听语言切换
watchSwitchLang(getListData)
// 处理导入用户后数据不重新加载的问题
onActivated(getListData)

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

const router = useRouter()
/**
 * excel 导入点击事件
 */
// const onImportExcelClick = () => {
//   router.push('/user/import')
// }
/**
 * 查看用户详情按钮点击事件
 */
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}
/**
 * 查看角色的点击事件
 * 为员工分配角色
 */
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row.id
}
// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})
/**
 * 删除按钮点击事件
 * 删除用户
 */
const i18n = useI18n()
const onRemoveClick = async (row) => {
  try {
    await ElMessageBox.confirm(
      i18n.t('msg.excel.dialogTitle1') +
        row.username +
        i18n.t('msg.excel.dialogTitle2'),
      {
        type: 'warning'
      }
    ).then(async () => {
      await deleteUserAPI(row.id)
      ElMessage.success(i18n.t('msg.universal.removeSuccess'))
      // 重新渲染数据
      getListData()
    })
  } catch (error) {
    ElMessage.info(i18n.t('msg.universal.cancel'))
  }
}

/**
 * excel 导出点击事件
 */
// const exportToExcelVisible = ref(false)
// const onToExcelClick = () => {
//   exportToExcelVisible.value = true
// }
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
