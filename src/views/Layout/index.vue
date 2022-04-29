<template>
  <div>
    <van-nav-bar :title="activeTitle" fixed/>
    <div class="main">
      <!-- 二级路由挂载点 -->
      <router-view></router-view>
    </div>
    <!-- 底部tabbar -->
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      activeTitle: this.$route.meta.title // 顶部导航要显示的标题,默认uoqu当前路由对象里的meta中title值
    }
  },

  watch: {
    // 路由切换,侦听$route对象改变
    $route() {
      // 提取切换后路由信息对象里的title显示
      this.activeTitle = this.$route.meta.title
    }
  }

}
</script>

<style scoped>
/* 中间内容区域- 容器样式留好上下导航所占位置 */
.main {
  padding: 46px 0px 50px;
}
</style>
