<template>
  <div class="sort-view">
    <section
      v-for="(item, idx) in queue"
      :key="idx"
      class="sort-view__item"
    >
      <div class="sort__btn"></div>
      <div class="sort__content" @click="_edit(item)">
        <!-- // todo: 内容填充 -->
        <div class="sp-name">{{item.name}}</div>
        <div class="sp-time">训练{{item.time}}s</div>
        <div class="sp-break">休息{{item.break}}s</div>
      </div>
      <div class="sort__operate">
        <button class="delete" @click="_delete(item.id)"></button>
      </div>
    </section>
    <section
      class="sort-view__item"
      @click="_add"
    >
      NEW
    </section>
    <div class="dialog__wrap" v-if="editing">
      <div class="dialog__body">
        <div class="edit-item">
          <span class="title">训练名称</span>
          <input type="text" v-model="edit.name"/>
        </div>
        <div class="edit-item">
          <span class="title">锻炼时间</span>
          <input type="number" v-model="edit.time"/>
        </div>
        <div class="edit-item">
          <span class="title">休息时间</span>
          <input type="number" v-model="edit.break"/>
        </div>
        <div class="dialog__footer">
          <button @click="editing = false">关闭</button>
          <button @click="_submit" type="primary">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SortView',
  data () {
    return {
      editing: false,
      queue: [],
      edit: {
        id: -1,
        name: '',
        time: 0,
        break: 0
      }
    }
  },
  methods: {
    _add () {
      this.editing = true
    },
    _edit (item) {
      this.edit = {...item}
      this.editing = true
    },
    _submit () {
      if (!this._checkEditing()) {
        return mpvue.showToast({
          title: '请填写正确的内容',
          icon: 'none'
        })
      }
      if (this.edit.id === -1) {
        // new
        this.queue.push({
          ...this.edit,
          id: this.queue.length
        })
      } else {
        // editing
        let currentEditIdx = this.queue.findIndex(item => item.id === this.edit.id)
        this.$set(this.queue, currentEditIdx, this.edit)
      }
      this.editing = false
      this.edit = {
        id: -1,
        name: '',
        time: 0,
        break: 0
      }
    },
    _checkEditing () {
      if (!this.edit.name || !this.edit.name.trim()) {
        return false
      }
      if (!/\d/.test(this.edit.time) || !/\d/.test(this.edit.break)) {
        return false
      }
      return true
    },
    _delete (id) {
      let self = this
      mpvue.showModal({
        title: '确认删除?',
        success (res) {
          if (res.confirm) {
            self.queue.splice(id, 1)
            self.queue.forEach(item => {
              item.id > id && item.id--
            })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.sort-view {
}
.sort-view__item {
  width: 94vw;
  height: 15vh;
  margin: 0 auto;
  display: flex;
  border: 1px solid #bcbcbc;
  border-radius: 8px;
}
.sort-view__item + .sort-view__item {
  margin-top: 1vh;
}
.sort__btn {
  width: 50px;
}
.sort__content {
  flex: 1;
  border-left: 1px dashed #cecece;
  border-right: 1px dashed #cecece;
}
.sort__operate {
  width: 60px;
}
.sort__operate .delete {
  width: 100%;
  height: 100%;
  background: #ff3f3f;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* dialog */
.dialog__wrap {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 111;
}
.dialog__body {
  width: 80vw;
  height: 50vh;
  margin: 0 auto;
  background: #fff;
  padding: 15px;
}
</style>