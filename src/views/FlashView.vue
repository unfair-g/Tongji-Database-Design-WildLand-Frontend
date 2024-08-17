<template>
  <div class="common-layout">
  <container>
    <HomeHead/>
    <container>
      <el-aside width="200px"></el-aside>
      <main>
        <el-container>
          <div class="left-panel">
            <mainflash />
          </div>
            <!-- 右侧资讯面板 -->
            <div class="right-panel">
              <div class="searchbox">
                <el-input
                  v-model="input"
                  style="height:50px;margin-bottom: 5%;margin-top: 1%;"
                  placeholder="Please input"
                  clearable
              />
              <el-button type="primary" :icon="Search" color="#1D5B5E"  style="height:50px;margin-bottom: 5%;margin-top: 1%;" @click="searchFlash">搜索</el-button>
              </div>
              <newflash />
              <hotflash />
            </div>
        </el-container>
      </main>
    </container>
  </container>
</div>
</template>

<script setup>
import mainflash from '../components/RecommendFlash.vue';
import hotflash from '../components/HotFlash.vue';
import newflash from '../components/NewFlash.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
const router = useRouter()

function searchFlash() {
  if (input.value.trim()) {
    router.push({ path: '/home/searchFlash', query: { keyword: input.value } })
  }
}

components: {
  mainflash,
  hotflash,
  newflash
}
</script>

<style scoped>
.left-panel, .right-panel {  
  overflow-y: auto;  
  padding: 20px;  
  /* 添加背景色和透明度 */  
  background-color: rgba(255, 255, 255, 0.8);  
}  
  
.left-panel {  
  flex:70%;  
  padding: 20px; 
  margin-left: 5%; 
  margin-top: 1%;
}  
  
.right-panel {  
  flex:30%;  
  padding: 20px;  
  margin-left: 5%; 
  margin-right: 5%;
  margin-top: 1%;
  display: flex;  
  flex-direction: column;  
  /* 实际上，这里的背景色已经在上面的通用规则中设置了，  
     但保留这个选择器以说明样式是应用于.right-panel的 */  
}  
.searchbox{
        display: flex;
        align-items: center;
    }
</style>
