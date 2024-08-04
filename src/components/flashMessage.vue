<template>
    <div class="common-layout">
    <container>
      <HomeHead/>
      <container>
        <el-aside width="200px"></el-aside>
        <main>
          <el-container>
            <mainflash />
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
.section ul.content li {
  display: flex; /* 启用flex布局 */
  align-items: center; /* 垂直居中子元素 */
}
.section ul.content li .img,
.section ul.content li .info {
  margin-right: 10px; /* 在图片和文字之间添加一些间距 */
}
.section{
  width:1160px;
  margin: 10 auto;
}
.left-panel, .right-panel {
  overflow-y: auto;
  padding: 20px;
}
.left-panel {
  width:70%;
  background: #f0f0f0;
}
.right-panel {
  width: 30%;
  display: flex;
  flex-direction: column;
}
.top-news, .hot-news {
  flex: 1;
  margin-bottom: 20px;
}
.top-news{
  li{
    margin-bottom: 20px;
  }
  .info{
    display: flex; /* 使用Flexbox布局 */
    align-items: center; /* 垂直居中 */
    .desc{
      color:#333;
      margin-top: 10px;
      margin-bottom: 5px;
      font-size: 25px;
      overflow:hidden;
    }
    .tag {
      color:#333;
      padding: 2px 5px;
      margin-right: 10px;
      font-size: 10px;
      background-color: #e0e0e0; /* 标签背景色，可选 */
      border-radius: 3px; /* 圆角边框，可选 */
    }
    .date{
      display: flex;
      color: #eee;
      border-radius: 10px;
      width: 40px; /* 设置容器的固定宽度 */
      height:60px;
      word-wrap: break-word; /* 确保长单词或URL地址在达到容器边缘时能够换行 */
      margin-right: 10px;
      background-color:#1D5B5E;
      text-align: center;
      align-items: center;
      font-weight: bold;
    }
  }
}
a {
  text-decoration: none;
}
ul, ol {
  list-style-type: none;
}
main {
      flex: 1; /* main部分占据剩余空间 */
      padding: 20px; /* 添加内边距 */
    }
</style>
