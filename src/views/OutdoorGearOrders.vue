<template>
  <div class="table-wrapper">
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索订单号"
        clearable
        @input="handleSearch"
        style="width: 300px;"
        prefix-icon="el-icon-search"
      />
    </div>

    <el-table :data="filteredOrders" style="width: 100%; margin-top: 10px;">
      <el-table-column prop="lease_id" label="订单号" width="180" align="center" fixed="left" />
      <el-table-column prop="product_name" label="产品名称" width="200" align="center" fixed="left" />
      <el-table-column prop="remark" label="备注" width="200" align="center" />
      <el-table-column prop="pick_time" label="取货时间" width="200" align="center">
        <template #default="scope">
          {{ new Date(scope.row.pick_time).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="back_time" label="归还时间" width="200" align="center">
        <template #default="scope">
          {{ new Date(scope.row.back_time).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="数量" width="100" align="center" />
      <el-table-column prop="lease_status" label="状态" width="150" align="center">
        <template #default="scope">
          <span v-if="scope.row.lease_status === 0">支付失败</span>
          <span v-else-if="scope.row.lease_status === 1">支付成功，待使用</span>
          <span v-else-if="scope.row.lease_status === 2">待支付</span>
          <span v-else-if="scope.row.lease_status === 3">退款审核</span>
          <span v-else-if="scope.row.lease_status === 4">成功退款</span>
          <span v-else-if="scope.row.lease_status === 5">订单完成</span>
          <span v-else-if="scope.row.lease_status === 6">使用中</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #default="scope">
          <el-button v-if="scope.row.lease_status === 3" type="success" @click="handleOrder(scope.row.lease_id, 4)">同意退款</el-button>
          <el-button v-if="scope.row.lease_status === 3" type="danger" @click="handleOrder(scope.row.lease_id, 1)">拒绝退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-alert
      v-if="filteredOrders.length === 0"
      title="当前无订单数据"
      type="info"
      center
    />
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      orders: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredOrders() {
      if (!this.searchQuery) {
        return this.orders;
      }
      const query = this.searchQuery.toLowerCase();
      return this.orders.filter(order => 
        order.lease_id.toString().includes(query)
      );
    }
  },
  mounted() {
    this.fetchOrders(); // 组件加载时获取所有订单
  },
  methods: {
    fetchOrders() {
      axios.get('/api/Leases/GetAllOrders')
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    },
    handleSearch() {
      // 这个方法可以在将来扩展时使用
    },
    handleOrder(lease_id, lease_status) {
      axios.put(`/api/Leases/HandleOrder/${lease_id}/${lease_status}`)
        .then(() => {
          this.$alert('操作成功！', '提示', { type: 'success' });
          this.fetchOrders(); // 刷新订单列表
        })
        .catch(error => {
          console.error('Error handling order:', error);
          this.$alert('操作失败，请重试！', '错误', { type: 'error' });
        });
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  width: 85%;
  min-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  display: flex;
  flex-direction: column; /* 改为 column 以便搜索栏和表格纵向排列 */
  justify-content: flex-start;
}

.search-bar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px; /* 添加一些底部间距以分隔搜索栏和表格 */
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
