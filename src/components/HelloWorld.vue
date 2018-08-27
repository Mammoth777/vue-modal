<template>
  <div class="hello">
    hello vue instance
    <div>
      <button @click="$myModal.success()">success</button>
      <button @click="$myModal.fail()">fail</button>
      <button @click="show">show</button>
    </div>
    <ul>
      <li v-for="(item, index) in actionList" :key="index" v-text="item"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      actionList: []
    }
  },
  methods: {
    show () {
      let vm = this
      this.$myModal.dialog({
        title: 'hei~',
        content: 'turn down for what',
        onOk: function () {
          vm.actionList.unshift('u clicked ok, timenow: ' + new Date())
        }
      })
    }
  }
}
</script>

<style scoped>
ul{
  background: #eee;
}
ul>li{
  list-style: none;
}
</style>
