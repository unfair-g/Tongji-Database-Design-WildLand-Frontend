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

<style>
#app {
display: flex;
height: 100vh;
}
.container::before {
content: "";
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-image: url('../assets/background.jpg'); /* 设置背景图片 */
background-size: cover; /* 覆盖整个页面，但图片可能会被裁剪 */
opacity: 0.5; /* 设置背景图片的透明度为50% */
z-index: -1; /* 确保背景图片位于内容之下 */
}
.container {
display: flex;
height: 100%;
}
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
