<template>
  <layout :has_share="has_share" title="我的">
    <div class="wrap">
      <mu-list>
        <mu-list-item title="观看历史" to="user/history">
          <mu-icon slot="left" value="history"/>
          <mu-icon slot="right" value="keyboard_arrow_right"/>
        </mu-list-item>
        <mu-list-item title="我的收藏" to="user/favorite">
          <mu-icon slot="left" value="favorite"/>
          <mu-icon slot="right" value="keyboard_arrow_right"/>
        </mu-list-item>
        <mu-list-item title="设置" to="user/settings">
          <mu-icon slot="left" value="settings"/>
          <mu-icon slot="right" value="keyboard_arrow_right"/>
        </mu-list-item>
        <mu-list-item title="关于" to="user/about">
          <mu-icon slot="left" value="timeline"/>
          <mu-icon slot="right" value="keyboard_arrow_right"/>
        </mu-list-item>
        <mu-list-item title="登录" to="user/login">
          <mu-icon slot="left" value="launch"/>
          <mu-icon slot="right" value="keyboard_arrow_right"/>
        </mu-list-item>
        <mu-list-item title="测试" to="user/test">
          <mu-icon slot="left" value="send"/>
          <mu-icon slot="right" value="keyboard_arrow_right"/>
        </mu-list-item>
      </mu-list>
    </div>
  </layout>
</template>
<script>
import Layout from '@/components/Layout'
export default {
  data () {
    return {
      has_share: false
    }
  },
  components: {
    Layout
  }
}
</script>
