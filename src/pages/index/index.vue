<template>
  <div class="training-counter__container">
    <counter
      ref="counter"
      :countArr="countArr"
      :count="countNumber"
      @countStop="countDownOnce"
    ></counter>
    <settings></settings>
    <exec-area
      :currentStatus="counterStatus"
      @startCount="startCount"
      @stopCount="stopCount"
    ></exec-area>
  </div>
</template>

<script>
import counter from '@/components/counter'
import ExecArea from '@/components/exec'
import Settings from '@/components/settings'

export default {
  data () {
    return {
      countArr: [],
      countPos: -1,
      counterStatus: 0
    }
  },

  computed: {
    countNumber () {
      return this.countArr[this.countPos] || -1
    }
  },

  components: {
    counter,
    ExecArea,
    Settings
  },

  methods: {
    startCount () {
      const settingType = mpvue.getStorageSync('settingType') || 'single'
      const settings = mpvue.getStorageSync(settingType + 'Setting')
      if (!settings) {
        return mpvue.showToast({
          title: '无设定内容',
          icon: 'none'
        })
      }
      if (settingType === 'single') {
        for (let key in settings) {
          if (!/\d/.test(settings[key])) {
            return mpvue.showToast({
              title: '设定内容有误, 请设定为数字!',
              icon: 'none'
            })
          }
        }
        let startArrays = []
        for (let i = 0; i < Number(settings.group); i++) {
          startArrays.push(Number(settings.time), Number(settings.break))
        }
        this.countArr = startArrays
      } else {
        // multiple
      }
      this.countPos = 0
      this.counterStatus = 1
    },
    stopCount () {
      this.counterStatus = 0
    },
    countDownOnce () {
      this.countPos++
      if (this.countPos > this.countArr.length - 1) {
        // count over
        this.stopCount()
      } else {
        // next count
      }
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
