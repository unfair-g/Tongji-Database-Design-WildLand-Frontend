const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: ['www.tjwildland.top'], // 允许访问的域名
    host: '0.0.0.0', // 允许通过本地网络访问
    port: 8080, // 你可以根据需要调整端口号
  }
})
