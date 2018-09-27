<template>
  <div class="hello">
    <ul> 
      <li v-for="buyer in buyers" :key="buyer.id"> 
        {{buyer.id}} : {{buyer.name}}
      </li>
    </ul>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Buyers',
  data () {
    return {
      buyers: []
    }
  }, 
  created () {
    const self = this
    let params = new URLSearchParams();
    params.append('session', localStorage.token);
    axios
      .post('https://ad.ec-concier.com/adlogue/user.json/buyer/select',params)
      .then((res) => {
        self.buyers = res.data.list.data
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
