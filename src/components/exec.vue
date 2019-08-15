<template>
  <div class="exec-page">
    <div class="exec-page__btns">
      <button class="start" v-if="currentStatus === 'waiting'" @click="startCount">
        <span class="icon icon-play"></span>
      </button>
      <template v-else>
        <button class="runing-btn continue" v-if="currentStatus === 'pause'" @click="continueCount">
          <span class="icon icon-play"></span>
        </button>
        <button class="runing-btn pause" v-else @click="pauseCount">
          <span class="icon icon-pause"></span>
        </button>
        <button class="runing-btn skip" @click="skipCount">
          <span class="icon icon-skip"></span>
        </button>
        <button class="runing-btn stop" @click="stopCount">
          <span class="icon icon-stop"></span>
        </button>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExecPage',
  props: {
    currentStatus: {
      // waiting, running, pause
      type: Number,
      default: 'waiting'
    }
  },
  methods: {
    startCount () {
      this.$emit('startCount')
    },
    stopCount () {
      this.$emit('stopCount')
    },
    skipCount () {
      this.$emit('skipCount')
    },
    pauseCount () {
      this.$emit('pauseCount')
    },
    continueCount () {
      this.$emit('continueCount')
    }
  }
}
</script>
<style scoped>
.exec-page {
  position: absolute;
  width: 100vw;
  bottom: 10vh;
}
.exec-page__btns {
  display: flex;
  justify-content: space-between;
}
.start,
.runing-btn {
  text-align: center;
  border-radius: 50%;
  border: 1px solid #cecece;
}
.runing-btn {
  flex: 1;
  width: 60px;
  max-width: 60px;
  height: 60px;
  line-height: 60px;
}
.start {
  width: 90px;
  height: 90px;
  line-height: 90px;
}
</style>