<template>
  <div class="table-wrapper">
    <el-button 
            type="primary" 
            @click="addnewflash()">
            <More />添加新资讯
          </el-button>
    <el-table :data="filteredProducts" style="width: 100%">
      <el-table-column prop="flashTitle" label="资讯标题" width="300" align="center" />
      <el-table-column prop="tagName" label="资讯标签" width="200" align="center" />
      <el-table-column prop="flashDate" label="发表时间" width="200" align="center" />
      <el-table-column label="操作台" width="300" align="center">
        <template #default="scope">
          <el-button 
            type="primary" 
            @click="handleAction(scope.row, 'more')">
            <More />更多
          </el-button>
          <el-button 
            type="success" 
            @click="handleAction(scope.row, 'edit')">
            <Edit />编辑
          </el-button>
          <el-button 
            type="danger" 
            @click="handleAction(scope.row, 'delete')">
            <Delete />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 当 filteredProducts 为空时显示提示信息 -->
    <el-alert
      v-if="filteredProducts.length === 0"
      title="当前无资讯数据"
      type="info"
      center
    />
  </div>
</template>

<script>
import { More, Edit, Delete } from '@element-plus/icons-vue'
import axios from '@/axios'; // 引入配置好的axios实例

export default {
  data() {
    return {
      flashes: []
    };
    
  },
  components: {
    More,
    Edit,
    Delete
  },
  computed: {
    filteredProducts() {
      return this.flashes;
    }
  },
  methods: {
    fetchFlashes() {
      axios.get('https://localhost:7218/api/Flashes/Display')
        .then(response => {
          this.flashes = response.data;
        })
    },
    handleAction(row, action) {
      if (action === 'more') {
        this.goToDetail(row);
      } else if (action === 'edit') {
        this.goToEdit(row);
      } else if (action === 'delete') {
        this.delete(row);
      }
    },
    goToDetail (flash) {
      const flashId = flash.flashId;
      this.$router.push({ path: `/home/flash/${flashId}` })
    },
    goToEdit (flash) {
      const flashId = flash.flashId
      this.$router.push({ path: `/administrator/flashaudit/${flashId}` })
    },
    delete(flash) {  
      // 弹出确认窗口  
      if (confirm('你确定要删除这个Flash吗？')) {  
        // 用户点击了确定，提交删除请求  
        axios.delete(`https://localhost:7218/api/Flashes/${flash.flashId}`)  
          .then(() => {  
            // 删除成功的处理逻辑，例如提示用户或刷新页面  
            alert('Flash删除成功！');  
            // 这里可以添加其他逻辑，比如从前端列表中移除该Flash  
          })  
          .catch(error => {  
            // 删除失败的处理逻辑  
            console.error('Error deleting flash:', error);  
            alert('删除Flash时发生错误，请稍后再试！');  
          });  
      } else {  
        // 用户点击了取消，不执行任何操作  
        alert('删除已取消！');  
      }  
    },
    addnewflash(){
      const flashId = 99999
      this.$router.push({ path: `/administrator/flashaudit/${flashId}` })
    }
  },
  created() {
    this.fetchFlashes();
  }
}
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
