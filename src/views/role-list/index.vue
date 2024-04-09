<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="name">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="desc">
        </el-table-column>
        <el-table-column
          :label="$t('msg.universal.action')"
          prop="action"
          width="260"
          #default="{ row }">
          <!-- v-permission="['distributePermission']" -->
          <el-button
            type="primary"
            size="default"
            @click="onDistributePermissionClick(row)">
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"></distribute-permission>
  </div>
</template>

<script setup>
import { getRoleListAPI } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  const res = await getRoleListAPI()
  allRoles.value = res.results
  // 打印角色数据
  // console.log(allRoles.value)
}
getRoleList()
watchSwitchLang(getRoleList)
/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref(0)
const onDistributePermissionClick = (row) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
