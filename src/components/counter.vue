<template>
  <div>
    <p class="counter">
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
    }
  },
  data () {
    return {
      timer: null,
      currentCount: -1
    }
  },
  watch: {
    count () {
      // start
      this.startCountDown()
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
  methods: {
    startCountDown () {
      this.currentCount = this.count
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

<style>
.card {
  padding: 10px;
}
</style>
