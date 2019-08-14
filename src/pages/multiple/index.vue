<template>
  <div class="multiple-setting">
    <div class="group">
      循环
      <input class="group-input" type="number" />
      组
    </div>
    <sort-view></sort-view>
  </div>
</template>
<script>
import SortView from '@/components/sort-view'
export default {
  name: 'MultipleSetting',
  components: { SortView }
}
</script>
<style scoped>
.multiple-setting {
}
.group-input {
  display: inline-block;
  width: 10vw;
}
</style>