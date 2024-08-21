<template>
  <div class="table-wrapper">
     <!-- 新增营地按钮 -->
    <div class="btn-container">
      <el-button type="primary" icon="Plus" @click="handleAdd" class="add-btn">新增营地</el-button>
    </div>

    <!-- 营地信息表格 -->
    <el-table :data="camps" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="campground_name" label="营地名称" width="300" align="center" />
      <el-table-column label="联系方法" width="300" align="center">
        <template v-slot="scope">
          <div>
            <div>地址: {{ scope.row.address }}</div>
            <div>城市: {{ scope.row.city }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作台" width="300" align="center">
        <template v-slot="scope">
          <el-button type="primary" @click="handleAction(scope.row, 'more')">
            <More />更多
          </el-button>
          <el-button type="success" @click="handleAction(scope.row, 'edit')">
            <Edit />编辑
          </el-button>
          <el-button type="danger" @click="handleAction(scope.row, 'delete')">
            <Delete />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 没有数据时显示的提示 -->
    <el-alert v-if="camps.length === 0" title="当前无营地数据" type="info" center />
  </div>
</template>

<script>
import { More, Edit, Delete } from '@element-plus/icons-vue';
import axios from '@/axios'; // 引入配置好的axios实例

export default {
  components: {
    More,
    Edit,
    Delete
  },
  data() {
    return {
      camps: [] // 存储营地数据
    };
  },
  created() {
    this.fetchCamps();
  },
  methods: {
    fetchCamps() {
      axios.get('api/Campgrounds/AdminGetCampground')
        .then(response => {
          this.camps = response.data;
        })
        .catch(error => {
          console.error('获取营地数据时出错:', error);
        });
    },
    handleAction(row, action) {
      if (action === 'more') {
        this.$router.push({ path: `/home/campdetail/${row.campground_id}` });
      } else if (action === 'edit') {
        this.$router.push({ path: `/administrator/admincampedit/${row.campground_id}` });
      } else if (action === 'delete') {
        this.deleteCamp(row.campground_id);
      }
    },
    handleAdd() {
      this.$router.push({ path: `/administrator/addcamp` });
    },
    deleteCamp(campground_id) {
      this.$confirm('确定要删除这个营地吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          axios.delete(`/api/Campgrounds/DeleteCampgroundbyAdmin/${campground_id}`)
          .then(() => {
            this.$message({
              type: 'success',
             message: '营地删除成功!'
            });
              // 从 camps 数组中移除删除的营地
              this.camps = this.camps.filter(camp => camp.campground_id !== campground_id);
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: `删除营地失败: ${error.message}`
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>


<style scoped>
.add-btn {
  margin-left:73%;
}

.table-wrapper {
  width: 70%;
  display: flex;
  justify-content: center;
  height:100%;
  flex-direction: column; /* 子元素垂直排列 */
  margin: 0 auto;
}
.camp-table {
  width: 100%; /* 表格宽度占满父容器 */
  margin: 0 auto; /* 确保表格居中 */
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
