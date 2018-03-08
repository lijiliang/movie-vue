<template>
    <div class="page_wrap slim_scrollbar">
        <div class="page_hd">
            <div class="search_box">
                <div class="search">
                    <span class="back" @click="goback"><mu-icon value="arrow_back" color="#fff" /></span>
                    <input type="search" v-model="keyword" placeholder="输入影片名" @keyup.enter="doSearch" ref="input_dom">
                    <span class="cancer" @click="doSearch" @keyup.enter="doSearch">搜索</span>
                </div>
            </div>
        </div>
        <div class="page_bd">
            <div class="content">
                <div class="list" v-if="movies && movies.length">
                    <div class="title">
                        <h4 class="type">电影</h4>
                    </div>
                    <MediaCard :media="movies"></MediaCard>
                </div>
                <div class="list" v-if="tvs && tvs.length">
                    <div class="title">
                        <h4 class="type">电视剧</h4>
                    </div>
                    <MediaCard :media="tvs"></MediaCard>
                </div>
                <div style="text-align: center;padding-top: 20px;" v-if="showEmpt">抱歉，没有找到要找的东西噢！</div>
                <mu-infinite-scroll :scroller="scroller" :loading="getLoading" @load="loadMore"/>
            </div>
        </div>
    </div>
</template>
<script>
import Layout from '@/components/Layout'
import MediaCard from '@/components/MediaCard'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      has_share: false,
      keyword: '',
      loading: 'init',
      movies: [],
      tvs: [],
      page: 1,
      scroller: null
    }
  },
  created () {
    console.log('created')
  },
  activated () {
    this.scroller = this.$el // 滚动的元素
  },
  deactivated () {
    this.scroller = null
  },
  beforeRouteEnter (to, from, next) {
    next()
    if (from.name !== 'MovieDetail') {
      next(vm => {
        // vm.inputFocus()
        vm.resetData()
      })
    } else {
      next()
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    inputFocus () {
      this.$nextTick(() => {
        this.$refs.input_dom.focus()
      })
    },
    doSearch () {
      if (this.keyword.replace(/\s+/g, '').length === 0) {
        Toast('请输入关键字')
        return false
      }
      this.$refs.input_dom.blur()
      this.resetData()
      this.getSearch()
    },
    resetData () {
      this.loading = 'init'
      this.movies = []
      this.tvs = []
    },
    // 搜索
    async getSearch () {
      let params = {}
      params.page = this.page
      params.q = this.keyword
      this.loading = 'init'
      const { data, status } = await this.$store.dispatch('getSearch', params)
      if (status === 200) {
        this.loading = 'loadend'
        if (this.page > 1) {
          this.movies.push(...data.movies)
          this.tvs.push(...data.tvs)
        } else {
          this.movies = data.movies
          this.tvs = data.tvs
        }
      } else {
        this.loading = 'error'
      }
    },
    // 加载更多
    loadMore () {
      console.log(this.page)
    }
  },
  computed: {
    getLoading () {
      if (this.loading === 'loading') {
        return true
      } else {
        return false
      }
    },
    showEmpt () {
      if (this.loading !== 'loading' && this.loading !== 'init' && !this.movies.length && !this.tvs.length) {
        return true
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
    min-height: 800px;
    background: #f5f5f5;
    overflow-y: auto;
    .page_hd {
        .search_box {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to right, #00897b 0%, #004d40 100%);
            z-index: 999;
            .search {
                display: flex;
                align-items:center;
                width: 100%;
                height: @nav_bar;
                line-height: @nav_bar;
                .back {
                    padding-top: 5px;
                    text-align: center;
                    width: 40px;
                    height: 100%;
                    cursor: pointer;
                }
                .cancer {
                    text-align: center;
                    width: 40px;
                    height: 100%;
                    color: #fff;
                    cursor: pointer;
                }
                input {
                    flex: 1;
                    padding-left: 10px;
                    border: none;
                    height: @nav_bar - 20px;
                    border-radius: 3px;
                }
            }
        }
    }
    .page_bd {
        padding: @nav_bar 0;
        padding-bottom: 200px;
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
            .list {
                text-align: center;
            }
        }
    }
    .page_ft {}
}
</style>
