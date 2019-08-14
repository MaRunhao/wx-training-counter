<template>
  <div class="settings-comp">
    <div class="setting-type">
      <span :style="isMulti ? '' : 'color: #07c160;'">单项循环</span>
      <switch :checked="isMulti" @change="settingTypeChange"></switch>
      <span :style="isMulti ? 'color: #07c160;' : ''">多项设定</span>
    </div>
    <div v-if="!isMulti" class="single-setting">
      <form @submit="submitSingleSetting">
        <div class="form-item">
          <span class="form-title">每组时间</span>
          <input v-model="single.time" class="form-input number" type="number" />
        </div>
        <div class="form-item">
          <span class="form-title">组数</span>
          <input v-model="single.group" class="form-input number" type="number" />
        </div>
        <div class="form-item">
          <span class="form-title">休息间隔</span>
          <input v-model="single.break" class="form-input number" type="number" />
        </div>
      </form>
    </div>
    <div v-else class="multiple-setting">
      多项
      <button @click="toMultiple">前往设定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Settings',
  data () {
    return {
      isMulti: false,
      // single setting
      single: {
        time: 0,
        break: 0,
        group: 0
      },
      multiple: []
    }
  },
  watch: {
    single: {
      handler (val) {
        mpvue.setStorageSync('singleSetting', val)
      },
      deep: true
    }
  },
  mounted () {
    this.isMulti = mpvue.getStorageSync('settingType') === 'multiple'
    const singleSettings = mpvue.getStorageSync('singleSetting')
    singleSettings && this.$set(this, 'single', singleSettings)
    const multipleSettings = mpvue.getStorageSync('multipleSettings')
    multipleSettings && this.$set(this, 'multiple', multipleSettings)
  },
  methods: {
    settingTypeChange (e) {
      this.isMulti = e.mp.detail.value
      mpvue.setStorageSync('settingType', this.isMulti ? 'multiple' : 'single')
    },
    toMultiple () {
      mpvue.navigateTo({
        url: '/pages/multiple/main'
      })
    }
  }
}
</script>
<style scoped>

</style>