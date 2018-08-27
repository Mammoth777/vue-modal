<template>
  <div class="modal-warper" :class="{active: topLayer}">
    <transition name="fade">
      <div class="modal-mask" v-show="showModal"></div>
    </transition>
    <div class="modal">
      <transition name="flip">
          <div class="modal-content" v-show="showModal">
            <h1 v-text="title" v-if="title"></h1>
            <p v-text="content" v-if="content"></p>
            <div v-if="okText || cancelText">
              <button @click="okHandler" v-if="okText" v-text="okText"></button>
              <button @click="cancelHandler" v-if="cancelText" v-text="cancelText"></button>
            </div>
          </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      showModal: false,
      title: '',
      content: '',
      okText: '',
      cancelText: '',
      onOk: function () {},
      onCancel: function () {},
      topLayer: false
    }
  },
  methods: {
    okHandler () {
      console.log('ok clicked')
      this.onOk && this.onOk()
      this.hide()
    },
    cancelHandler () {
      console.log('cancel clicked')
      this.onCancel && this.onCancel()
      this.hide()
    },
    show (opt) {
      if (typeof opt === 'string') {
        this.title = opt
      } else if (typeof opt === 'object') {
        const { title, content, okText, onOk, cancelText, onCancel } = opt
        this.title = title || ''
        this.content = content || ''
        this.okText = okText || ''
        this.cancelText = cancelText || ''
        this.onOk = typeof onOk === 'function' ? onOk : null
        this.onCancel = typeof onCancel === 'function' ? onCancel : null
      } else {
        throw new Error('你怎么回事? 小兄弟')
      }
      this.topLayer = true
      this.showModal = true
    },
    hide () {
      setTimeout(() => {
        this.topLayer = false
      }, 500)
      this.showModal = false
    }
  }
}
</script>

<style scoped>
/* 模态框外层 */
.modal-warper{
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
.modal-warper.active{
  z-index: 100;
}

/* 遮罩层 */
.modal-warper>.modal-mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .4);
}
.fade-enter-active, .fade-leave-to {
  transition: opacity .4s ease-in;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 模态框内容 */
.modal-warper>.modal{
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  perspective: 500px;
}
.modal-warper>.modal>.modal-content{
  background-color: #fff;
  border-radius: 4px;
  transition: all .2s linear;
  transform-style: preserve-3d;
  transform-origin: top;
  box-shadow: 0 0 10px 5px rgba(136, 136, 136, 0.8);
  padding: 20px;
}
.flip-enter {
  transform: rotateX(90deg);
  opacity: 0;
  box-shadow: 0 0 0 0 transparent;
}
.flip-leave-to {
  transform: rotateX(-90deg);
  box-shadow: 0 0 0 0 transparent;
}
.flip-enter-active, .flip-leave-active {
  transition: transform .2s ease-in, opacity .3s ease-in-out;
  box-shadow: 0 0 0 0 transparent;
}

button{
  outline: none;
  border: 0;
  background-color: #fafafa;
  color: #4c4c4b;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover{
  transition: all .5s;
  color: #3a3a3a;
  background-color: #eaeaea;
}

</style>
