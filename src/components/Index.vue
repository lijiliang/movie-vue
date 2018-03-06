<template>
  <layout :has_share="has_share" title="综合">
    <div class="page_wrap">
      <div class="page_bd">
        sadf
        <button @click="getIndex">button</button>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from '@/components/Layout'
import { getIndex } from '@/api'
export default {
  data () {
    return {
      has_share: false
    }
  },
  methods: {
    async getIndex () {
      try {
        const { data } = await getIndex({page: 1})
        console.log(data)
      } catch (err) {
        console.log(err)
      }

      // try {
      //   const data = await createArticle({page: 1, index: 'test'})
      //   if (data.response.status === 404) {
      //     throw new Error(data)
      //   }
      // } catch (error) {
      //   console.log(error)
      //   alert(error.message)
      // }
    }
  },
  components: {
    Layout
  }
}
</script>
