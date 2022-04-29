<template>
  <div>
    <van-search
      shape="round"
      v-model="hotValue"
      @input="inputFn"
      placeholder="请输入搜索关键词"
    />

    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="hotList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每一个搜索关键词 -->
        <span class="hot_item" v-for="(item, index) in hotArr" :key="index" @click="getKey(item.first)">{{ item.first }}</span>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list 
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <SongItem v-for="obj in hotList" :key="obj.id" :name="obj.name" :id="obj.id" :author="obj.ar[0].name" />
        <!-- <van-cell center v-for="obj in hotList" :key="obj.id" :title="obj.name" :label="`${obj.ar[0].name}-${obj.name}`">
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem"></van-icon>
          </template>
        </van-cell> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchListAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  name: '',
  components: { SongItem },
  data() {
    return {
      // 热搜关键词
      hotArr: [],
      hotValue: '',
      hotList: [],
      loading: false, // 加载中,只有为false 才能触底后自动触发onload方法
      finished: false, // 未加载全部,如果设置为true,底部就不会再次执行onload,代表全部加载完成
      page: 1, // 当前搜索结果的页码
      timer: ''
    }
  },
  created() {
    // 展示热门搜索关键字
    this.getHotArr()
  },
  methods: {
    async getHotArr() {
      const res = await hotSearchAPI()
      this.hotArr = res.data.result.hots
    },

    async getListFn() {
      return await searchListAPI({
        keywords: this.hotValue,
        limit: 20,
        offset: (this.page - 1) * 20
      })
    },

    // 点击热搜关键字
    async getKey(val) {
      this.page = 1
      this.finished = false
      this.hotValue = val
      const res = await this.getListFn()
      // console.log(res);
      this.hotList = res.data.result.songs
    },
    async inputFn() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async ()=> {
        this.page = 1
        this.finished = false
        if (this.hotValue.trim().length === 0) {
          // 搜索关键词没有,就把搜索结果清空阻止网络请求发送,return
          this.hotList = []
          return
        }

        // 调搜索接口
        const res = await this.getListFn()
        // 如果搜索结果响应数据没有songs字段
        if (res.data.result.songs === undefined) {
          this.hotList = []
          return
        }

        this.hotList = res.data.result.songs
        this.loading = false
      },1000)
    },

    async onLoad() {
      // 触底事件(要加载下一页数据),内部会自动把loading改为true
      this.page++
      const res = await this.getListFn()
      this.hotList = [...this.hotList, ...res.data.result.songs]
      this.loading = false // 数据加载完毕,保证下一次还能触发onload
    }
  }
}
</script>

<style scoped>
/* 搜索容器 */
.search_wrap {
  padding: .266667rem;
}

/* 热门搜索文字标题样式 */
.hot_title {
  font-size: .325rem;
  color: #666;
}

/* 热搜词容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border:  1px solid #d3d4da;
}

/* 单元格设置底边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}

</style>
