<template>
  <Layout :has_menu="false" :has_share="false" :has_footer="false" title="登录测试">
    <div class="wrap">登录后才能看见这个页面</div>
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
  computed: {
    getIsLogin () {
      return this.$store.state.user.is_login
    }
  },
  components: {
    Layout
  }
}
</script>
<style scoped lang="less">
.wrap{
  padding: 20px;
}
</style>
