<template>
  <div>
    <p class="counter" :style="'background-position-x: ' + (0 - currentCount / count * 100) + 'vw;'">
      {{currentCount === -1 ? 0 : currentCount}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    count: {
      type: Number,
      default: 0
    },
    countPos: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      timer: null,
      currentCount: -1
    }
  },
  watch: {
    countPos (val, old) {
      if (val > -1) {
        // start
        this.startCountDown()
      } else {
        // stop
        this.timer && clearInterval(this.timer)
      }
    },
    currentCount (val) {
      if (val <= 0) {
        this.timer && clearInterval(this.timer)
        this.$emit('countStop')
        this.beep(0)
      } else if (val <= 3) {
        this.beep(1)
      }
    }
  },
  mounted () {
    this.$eventBus.$on('skipCount', () => {
      console.log('SKIP!!!!')
      this.timer && clearInterval(this.timer)
      this.$emit('countStop')
    })
    this.$eventBus.$on('pauseCount', () => {
      this.timer && clearInterval(this.timer)
    })
    this.$eventBus.$on('continueCount', () => {
      this.startCountDown('continue')
    })
  },
  methods: {
    startCountDown (isContinue) {
      isContinue || (this.currentCount = this.count)
      this.timer = setInterval(() => {
        this.currentCount--
      }, 1000)
    },
    /**
     * 0: stop; 1: normal;
     */
    beep (type) {
      // todo: ogg play
      console.log(type ? 'BEE!' : 'STOP!')
    }
  }
}
</script>

<style scoped>
.counter {
  font-size: 70px;
  height: 30vh;
  line-height: 30vh;
  text-align: center;
  background-image: linear-gradient(90deg, salmon, salmon 200px);
  background-repeat: no-repeat;
  background-position-x: -100vw;
}
</style>
