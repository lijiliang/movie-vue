<template>
  <layout :has_share="has_share" title="电影">
    <div class="page_wrap">
      <div class="page_bd">
        <div class="content">
          <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
          <div class="list">
              <MediaCard :media="tvs"></MediaCard>
          </div>
          <mu-infinite-scroll :scroller="scroller" :loading="getLoading" @load="loadMore"/>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from '@/components/Layout'
import MediaCard from '@/components/MediaCard'
export default {
  data () {
    return {
      has_share: false,
      loading: 'init',
      tvs: [],
      page: 1,
      refreshing: false,
      scroller: null,
      trigger: null
    }
  },
  created () {
    this.getFilms()
  },
  activated () {
    this.trigger = this.$el
    this.scroller = this.$el // 滚动的元素
  },
  deactivated () {
    this.trigger = null
    this.scroller = null
  },
  methods: {
    async getFilms () {
      let params = {}
      params.page = this.page || 1
      this.loading = 'loading'
      const { data } = await this.$store.dispatch('getTvList', params)

      this.loading = 'loadend'
      if (this.page > 1) {
        // 滚动加载停止条件
        if (!data.data.length) {
          this.loading = 'nomore'
        } else {
          this.tvs.push(...data.data)
        }
      } else {
        this.tvs = data.data
        if (!data.data.length) {
          this.loading = 'empty'
        }
      }
    },
    refresh () {
      this.page = 1
      this.getFilms()
    },
    loadMore () {
      this.page++
      this.getFilms()
    }
  },
  computed: {
    getLoading () {
      if (this.loading === 'loading') {
        return true
      } else {
        return false
      }
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
        padding-top: @nav_bar/3;
        .content {
            position: relative;
            .list {
                text-align: center;
            }
        }
    }
}
.mu-infinite-scroll {
  padding: 10px 0 50px 0;
}
</style>
