# fby第一页论坛分享贴页面修改

## 修改的文件
#### 在assets文件夹中：
    增添了fonts文件夹，用于点赞icon的添加与更换
    增添了icons文件夹，用于icon的添加与更换
    增加了avatar.jpg，用于用户头像的替换

#### 在pages文件夹中
    对Homepage.vue进行修改，作为我的进入主页，放入head、main、aside等内容。

#### 在views文件夹中
    由于将Homepage作为进入页，所以无修改

#### 在components文件夹中
    加入了 Main.vue 作为填充Main的主要内容
    加入了Sidebar.vue 作为填充Aside的主要内容
    HotPosts.vue  HotUsers.vue为Sidebar的重要组成部分
    Article.vue为Main.vue的重要组成部分

#### main.js、
    增加了字体、icon信息，由于没有使用路由，所以对路由进行了注释。
