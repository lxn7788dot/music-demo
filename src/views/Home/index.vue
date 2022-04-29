<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="obj in reList" :key="obj.id">
        <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}{{ obj.name }}{{ obj.name }}</p>
      </van-col>
    </van-row>

    <p class="title">最新音乐</p>
    <!-- <van-cell center v-for="obj in songList" :key="obj.id" :title="obj.name" :label="`${obj.song.artists[0].name}-${obj.name}`">
      <template #right-icon>
        <van-icon name="play-circle-o" size="0.6rem"></van-icon>
      </template>
    </van-cell> -->
    <SongItem v-for="obj in songList" :key="obj.id" :name="obj.name" :id="obj.id" :author="obj.song.artists[0].name" />


  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  name: '',
  components: { SongItem },
  data() {
    return {
      // 推荐歌单数据
      reList: [],
      // 最新音乐数据
      songList: []
    }
  },
  async created() {
    // 推荐歌单
    const res = await recommendMusicAPI({
      limit: 6
    })
    this.reList = res.data.result

    // 最新音乐
    const res2 = await newMusicAPI({
      limit: 20
    })
    this.songList = res2.data.result
    console.log(res2);
  }
}
</script>

<style scoped>
.title {
  background-color: #eee;
  color: #333;
  font-size: 15px;
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
}
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  /* 换行  normal 默认换行规则    break-all 允许在单词内换行    keep-all 只能在半角空格或连字符处换行*/
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/


  /** 指定一个box子元素是否应按水平或者垂直排列
    horizontal 指定子元素在一个水平线上从左至右排列
    vertical 从顶部向底部垂直布置子元素
    inline-axis 子元素沿着内联坐标轴(映射到横向)
    block-axis 子元素沿着块坐标轴(映射到垂直)
    inherit box-orient 属性的值应该从父元素继承
  */
  -webkit-box-orient: vertical;  /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2;  /** 显示的行数 **/
  overflow: hidden;  /** 隐藏超出的内容 **/
}
</style>
