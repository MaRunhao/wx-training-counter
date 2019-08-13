<template>
  <div class="exec-page">
    <div class="exec-page__btns">
      <button v-if="!currentStatus" @click="startCount">Start</button>
      <template v-else>
        <button class="pause">Pause</button>
        <button class="stop" @click="stopCount">Stop</button>
        <button class="skip">Skip</button>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExecPage',
  props: {
    currentStatus: {
      // 0: waitting, 1: running
      type: Number,
      default: 0
    }
  },
  methods: {
    startCount () {
      this.$emit('startCount')
    },
    stopCount () {
      this.$emit('stopCount')
    }
  }
}
</script>
<style>
.exec-page {
  padding: 10px;
}
</style>