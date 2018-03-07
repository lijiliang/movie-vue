<template>
  <layout :has_menu="false" :has_footer="false" :title="movie.title">
    <div class="menu" slot="bar_menu">
      <mu-menu-item title="分享" @click="shareMovie" />
      <mu-menu-item title="收藏" @click="saveMovie" />
    </div>
    <div class="page_wrap">
      <div class="page_hd">
      </div>
      <div class="page_bd">
        <div class="content">
          <mu-card>
            <mu-card-media title="" subTitle="">
              <div class="player_box">
                <div class="player">
                  <div class="box" ref="Dplayer_dom"></div>
                </div>
              </div>
            </mu-card-media>
            <mu-card-title :title="movie.title" subTitle="" />
          </mu-card>
          <div class="btn_box" v-if="movie.src && movie.src.length">
            <mu-raised-button class="demo-raised-button btn" :class="{active: item.active}" v-for="(item, i) in movie.movie_src" :key="item.src" primary @click="changeSource(item)">
              <span v-if="movie.tag === '1'">资源 {{ i+1 }}</span>
              <span v-if="movie.tag === '2'">{{ i+1 }}</span>
            </mu-raised-button>
          </div>
        </div>
        <div class="loading_box">
          <mu-circular-progress :size="45" v-if="loading === 'loading'" />
        </div>
      </div>
      <div class="page_ft">
        <mu-dialog :open="dialog" title="分享到" @close="close">
          <div id="soshid"></div>
          <mu-flat-button slot="actions" @click="close" primary label="关闭" />
        </mu-dialog>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from '@/components/Layout'
import Store from 'storejs'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      movie: {},
      current_src: '',
      Dplayer: null,
      dialog: false
    }
  },
  created () {
    this.getFilmsDetail()
  },
  methods: {
    // 获取详情页数据
    async getFilmsDetail () {
      let params = {}
      params.film_id = this.$route.params.movie_id
      this.loading = 'loading'
      const { data } = await this.$store.dispatch('getFilmsDetail', params)
      this.loading = 'loaded'
      this.current_src = data.src[0]
      this.movie = this.initData(data)
      this.$nextTick(() => {
        this.saveHistory()
        this.initDplayer()
      })
    },
    // 初始化数据
    initData (res) {
      let data = res
      let movieSrc = []
      for (let i of data.src) {
        movieSrc.push({
          src: i,
          active: false
        })
      }
      movieSrc[0].active = true
      data.movie_src = movieSrc
      return data
    },
    // 选择资源
    changeSource (item) {
      this.current_src = item.src
      this.handleData(item)
      this.initDplayer()
    },
    handleData (item) {
      for (let i of this.movie.movie_src) {
        if (i.src === item.src) {
          i.active = true
        } else {
          i.active = false
        }
      }
    },
    // 播放器初始化
    initDplayer () {
      // let Dplayer_dom = this.$refs.Dplayer_dom
      /* eslint-disable */
      this.Dplayer = new DPlayer({
        element: this.$refs.Dplayer_dom,
        video: {
          url: this.current_src,
          // pic: _self.movie.cover,
          autoplay: true,
          lang: 'zh',
          screenshot: true,
          hotkey: true,
          preload: 'auto',
        },
        contextmenu: [{
          text: '版本: v1.5.0',
          link: 'https://github.com/MoePlayer/DPlayer/releases'
        }, {
          text: 'HTML5视频播放器',
          link: 'https://github.com/DIYgod/DPlayer'
        }]
      })
    },
    // 浏览记录
    saveHistory () {
      let arr = []
      arr = Store.get('view_list')
      if (arr) {
        arr = arr.filter(item => {
          return item.id != this.movie.id
        })
        arr.unshift(this.movie)
        // 仅仅保存最近30条浏览记录
        if (arr.length > 30) {
          arr = arr.slice(0, 30)
        }
      } else {
        arr = []
        arr.unshift(this.movie)
      }
      Store.set('view_list', arr)
    },
    // 收藏
    saveMovie () {
      let arr = []
      arr = Store.get('favorite_list')
      if (arr) {
        // 返回与当前id不相等的数级，然后再将最新的放到最前面
        arr = arr.filter(item => {
          return item.id != this.movie.id
        })
        arr.unshift(this.movie)
      } else {
        arr = []
        arr.unshift(this.movie)
      }
      Store.set('favorite_list', arr)
      Toast({
        message: '已收藏',
        position: 'bottom',
        duration: 3000
      })
    },
    // 分享
    shareMovie () {
      console.log('shar')
    },
    close () {
      this.dialog = false
    }
  },
  components: {
    Layout
  }
}
</script>
<style scoped lang="less">
.page_wrap {
  margin: 0 auto;
  .page_hd {}
  .page_bd {
    .content {
      .player_box {
        padding: 15px;
        width: 100%;
        overflow: hidden;
      }
      .btn_box {
        padding: 30px;
        text-align: center;
        .btn {
          margin-right: 15px;
          margin-bottom: 15px;
          &.active {
            opacity: 0.7;
            filter: alpha(opacity=70);
          }
        }
      }
    }
    .loading_box {
      text-align: center;
      padding-top: 40px;
    }
  }
  .page_ft {}
}

</style>
<style scoped lang="less">
@import url('../assets/less/common.less');
// 响应式布局，流式布局
// 导航栏响应式

/* 大屏幕（大桌面显示器，最小宽度 1200px） */
@media (min-width: @screen_mg_min) {
  .page_wrap {
    max-width: 1200px!important;
    margin: 0 auto;
    .page_bd {}
  }
}

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (max-width: @screen_lg_min) {
  .page_wrap {
    max-width: 1000px!important;
    .page_bd {}
  }
}

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (max-width: @screen_md_min) {
  .page_wrap {
    max-width: @screen_md_min - 40px!important;
    .page_bd {}
  }
}

/* 小屏幕（平板，大于等于 768px） */
@media (max-width: @screen_sm_min) {
  .page_wrap {
    max-width: @screen_sm_min - 20px!important;
    .page_bd {}
  }
}

/* 小屏幕（手机，大于等于 640px） */
@media (max-width: @screen_mi_min) {
  .page_wrap {
    width: 100%!important;
    .page_bd {}
  }
}
</style>
