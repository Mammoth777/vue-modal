import Vue from 'vue'
import modal from './modal.vue'

/**
 * 驼峰转连接符
 */
// function camelcaseToHyphen (str) {
//   return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
// }

// 创建一个创建实例的方法
modal.newInstance = properties => {
  // start 这一段并不知道为什么... 感觉不是很需要
  const _props = properties || {} // 可动态传入props
  // 创建元素, 用于挂载 vNode
  const div = document.getElementsByClassName('modal-warper')[0] || document.createElement('div')
  document.body.appendChild(div)

  /*
   * 1. 创建vue实例, 挂载在刚刚创建div上, *(为什么要挂载? 这样这个组件就能显示了呗)*
   * 2. 传入props
   * 3. 将modal渲染进此实例[render笔记](我还没写)
   * 3.1 通过$children可以获取到当前实例的直接子组件, `$children`不保证顺序, 但此实例里只有一个子组件-.-
  */
  let modalVm = new Vue({
    el: div,
    data: _props,
    render: h => h(modal)
  }).$children[0]

  // 暴露出外界可调用的api
  return {
    show (dialogProps) {
      modalVm.show(dialogProps)
    },
    hide () {
      modalVm.hide()
    },
    component: modalVm,
    destroy () {
      document.body.removeChild(div)
    }
  }
}

export default modal
