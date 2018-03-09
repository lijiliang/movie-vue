<template>
  <Layout :has_menu="false" :has_share="false" :has_footer="false" title="登录">
    <div class="login_box">
      <div class="login" v-if="!getIsLogin">
        <h3>您还未登录</h3>
        <mu-raised-button label="登录" @click="loginEvent" primary/>
      </div>
      <div class="login" v-else >
        <h3>您已经登录</h3>
        <mu-raised-button label="退出登录" @click="loginOut" primary/>
      </div>
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
    // 模拟登录
    loginEvent () {
      // 利用vuex设置登录状态
      this.$store.commit('SEL_IS_LOGIN', true)

      // 登录成功后跳转
      let redirect = this.$route.query.redirect
      if (redirect) {
        this.$router.push({
          path: '/' + redirect
        })
      } else {
        this.$router.push('/')
      }
    },
    loginOut () {
      this.$store.commit('SEL_IS_LOGIN', false)
    }
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
.login_box {
  padding: 20px;
}
</style>
