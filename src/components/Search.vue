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
    </div>
</template>
<script>
import Layout from '@/components/Layout'
// import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      has_share: false,
      keyword: ''
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    doSearch () {
      console.log('sadf')
    }
  },
  components: {
    Layout
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
