<template>
    <div>
          <div v-for="camporder in camporders" :key="camporder.order_id" justify="center" >
              <el-card :body-style="{ padding: '5px' }" shadow="hover" class="camporder-card" @click="goToCampOrderDetail(camporder)">
                <div class="content">
                  <img src="@/assets/camp11.png" class="image" alt="order image">
                <div style="padding: 14px;flex:1;">
                  <div><h3>{{ camporder.campground_name }}</h3></div>
                  <div><span>预约时间：{{ camporder.startDate}}至{{ camporder.endDate}}</span></div>
                  <div><span>订单创建时间：{{ camporder.order_created_time}}</span></div>
                  <div class="bottom clearfix">
                    <span class="price">总价：¥{{ camporder.total_price }}</span>
                    <el-button type="text" class="button" @click="goToCampOrderDetail(camporder)">查看详情</el-button>
                  </div>
                </div>
              </div>
            </el-card>
            </div>
    </div>
    </template>
    
    <script>
    export default ({
      name: 'UserCampOrderListView',
      computed: {
        camporders() {
            return this.$store.state.camp_order.camp_orders//
        }
      },
      methods: {
        goToCampOrderDetail (camporder) {
          const camporderId = camporder.order_id
          this.$router.push({ path: `/home/userspace/camporder/${camporderId}`,
        })
        }
      }
    }
    )
    </script>
    
    <style scoped>
    .camporder-card {
      width: 100%; /* 固定宽度 */
      height:30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding:10px;
    }
    
    .content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .image {
      width: 300px; /* 固定图片宽度 */
      height: 160px; /* 固定图片高度 */
      object-fit: cover;
      margin-right: 60px;
    }
    
    .price {
      color: #ff4949;
      font-size: 18px;
    }
    
    .button {
      float: right;
      padding: 0;
    }
    </style>
    