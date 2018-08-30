# 隐式创建vue实例笔记

## 制作Vue组件
`src/components/Modal/modal.vue`
> 主要思路, 在methods中写几个方法, 供生成实例的时候调用

具体写法: 略

## 给model组件绑定生成实例的方法, 用于生成实例(实例暴露出供外界调用的方法)
`src/components/Modal/modal.js`
### 主要思路
1. 引入`modal.vue`, 并绑定实例方法用于新建实例(createInstance);
2. createInstance主要是: 创建vue实例, 并挂载到一个dom元素上(挂载过程是从vNode转换成真实dom的过程, 我是这么理解的);
```javascript
// 创建一个创建实例的方法
modal.newInstance = properties => {
  // 1. 获取到参数
  const _props = properties || {} // 可动态传入props
  // 2. 创建元素, 用于挂载 vNode
  const div = document.getElementsByClassName('modal-warper')[0] || document.createElement('div')
  // 2.1 将元素添加到页面中
  document.body.appendChild(div)

  // 3. 创建vue实例, 挂载到div上, 传入配置, 把modal渲染到这个vNode里
  let modalVm = new Vue({
    el: div,
    data: _props,
    render: h => h(modal)
  }).$children[0] // 3.1 通过$children可以获取到当前实例的直接子组件, `$children`不保证顺序, 但此实例里只有一个子组件-.-

  // 4. 暴露出外界可调用的api
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
// 5. 导出modal
export default modal
```

3. 将刚刚增加完实例方法的modal暴露出去

## 调用实例, 制作几个快捷的提示框
`src/components/Modal/index.js`

### 主要思路
1. 引入`modal.js`
2. 封装几个可供使用者直接调用方法

```javascript
import MyModal from './modal.js'
import Vue from 'vue'

function success (duration) {
  let instance = MyModal.newInstance()
  instance.show({
    title: 'Updated Successfully'
  })
  setTimeout(() => {
    instance.hide()
  }, duration || 1500)
}
```

3. 把这几个方法绑定在vue原型上
```javascript
const modalInstance = {
  success
}
Vue.prototype.$myModal = modalInstance
```

## 使用方式
`src/components/HelloWrold.vue`
```javascript
this.$myModal.success()
```

[源代码地址: github](https://github.com/Mammoth777/vue-modal)
[参考地址: cnnode](https://cnodejs.org/topic/5844c9639ff0dbf333450786)