<template>
  <Layout :has_menu="false" :has_footer="false" title="关于本项目">
    <div class="wrap">
        <h4>基于vue2.0开发</h4>
        <h5>最新最好看的在线电影APP</h5>
        <h6>使用了：<a href="http://www.muse-ui.org/#/index" target="_blank">muse-ui</a></h6>
        <h6>开源项目：<a href="https://github.com/lijiliang/movie-vue" target="_blank">GitHub</a></h6>
        <h6>版权声明：<span style="color: #999;font-weight:300">api来源于网上，仅供开发参考之用，禁用于商业，否则后果自负。</span></h6>
    </div>
  </Layout>
</template>
<script>
import Layout from '@/components/Layout'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  components: {
    Layout
  }
}
</script>
<style scoped lang="less">
  .wrap {
    padding: 0 20px;
    text-align: left;
    padding-top: 30px;
    h4{
      font-size: 22px;
    }
    h5{
      line-height: 2;
      font-size: 16px;
    }
    h6{
      line-height: 2;
    }
  }
</style>
