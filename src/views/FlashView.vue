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
              <newflash />
              <hotflash />
            </div>
        </el-container>
      </main>
    </container>
  </container>
</div>
</template>

<script>
import mainflash from '../components/RecommendFlash.vue';
import hotflash from '../components/HotFlash.vue';
import newflash from '../components/NewFlash.vue';

export default {
name: 'R_Flash',
components: {
  mainflash,
  hotflash,
  newflash
},
data() {
}
}
</script>

<style scoped>

.left-panel, .right-panel {
overflow-y: auto;
padding: 20px;
}
.left-panel {
width:70%;
}

.right-panel {
width: 30%;
display: flex;
flex-direction: column;
}
</style>
