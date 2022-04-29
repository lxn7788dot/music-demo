<template>
  <div class="play">
    <!-- 模糊背景 -->
    <div class="song-bg">
      
    </div>

    <!-- 播放页头部导航 -->
    <div class="header">
      
    </div>

    <!-- 留声机 容器 -->
    <div class="song-wrapper"></div>
  </div>
</template>

<script>
import { getSongByIdAPI, getLyricByIdAPI } from '@/api'
export default {
  name: '',
  data() {
    return {
      songInfo: {}, // 歌曲信息
    }
  },
  methods: {
    async getSong() { // 获取歌曲详情, 和歌词方法
      const res = await getSongByIdAPI(this.id)
      this.songInfo = res.data.songs[0]
      // 获取-并调用_formatLyr方法, 处理歌词
      const lyrContent = await getLyricByIdAPI(this.id)
      const lyricStr = lyrContent.data.lrc.lyric
      this.lyric = this._formatLyr(lyricStr)
      // 初始化完毕先显示零秒歌词
      this.curLyric = this.lyric[0]
    },
  }
}
</script>

<style scoped>

</style>
