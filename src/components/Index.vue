<template>
  <layout :has_share="has_share" title="综合">
    <div class="page_wrap">
      <div class="page_bd">
        <div class="content" v-if="loading !== 'loading'">
          <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
            <div class="list">
              <div class="title">
                <h4 class="type">电影</h4>
              </div>
              <media-card :media="movies"></media-card>
              <div class="more" @click="jumpMovie">查看更多...</div>
            </div>
            <div class="list">
                <div class="title">
                    <h4 class="type">电视剧</h4>
                </div>
                <MediaCard :media="tvs"></MediaCard>
                <div class="more" @click="jumpTv">查看更多...</div>
            </div>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from '@/components/Layout'
import MediaCard from '@/components/MediaCard'
// import { getIndex } from '@/api'
export default {
  data () {
    return {
      has_share: false,
      page: 1,
      loading: 'init',
      movies: [], // 电影列表
      tvs: [],
      refreshing: false,
      trigger: null
    }
  },
  created () {
    this.getIndex()
  },
  mounted () {
    this.trigger = this.$el
  },
  methods: {
    async getIndex () {
      let params = {}
      params.page = this.page || 1
      const res = await this.$store.dispatch('getAllList', params)
      const {data} = res
      if (params.page > 1) {
        this.movies.push(...data.movies)
        this.tvs.push(...data.tvs)
      } else {
        this.movies = data.movies.slice(0, data.movies.length - 1)
        this.tvs = data.tvs.slice(0, data.tvs.length - 1)
      }
      // this.movies = data.movies
      // try {
      //   const { data } = await getIndex({page: 1})
      //   console.log(data)
      // } catch (err) {
      //   console.log(err)
      // }
    },
    refresh () {
      this.getIndex()
    },
    jumpMovie () {
      this.$router.push('/movie')
    },
    jumpTv () {
      this.$router.push('/tv')
    }
  },
  components: {
    Layout,
    MediaCard
  }
}
</script>
<style scoped lang="less">
@import url('../assets/less/common.less');
.page_wrap {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    .page_hd {}
    .page_bd {
        // padding-top: @nav_bar/3;
        padding-bottom: @nav_bar;
        .title {
            margin: 10px 0;
            text-align: left;
            border-bottom: 1px solid #eee;
            .type {
                padding: 10px;
                background: #fff;
            }
        }
        .content {
            position: relative;
            .list {
                text-align: center;
            }
        }
        .more {
            padding-bottom: 30px;
            cursor: pointer;
        }
    }
}
</style>
