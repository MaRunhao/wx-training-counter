<template>
  <div class="settings-comp">
    <div class="setting-type">
      <span :style="isMulti ? '' : 'color: #07c160;'" @click="isMulti = false">单项循环</span>
      <span :style="isMulti ? 'color: #07c160;' : ''" @click="isMulti = true">多项设定</span>
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
      <div class="mul-group">
        <span class="icon icon-cycle"></span>{{multiple.group}}
      </div>
      <section class="mul-view">
        <div
          v-for="item in multiple.queue" :key="item.id"
          class="mul-item" :class="{'current': multiplePos === item.id}"
        >
          <p class="mul-item__name">{{item.name}}</p>
          <p class="mul-item__time">
            <span class="icon icon-sport"></span>
            {{item.time}}
            <span class="sub-unit">s</span>
          </p>
          <p class="mul-item__break">
            <span class="icon icon-break"></span>
            {{item.break}}
            <span class="sub-unit">s</span>
          </p>
        </div>
      </section>
      <button class="mul-set" @click="toMultiple">前往设定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Settings',
  props: {
    multiplePos: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isMulti: false,
      // single setting
      single: {
        time: 0,
        break: 0,
        group: 0
      },
      multiple: {
        group: 0,
        queue: []
      }
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
    const multipleSettings = mpvue.getStorageSync('multipleSetting')
    multipleSettings && this.$set(this, 'multiple', multipleSettings)
  },
  methods: {
    settingTypeChange (e) {
      this.isMulti = e.mp.detail.value
      mpvue.setStorageSync('settingType', this.isMulti ? 'multiple' : 'single')
    },
    toMultiple () {
      mpvue.redirectTo({
        url: '/pages/multiple/main'
      })
    }
  }
}
</script>
<style scoped>
.multiple-setting {
  display: flex;
  flex-direction: column;
  height: 160px;
}
.mul-group {
  height: 40px;
}
.mul-view {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-wrap: nowrap;
}
.mul-item {
  width: 90px;
  min-width: 90px;
  border: 1px solid #cecece;
  border-radius: 6px;
}
.mul-item.current {
  color: #fff;
  background: #07c160;
}
.mul-item.current .icon {
  filter: brightness(7);
}
.mul-item + .mul-item {
  margin-left: 5px;
}
.mul-set {
  height: 40px;
}
.sub-unit {
  font-size: 14px;
}
</style>