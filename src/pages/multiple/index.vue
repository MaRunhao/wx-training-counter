<template>
  <div class="multiple-setting">
    <div class="header">
      <div class="group">
        循环
        <input class="group-input" type="number" v-model="multipleGroupCount" @change="groupCountChange" />
        组
      </div>
      <button class="submit-btn" type="primary" size="mini" @click="submit">提交</button>
    </div>
    <sort-view></sort-view>
  </div>
</template>
<script>
import SortView from '@/components/sort-view'
export default {
  name: 'MultipleSetting',
  components: { SortView },
  data () {
    return {
      multipleGroupCount: 0
    }
  },
  created () {
    let storage = mpvue.getStorageSync('multipleSetting') || { group: 0, queue: [] }
    this.multipleGroupCount = storage.group
  },
  methods: {
    submit () {
      mpvue.redirectTo({url: '/pages/index/main'})
    },
    groupCountChange () {
      let storage = mpvue.getStorageSync('multipleSetting') || { group: 0, queue: [] }
      mpvue.setStorageSync('multipleSetting', {...storage, group: this.multipleGroupCount})
    }
  }
}
</script>
<style scoped>
.multiple-setting {
}
.header {
  display: flex;
}
.group {
  flex: 1;
}
.group-input {
  display: inline-block;
  width: 10vw;
}
.submit-btn {
  width: 70px;
}
</style>