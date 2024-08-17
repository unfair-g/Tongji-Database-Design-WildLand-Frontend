<template>
  <div class="table-wrapper">
    <el-table :data="filteredCampsWithAdd" style="width: 100%">
      <el-table-column prop="campground_name" label="营地名称" width="300" align="center" />
      <el-table-column label="联系方法" width="300" align="center">
        <template v-slot="scope">
          <div v-if="scope.row.isNewRow">-</div>
          <div v-else>
            <div>地址: {{ scope.row.address }}</div>
            <div>城市: {{ scope.row.city.join(', ') }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作台" width="300" align="center">
        <template v-slot="scope">
          <el-button v-if="scope.row.isNewRow" type="primary" color="#1D5B5E" @click="handleAdd">
            新增
          </el-button>
          <template v-else>
            <el-button type="primary" color="#1D5B5E" @click="handleAction(scope.row, 'more')">
              <More />更多
            </el-button>
            <el-button type="success" color="#1D5B5E" @click="handleAction(scope.row, 'edit')">
              <Edit />编辑
            </el-button>
            <el-button type="danger" color="#1D5B5E" @click="handleAction(scope.row, 'delete')">
              <Delete />删除
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-alert v-if="filteredCamps.length === 0" title="当前无营地数据" type="info" center />
  </div>
</template>

<script>
import { More, Edit, Delete } from '@element-plus/icons-vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    More,
    Edit,
    Delete
  },
  computed: {
    ...mapState({
      camps: state => state.camp.camps
    }),
    filteredCamps() {
      return this.camps.filter(camp => !camp.deleted);
    },
    filteredCampsWithAdd() {
      return [...this.filteredCamps, { isNewRow: true }];
    }
  },
  methods: {
    ...mapMutations(['DELETE_CAMP']),
    handleAction(row, action) {
      if (action === 'more') {
        this.$router.push({ path: `/home/campdetail/${row.campground_id}` });
      } else if (action === 'edit') {
        this.$router.push({ path: `/administrator/admincampedit/${row.campground_id}` });
      } else if (action === 'delete') {
        this.DELETE_CAMP(row.campground_id);
      }
    },
    handleAdd() {
      this.$router.push({ path: `/administrator/addcamp` });
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  width: 85%;
  min-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
}
.el-button {
  background-color: #1D5B5E;
  border-color: #1D5B5E;
  color: white;
}
.el-button:hover {
  background-color: #17494A;
  border-color: #17494A;
}
</style>
