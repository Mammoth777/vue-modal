import MyModal from './modal.js'
import Vue from 'vue'

/**
 * 成功提示
 * @param {number} duration 持续时间
 */
function success (duration) {
  let instance = MyModal.newInstance()
  instance.show({
    title: 'Updated Successfully'
  })
  setTimeout(() => {
    instance.hide()
  }, duration || 1500)
}

/**
 * 失败提示
 * @param {number} duration 持续时间
 */
function fail (duration) {
  let instance = MyModal.newInstance()
  instance.show({
    title: 'Update Failed'
  })
  setTimeout(() => {
    instance.hide()
  }, duration || 1500)
}

/**
 * 对话框
 * @param {object} config 配置 title, content
 */
function dialog (config) {
  let instance = MyModal.newInstance()
  const opt = Object.assign(
    {
      okText: 'Confirm',
      cancelText: 'Cancel'
    },
    config
  )
  instance.show(opt)
}

const modalInstance = {
  success,
  fail,
  dialog
}

Vue.prototype.$myModal = modalInstance

export default modalInstance
