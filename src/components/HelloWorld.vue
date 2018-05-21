<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <el-button type="primary" @click="Jump">主要按钮</el-button>
    <div class="show">
      123
      <p>111111</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  computed:{
    ...mapState({
      show:state => state.dialog.show
    })
  },
  methods: {
    Jump() {
      // this.$router.push({path:'index'})
      this.$store.dispatch('switch_dialog')
      console.log(this.show)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color:yellow;
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.show{
  p{
    color:$color;
  }
}
</style>
